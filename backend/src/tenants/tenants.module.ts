import { Module } from '@nestjs/common';
import { PbmService } from './pizza-by-mike/pbm.service';
import { PbmController } from './pizza-by-mike/pbm.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { BkController } from './bastia-kebab/bk.controller';
import { BkService } from './bastia-kebab/bk.service';
@Module({
  controllers: [PbmController, BkController],
  imports: [UtilsModule],
  providers: [PbmService, BkService],
})
export class TenantsModule {}
