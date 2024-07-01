import { Telegraf } from "telegraf";

interface BotInstance {
  bot: Telegraf;
  isRunning: boolean;
}
