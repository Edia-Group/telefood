import { Controller, Get } from '@nestjs/common';
import { TelefoodService } from './telefood.service';

@Controller()
export class TelefoodController {
  constructor(private readonly telefoodService: TelefoodService) {}

  @Get()
  getHello(): string {
    return this.telefoodService.getHello();
  }
}
