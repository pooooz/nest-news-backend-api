import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from './comments.responses';
import { BadRequestException } from './comments.exceptions';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  @ApiResponse(BadRequestResponse)
  getCommentsByNewsId(@Param('newsId') newsId: number) {
    return this.commentsService.findByNewsId(newsId);
  }

  @Post('/:newsId')
  createComment(
    @Param('newsId') newsId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.create(newsId, comment);
  }

  @Delete('/:commentId')
  @ApiResponse(BadRequestResponse)
  async deleteComment(@Param('commentId') commentId: number) {
    const { affected } = await this.commentsService.delete(commentId);
    if (!affected) {
      throw new BadRequestException('badCommentId');
    }

    return !!affected;
  }
}
