import { Module } from '@nestjs/common';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { UsersService } from './users/users.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersController } from './users/users.controller';
import { TelegramController } from './telegram/telegram.controller';
import { MealsController } from './meals/meals.controller';
import { MealsService } from './meals/meals.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';

@Module({
  controllers: [TenantsController, UsersController, TelegramController, MealsController, OrdersController],
  imports: [UtilsModule, ],
  providers: [TenantsService, UsersService, MealsService, OrdersService],
  exports: []
})
export class CoreModule {}
