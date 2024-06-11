import { Module, Global } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'TELEGRAF_BOT',
      useFactory: (configService: ConfigService): Telegraf => {
        const token = configService.get<string>('TELEGRAM_BOT_TOKEN');
        return new Telegraf(token);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['TELEGRAF_BOT'],
})
export class TelegrafModule {}
