import { Global, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TenantsService } from '../core/tenants/tenants.service';
import { Tenant } from '@shared/entity/tenant.entity';
import { Order } from '@shared/entity/order.entity';
const chalk = require('chalk');

export interface BotInstance {
  bot: Telegraf;
  isRunning: boolean;
}

interface MenuButton {
  type: 'web_app';
  text: string;
  web_app: { url: string };
}


@Injectable()
@Global()
export class BotsService implements OnModuleDestroy {
  private readonly logger = new Logger('HTTP');
  private botInstances: Map<number, BotInstance[]> = new Map();

  constructor(private readonly tenantsService: TenantsService) {}

  async startAllBots(): Promise<boolean> {
    const tenants = await this.tenantsService.findAll();

    tenants.forEach((tenant, index) => {
      if (
        (process.env.ENVIRONMENT == 'dev' && tenant.environment == 'dev') ||
        (process.env.ENVIRONMENT == 'test' && tenant.environment == 'test') ||
        (process.env.ENVIRONMENT == 'prod' && tenant.environment == 'prod') 
      ) {
        if(process.env.DEV_OWNER == tenant.dev_owner) {
          this.startBotInstance(tenant);
        }
      }
    });

    return true;
  }

  startBotInstance(tenant: Tenant): boolean {
    if (this.botInstances.has(tenant.id)) {
      // If the instances are already up
      return false;
    }
  
    if (!tenant) {
      this.logger.error(chalk.red(`Tenant number ${tenant.id} not found`));
      return false;
    } else if (!tenant.bot_token) {
      this.logger.error(chalk.red(`Bot token not found for tenant number ${tenant.id}`));
      return false;
    }
  
    try {
      const bot = new Telegraf(tenant.bot_token);
      const botInstances: BotInstance[] = [{ bot, isRunning: false }];
  
      if (tenant.bot_token_owner) {
        const bot_owner = new Telegraf(tenant.bot_token_owner);
        botInstances.push({ bot: bot_owner, isRunning: false });
      }
  
      this.botInstances.set(tenant.id, botInstances);
  
      this.initBot(bot, tenant, false);
      if (tenant.bot_token_owner) {
        this.initBot(botInstances[1].bot, tenant, true);
      }
      return true;
    } catch (error) {
      this.logger.error(chalk.red(`Failed to start bot instance for tenant ${tenant.id}: ${error.message}`));
      return false;
    }
  }

  async getAllBots(): Promise<Array<[number, BotInstance[]]>> {

    const keyValueArray = Array.from(this.botInstances.entries());
    console.log()
    return keyValueArray;
  }

  async startAllBot(): Promise<String> {
    for (const [key, value] of this.botInstances.entries()) {
      this.startBot(key);
    }
    return 'success';
  }

  async stopAllBots(): Promise<String> {
    for (const [key, value] of this.botInstances.entries()) {
      this.stopBot(key);
    }
    return 'success';
  }

  async stopBot(id: number): Promise<String> {
    const botInstance = this.botInstances.get(id)[0];
    botInstance.bot.telegram.deleteWebhook();
    botInstance.isRunning = false;

    const botInstance1 = this.botInstances.get(id)[1];
    botInstance1.bot.telegram.deleteWebhook();
    botInstance1.isRunning = false;
    return 'success';
  }

  async startBot(id: number): Promise<String> {
    const tenant = await this.tenantsService.findOne(id);
    if (!tenant) {
      throw new Error(`Tenant with id ${id} not found`);
    }
  
    const botInstances = this.botInstances.get(id);
    if (!botInstances) {
      throw new Error(`Bot instances for tenant ${id} not found`);
    }
  
    const [normalBot, ownerBot] = botInstances;
  
    await this.initBot(normalBot.bot, tenant, false);
    normalBot.isRunning = true;
  
    if (tenant.bot_token_owner && ownerBot) {
      await this.initBot(ownerBot.bot, tenant, true);
      ownerBot.isRunning = true;
    }
  
    return 'success';
  }

  async findOne(id: number): Promise<String> {
    const botInstance = this.botInstances.get(id);
    const keyValueArray = Array.from(this.botInstances.entries());
    return 'success';
  }


  async getBotInstance(tenantId: number, isOwner: boolean): Promise<Telegraf> {

    if (this.botInstances.has(tenantId)) {
      return this.botInstances.get(tenantId)[isOwner ? 1 : 0].bot;
    }

    throw new Error(`Bot instance not found for tenant n. ${tenantId}`);
  }


  // BOT BEHAVIOURS HERE
  async initBot(bot: Telegraf, tenant: Tenant, isOwner: boolean = false) {
    if (!isOwner) {
      bot.start((ctx) => ctx.reply('Welcome, CARL'));
      bot.help((ctx) => ctx.reply('Mandame uno sticchio'));
      bot.on('sticker', (ctx) => ctx.reply('👍'));
      bot.hears('ciao', (ctx) => ctx.reply('Bella a chicco'));
    
      // Get the current menu button text
      const currentMenuButton = await bot.telegram.getChatMenuButton() as MenuButton;
      const currentMenuButtonText = currentMenuButton.text
  
      // Encode the tenantId in the Web App URL. Essential for including the X_tenant_id header in all requests from frontend.
      // This URL is special because it serves only to open the bot and launch the miniapp But the main URL is still the one you set up inside BotFather settings, for example https://telefood.com
      // https://docs.telegram-mini-apps.com/platform/start-parameter#start-parameter
      const webAppUrl = `${tenant.mini_app_url}?startapp=${tenant.id}`;
    
      bot.telegram.setChatMenuButton({
        menuButton: {
          type: 'web_app',
          text: currentMenuButtonText,
          web_app: { url: webAppUrl }
        }
      }).catch(err => {
        this.logger.error(`Failed to set menu button for ${tenant.bot_username}: ${err.message}`);
      }); 
      
    } else {
      bot.start((ctx) => ctx.reply('Welcome, FRED\n Questo è il bot gestionale per la tua pizzeria\nRiceverai qui i tuoi ordini'));
      bot.help((ctx) => ctx.reply('Mandame uno sticchio'));
      bot.on('sticker', (ctx) => ctx.reply('👍'));
      bot.hears('ciao', (ctx) => ctx.reply('Bella a chicco'));
      bot.command('register', async (ctx) => {
        const chatId = ctx.message.chat.id;
        ctx.reply(`Your chat ID is ${chatId}`);
      })

    }      

    // We need to use webhooks because we cannot use polling for multiple instances of tg bots running on the same node instance
    const webhookUrl = `${process.env.WEBHOOK_URL}/telegram/${tenant.id}/bot${isOwner ? '/owner' : ''}`;

    bot.telegram.setWebhook(webhookUrl).then(() => {
      const botInstance = this.botInstances.get(tenant.id)[isOwner ? 1 : 0];
      if (botInstance) {
        botInstance.isRunning = true;
      }
      this.logger.log(`${isOwner ? tenant.bot_username_owner : tenant.bot_username} successfully started with webhook: ${webhookUrl}`);
    }).catch(err => {
      this.logger.error(`Failed to set webhook for ${isOwner ? tenant.bot_username_owner : tenant.bot_username}: ${err.message}`);
    });
    
  }

  async sendNotification(tenantId: number, chatId: number, order: Order) {
    const botInstance = await this.getBotInstance(tenantId, true);
    botInstance.telegram.sendMessage(chatId, order.ownerVisualize());
  }


  onModuleDestroy() {
    this.botInstances.forEach((bots, tenantId) => {
      if (bots[0].isRunning) {
        try {
          bots[0].bot.stop('Bot stopped due to module destroy');
          bots[1].bot.stop('Bot stopped due to module destroy');

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
