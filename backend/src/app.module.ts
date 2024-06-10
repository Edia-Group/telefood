import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NhostService } from './nhost/nhost.service';
import { TelegrafService } from './telegraf/telegraf.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NhostService, TelegrafService],
})
export class AppModule {}
