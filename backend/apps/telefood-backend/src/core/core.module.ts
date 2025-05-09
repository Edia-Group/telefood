import { Module } from '@nestjs/common';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { UsersService } from './users/users.service';
import { UtilsModule } from './../../src/utils/utils.module';
import { UsersController } from './users/users.controller';
import { MealsController } from './meals/meals.controller';
import { MealsService } from './meals/meals.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { GlovoController } from './glovo/glovo.controller';
import { GlovoService } from './glovo/glovo.service';
import { BotsController } from './bots/bots.controller';
import { TelegramController } from './telegram/telegram.controller';
import { DiscountsController } from './discounts/discounts.controller';
import { DiscountsService } from './discounts/discounts.service';

@Module({
  controllers: [TenantsController, UsersController, MealsController, OrdersController, GlovoController, BotsController, TelegramController, DiscountsController],
  imports: [UtilsModule, ],
  providers: [TenantsService, UsersService, MealsService, OrdersService, GlovoService, DiscountsService],
  exports: []
})
export class CoreModule {}
