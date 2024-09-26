import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BotsService } from './utils/bots.service';
import { updateEnvAndStartTunnel, stopTunnel } from '../../../start-tunnel.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function loadEnv() {
  const envConfig = dotenv.parse(fs.readFileSync('.env'));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
  console.log('WEBHOOK_URL:', process.env.WEBHOOK_URL);
  console.log('ENVIRONMENT:', process.env.ENVIRONMENT);
}

declare const module: any;

async function bootstrap() {
  if(process.env.ENVIRONMENT == 'dev') {
    await updateEnvAndStartTunnel();
    await loadEnv(); // Reload environment variables after updateEnvAndStartTunnel
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, responseType, Accept, Authorization, x_tenant_id',
  });

  // Access the application context and the service AFTER the app is created
  const botsService = app.get(BotsService);

  // Use the context to access botsService for starting up all bots
  await botsService.startAllBots();

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await app.close();
      await stopTunnel();
    });
  }
}

bootstrap();

process.once('SIGINT', async () => {
  await stopTunnel();
  process.exit();
});
process.once('SIGTERM', async () => {
  await stopTunnel();
  process.exit();
});