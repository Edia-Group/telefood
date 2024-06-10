import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { NhostService } from '../nhost/nhost.service';

@Injectable()
export class TelegrafService implements OnModuleInit {
  private bot: Telegraf;

  constructor(private nhostService: NhostService) {
    this.bot = new Telegraf('7365563125:AAG_OahrfOOaG2vxg-6z3pQkUy0Cs91XX2E');
  }

  onModuleInit() {
    this.bot.start((ctx) => ctx.reply('Welcome'));
    this.bot.help((ctx) => ctx.reply('Send me a sticker'));
    this.bot.on('sticker', (ctx) => ctx.reply('👍'));
    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));

    this.bot.command('login', async (ctx) => {
      const [email, password] = ctx.message.text.split(' ').slice(1);
      try {
        const session = await this.nhostService.signIn(email, password);
        ctx.reply(`Logged in: ${JSON.stringify(session)}`);
      } catch (error) {
        ctx.reply(`Login failed: ${error.message}`);
      }
    });

    this.bot.launch();
  }
}
