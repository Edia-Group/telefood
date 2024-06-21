import { Module } from '@nestjs/common';
import { UsersService } from 'src/core/users/users.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    imports: [UtilsModule],
    providers: [UsersService],
    exports: [UsersService],
  })
export class MiddlewareModule {}
