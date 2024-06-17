import { Global, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TenantsService } from '../core/tenants/tenants.service';

@Injectable()
@Global()
export class BotsService implements OnModuleDestroy {

  private botInstances: Map<string, Telegraf> = new Map();
  private readonly logger = new Logger('HTTP');

  constructor( private readonly tenantsService: TenantsService ) {}

  async getBotInstance(tenantId: string): Promise<Telegraf> {
    if (this.botInstances.has(tenantId)) {
      return this.botInstances.get(tenantId);
    }

    const tenant = await this.tenantsService.findOne(+tenantId);  //+ operator parses string -> number

    if (!tenant || !tenant.bot_token) {
      throw new Error('Tenant or bot token not found');
    }

    const bot = new Telegraf(tenant.bot_token);
    this.botInstances.set(tenantId, bot);

    this.initBot(bot);

    return bot;
  }
  
  initBot(bot: Telegraf) {
    bot.start((ctx) => ctx.reply('Welcome'));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on('sticker', (ctx) => ctx.reply('👍'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));

    bot.command('login', async (ctx) => {
      const [email, password] = ctx.message.text.split(' ').slice(1);
      // login ...
    });

    bot.launch();
    
    this.logger.log("Bot succesfully started!")
  }

  onModuleDestroy() {
    this.botInstances.forEach((bot) => bot.stop());
  }
}
