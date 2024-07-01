import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BotsService } from './utils/bots.service';
import { updateEnvAndStartTunnel, stopLocalTunnel } from '../start-localtunnel.js';

declare const module: any;

async function bootstrap() {
  await updateEnvAndStartTunnel();

  const app = await NestFactory.create(AppModule);

  // Access the application context and the service AFTER the app is created
  const botsService = app.get(BotsService);

  // Use the context to access botsService for starting up all bots
  await botsService.startAllBots();

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await app.close();
      await stopLocalTunnel();
    });
  }
}

bootstrap();

process.once('SIGINT', async () => {
  await stopLocalTunnel();
  process.exit();
});
process.once('SIGTERM', async () => {
  await stopLocalTunnel();
  process.exit();
});
