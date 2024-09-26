import { Controller, Post, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { BotsService } from '../../utils/bots.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly botsService: BotsService) {}

  @Post(':tenantId/bot/owner')
  async handleUpdateOwner(@Param('tenantId') tenantId: number, @Req() req: Request, @Res() res: Response) {
    const bot = await this.botsService.getBotInstance(+tenantId, true);
    bot.handleUpdate(req.body, res);
  }
  @Post(':tenantId/bot')
  async handleUpdate(@Param('tenantId') tenantId: number, @Req() req: Request, @Res() res: Response) {
    const bot = await this.botsService.getBotInstance(+tenantId, false);
    bot.handleUpdate(req.body, res);
  }


}