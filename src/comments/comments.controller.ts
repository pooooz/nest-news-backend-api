import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from './comments.responses';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  @ApiResponse(BadRequestResponse)
  getCommentsByNewsId(@Param('newsId') newsId: string) {
    return this.commentsService.getById(newsId);
  }

  @Post('/:newsId')
  createComment(
    @Param('newsId') newsId: string,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.create(newsId, comment);
  }

  @Delete('/:newsId/:commentId')
  @ApiResponse(BadRequestResponse)
  deleteComment(
    @Param('newsId') newsId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.delete(newsId, commentId);
  }

  @Patch('/:newsId/:commentId')
  @ApiResponse(BadRequestResponse)
  changeComment(
    @Param('newsId') newsId: string,
    @Param('commentId') commentId: string,
    @Body() commentItem: UpdateCommentDto,
  ) {
    return this.commentsService.update(newsId, commentId, commentItem);
  }
}
