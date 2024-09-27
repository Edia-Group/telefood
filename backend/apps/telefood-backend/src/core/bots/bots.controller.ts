import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateBotDto } from '@shared/dto/create-bot.dto';
import { UpdateBotDto } from '@shared/dto/update-bot.dto';
import { BotsService } from '../../utils/bots.service';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Post()
  create(@Body() createBotDto: CreateBotDto) {
    //return this.botsService.create(createBotDto);
  }

  @Get()
  getAllBots() {
    return this.botsService.getAllBots();
  }
  @Get('stop/:id')
  stopBot(@Param('id') id: string) {
    return this.botsService.stopBot(+id);
  }
  @Get('start/:id')
  startBot(@Param('id') id: string) {
    return this.botsService.stopBot(+id);
  }
  @Get('startAll')
  startAll(@Param('id') id: string) {
    return this.botsService.startAllBot();
  }
  @Get('stopAll')
  stopAll(@Param('id') id: string) {
    return this.botsService.stopAllBots();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botsService.getBotInstance(+id, false);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotDto: UpdateBotDto) {
    //return this.botsService.update(+id, updateBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.botsService.remove(+id);
  }
}
