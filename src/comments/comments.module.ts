import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { UsersEntity } from '../users/users.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([CommentsEntity, UsersEntity]),
    CommentsModule,
  ],
})
export class CommentsModule {}
