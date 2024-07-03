import { Global, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TenantsService } from '../core/tenants/tenants.service';
import { Tenant } from '../core/tenants/entities/tenant.entity';
const chalk = require('chalk');

interface BotInstance {
  bot: Telegraf;
  isRunning: boolean;
}
@Injectable()
@Global()
export class BotsService implements OnModuleDestroy {
  private readonly logger = new Logger('HTTP');
  private botInstances: Map<number, BotInstance> = new Map();

  constructor(private readonly tenantsService: TenantsService) {}

  async startAllBots(): Promise<boolean> {
    const tenants = await this.tenantsService.findAll();

    tenants.forEach((tenant, index) => {
      if (
        (process.env.ENVIRONMENT == 'dev' && tenant.environment == 'dev') ||
        (process.env.ENVIRONMENT == 'test' && tenant.environment == 'test')
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
      this.botInstances.set(tenant.id, { bot, isRunning: false });

      this.initBot(bot, tenant);

      return true;
    }
  }

  async getAllBots(): Promise<Array<[number, BotInstance]>> {

    const keyValueArray = Array.from(this.botInstances.entries());
    console.log()
    return keyValueArray;
  }

  async stopBot(id: number): Promise<String> {
    const botInstance = this.botInstances.get(id);
    botInstance.bot.stop();
    botInstance.isRunning = false;
    return 'success';
  }
  async startBot(id: number): Promise<String> {
    const botInstance = this.botInstances.get(id);
    const tenant = await this.tenantsService.findOne(id);
    this.initBot(botInstance.bot, tenant)
    botInstance.isRunning = true;
    return 'success';
  }
  async stopAllBots(): Promise<String> {
    const keyValueArray = Array.from(this.botInstances.entries());
    keyValueArray.forEach(element => {
      element[1].bot.stop();
      element[1].isRunning = false;
    });
    return 'success';
  }


  async getBotInstance(tenantId: number): Promise<Telegraf> {
    if (this.botInstances.has(tenantId)) {
      return this.botInstances.get(tenantId).bot;
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

    bot.telegram.setWebhook(webhookUrl).then(() => {
      const botInstance = this.botInstances.get(tenant.id);
      if (botInstance) {
        botInstance.isRunning = true;
      }
      this.logger.log(`${tenant.bot_username} successfully started with webhook: ${webhookUrl}`);
    }).catch(err => {
      this.logger.error(`Failed to set webhook for ${tenant.bot_username}: ${err.message}`);
    });
  }

  onModuleDestroy() {
    this.botInstances.forEach(({ bot, isRunning }, tenantId) => {
      if (isRunning) {
        try {
          bot.stop('Bot stopped due to module destroy');
          this.logger.log(`Bot for tenant ${tenantId} stopped successfully.`);
        } catch (error) {
          this.logger.warn(`Failed to stop bot for tenant ${tenantId}: ${error.message}`);
        }
      } else {
        this.logger.warn(`Bot for tenant ${tenantId} was not running.`);
      }
    });
  }
}
