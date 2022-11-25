import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from './comments.responses';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileLoadHelper } from '../utils/fileLoadHelper';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  @ApiResponse(BadRequestResponse)
  getCommentsByNewsId(@Param('newsId') newsId: string) {
    return this.commentsService.getById(newsId);
  }

  @Post('/:newsId')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: FileLoadHelper.destinationPath,
        filename: FileLoadHelper.uniqueFileName,
      }),
    }),
  )
  createComment(
    @Param('newsId') newsId: string,
    @Body() comment: CreateCommentDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let avatarSrc = comment.avatar;
    if (avatar?.filename) {
      avatarSrc = `/${avatar.filename}`;
    }

    return this.commentsService.create(newsId, comment, avatarSrc);
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
