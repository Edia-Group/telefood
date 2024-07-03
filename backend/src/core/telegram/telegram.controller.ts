import { Controller, Post, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { BotsService } from 'src/utils/bots.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly botsService: BotsService) {}

  @Post(':tenantId/bot')
  async handleUpdate(@Param('tenantId') tenantId: number, @Req() req: Request, @Res() res: Response) {
    const bot = await this.botsService.getBotInstance(+tenantId);
    bot.handleUpdate(req.body, res);
  }
}