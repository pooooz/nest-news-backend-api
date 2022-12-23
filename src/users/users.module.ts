import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule.forFeature([UsersEntity]), UsersService],
})
export class UsersModule {}
