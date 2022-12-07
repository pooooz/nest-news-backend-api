import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { UsersEntity } from '../users/users.entity';
import { NewsModule } from '../news/news.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([CommentsEntity, UsersEntity]),
    forwardRef(() => NewsModule),
    UsersModule,
  ],
  exports: [TypeOrmModule.forFeature([CommentsEntity]), CommentsService],
})
export class CommentsModule {}
