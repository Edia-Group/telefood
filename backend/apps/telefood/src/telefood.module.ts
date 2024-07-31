import { Module } from '@nestjs/common';
import { TelefoodController } from './telefood.controller';
import { TelefoodService } from './telefood.service';

@Module({
  imports: [],
  controllers: [TelefoodController],
  providers: [TelefoodService],
})
export class TelefoodModule {}
