import { Global, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TenantsService } from '../core/tenants/tenants.service';
import { Tenant } from '../core/tenants/entities/tenant.entity';
const chalk = require('chalk');

/**
 * Given that we want to handle multiple telegram bots from this unique backend, we manage multiple bot instances using a
 * Map. Keys are tenantsIds, values are Instances of the bots, which is the Telegraf class:
 * 
 * https://telegraf.js.org
 */

@Injectable()
@Global()
export class BotsService implements OnModuleDestroy {

  private readonly logger = new Logger('HTTP');
  private botInstances: Map<number, Telegraf> = new Map();

  constructor(private readonly tenantsService: TenantsService) {}

  async startAllBots(): Promise<boolean> {
    const tenants = await this.tenantsService.findAll();

    tenants.forEach((tenant, index) => {
      if(
        (process.env.ENVIRONMENT == "dev" && tenant.environment == "dev") || 
        (process.env.ENVIRONMENT == "test" && tenant.environment == "test")
      ) {
        this.startBotInstance(tenant);
      }
    });

    return true;
  }

  startBotInstance(tenant: Tenant): boolean {
    if (this.botInstances.has(tenant.id)) {
      // If the instance is already up
      return false;
    }

    if (!tenant) {
      this.logger.error(chalk.red(`Tenant number ${tenant.id} not found`));
    } else if (!tenant.bot_token) {
      this.logger.error(chalk.red(`Bot token not found for tenant number ${tenant.id}`));
    } else {
      const bot = new Telegraf(tenant.bot_token);
      this.botInstances.set(tenant.id, bot);

      this.initBot(bot, tenant);

      return true;
    }
  }

  async getAllBots(): Promise<Map<number, Telegraf>> {
    return this.botInstances;
  }

  async getBotInstance(tenantId: number): Promise<Telegraf> {
    if (this.botInstances.has(tenantId)) {
      return this.botInstances.get(tenantId);
    }

    throw new Error(`Bot instance not found for tenant n. ${tenantId}`);
  }

  initBot(bot: Telegraf, tenant: Tenant) {
    bot.start((ctx) => ctx.reply('Welcome, CARL'));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on('sticker', (ctx) => ctx.reply('👍'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));

    bot.command('login', async (ctx) => {
      const [email, password] = ctx.message.text.split(' ').slice(1);
      // login ...
    });

    // We need to use webhooks because we cannot use polling for multiple instances of tg bots running on the same node instance
    const webhookUrl = `${process.env.WEBHOOK_URL}/telegram/${tenant.id}/bot`;

    bot.telegram.setWebhook(webhookUrl);

    this.logger.log(`Bot successfully started with webhook: ${process.env.WEBHOOK_URL}/telegram/${tenant.id}/bot`);
  }

  onModuleDestroy() {
    this.botInstances.forEach((bot) => bot.stop('Bot stopped due to module destroy'));
  }
}
