import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TenantMiddlewareService } from './middleware/tenant-middleware.service';
import { LoggingMiddlewareService } from './middleware/logging-middleware.service';
import { CoreModule } from './core/core.module';
import { UtilsModule } from './utils/utils.module';
import { MiddlewareModule } from './middleware/middleware.module';

/**
 * To register a middleware, a module must implement NestModule and then you must
 * tell which controller or paths on which to apply it
 * https://docs.nestjs.com/middleware
 */

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    CoreModule,
    UtilsModule,
    MiddlewareModule
  ],
  providers: [AppService],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddlewareService, TenantMiddlewareService).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
