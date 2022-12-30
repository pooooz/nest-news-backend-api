import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestResponse } from './comments.responses';
import { BadRequestException } from './comments.exceptions';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  @ApiResponse(BadRequestResponse)
  @ApiTags('comments')
  getCommentsByNewsId(@Param('newsId') newsId: number) {
    return this.commentsService.findByNewsId(newsId);
  }

  @Post('/:newsId')
  @ApiTags('comments')
  createComment(
    @Param('newsId') newsId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.create(newsId, comment);
  }

  @Delete('/:commentId')
  @ApiResponse(BadRequestResponse)
  @ApiTags('comments')
  async deleteComment(@Param('commentId') commentId: number) {
    const { affected } = await this.commentsService.delete(commentId);
    if (!affected) {
      throw new BadRequestException('badCommentId');
    }

    return !!affected;
  }
}
