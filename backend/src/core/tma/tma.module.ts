import { Module } from '@nestjs/common';
import { TmaService } from './tma.service';
import { TmaController } from './tma.controller';

@Module({
  controllers: [TmaController],
  providers: [TmaService],
})
export class TmaModule {}
