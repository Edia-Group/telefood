import { NestFactory } from '@nestjs/core';
import { TelefoodModule } from './telefood.module';

async function bootstrap() {
  const app = await NestFactory.create(TelefoodModule);
  await app.listen(3000);
}
bootstrap();
