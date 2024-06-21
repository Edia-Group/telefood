import { NestApplicationContext, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BotsService } from './utils/bots.service';
import { UtilsModule } from './utils/utils.module';

declare const module: any;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Access the application context and the service AFTER the app is created
  const botsService = app.get(BotsService);

  // Use the context to access botsService for starting up all bots
  await botsService.startAllBots();

  await app.listen(3000);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
