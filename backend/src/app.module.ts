import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './utils/supabase/supabase.module';
import { TelegrafModule } from './utils/telegraf/telegraf.module';
import { CoreModule } from './core/core.module';
import { TenantMiddlewareService } from './middleware/tenant-middleware.service';
import { LoggingMiddlewareService } from './middleware/logging-middleware.service';


/**
 * Per registrare dei middleware, un modulo deve implementare NestModule e poi 
 * devi indicare controller o path diretto su quali applicarlo
 * https://docs.nestjs.com/middleware
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    TelegrafModule,
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddlewareService, TenantMiddlewareService).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
