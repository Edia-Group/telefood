import { Module } from '@nestjs/common';
import { UsersService } from '../core/users/users.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
    imports: [UtilsModule],
    providers: [UsersService],
    exports: [UsersService],
  })
export class MiddlewareModule {}
