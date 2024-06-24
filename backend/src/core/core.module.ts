import { Module } from '@nestjs/common';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { UsersService } from './users/users.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersController } from './users/users.controller';
import { TelegramController } from './telegram/telegram.controller';
import { MealsController } from './meals/meals.controller';
import { MealsService } from './meals/meals.service';

@Module({
  controllers: [TenantsController, UsersController, TelegramController, MealsController],
  imports: [UtilsModule],
  providers: [TenantsService, UsersService, MealsService],
  exports: []
})
export class CoreModule {}
