import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SupabaseClient } from '@supabase/supabase-js';
@Injectable()
export class TelegrafService implements OnModuleInit {
  private bot: Telegraf;

  constructor(private supabaseClient: SupabaseClient) {
    this.bot = new Telegraf('7365563125:AAG_OahrfOOaG2vxg-6z3pQkUy0Cs91XX2E');
  }

  onModuleInit() {
    this.bot.start((ctx) => ctx.reply('Welcome'));
    this.bot.help((ctx) => ctx.reply('Send me a sticker'));
    this.bot.on('sticker', (ctx) => ctx.reply('👍'));
    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));

    this.bot.command('login', async (ctx) => {
      const [email, password] = ctx.message.text.split(' ').slice(1);
      // login ...
    });

    this.bot.launch();
  }
}
