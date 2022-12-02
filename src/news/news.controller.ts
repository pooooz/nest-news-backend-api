import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse } from '@nestjs/swagger';
import { Render } from '@nestjs/common';

import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

import { BadRequestResponse } from './news.responses';
import { CommentsService } from '../comments/comments.service';
import { FileLoadHelper } from '../utils/fileLoadHelper';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  getAllNews() {
    return this.newsService.getAll();
  }

  @Get('/all')
  @Render('news-list')
  getAllNewsView() {
    const news = this.newsService.getAll();

    return {
      title: 'All news',
      news,
    };
  }

  @Get(':id/detail')
  @Render('news-detailed')
  @ApiResponse(BadRequestResponse)
  getNewsViewById(@Param('id') id: string) {
    const news = this.newsService.getById(id);
    const comments = this.commentsService.getById(id);

    return {
      title: news.title,
      comments,
      news,
    };
  }

  @Get(':id')
  @ApiResponse(BadRequestResponse)
  getNewsById(@Param('id') id: string) {
    const news = this.newsService.getById(id);
    const comments = this.commentsService.getById(id);

    return {
      ...news,
      comments,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: FileLoadHelper.destinationPath,
        filename: FileLoadHelper.uniqueFileName,
      }),
    }),
  )
  createNewsItem(
    @Body() newsItem: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    let coverSrc = newsItem.coverSrc;
    if (cover?.filename) {
      coverSrc = `/${cover.filename}`;
    }

    return this.newsService.create(newsItem, coverSrc);
  }

  @Patch(':id')
  @ApiResponse(BadRequestResponse)
  updateNewsItemById(@Param('id') id: string, @Body() newsItem: UpdateNewsDto) {
    return this.newsService.update(newsItem, id);
  }

  @Patch()
  @ApiResponse(BadRequestResponse)
  updateNewsItemByQueryParam(
    @Query('id') id: string,
    @Body() newsItem: UpdateNewsDto,
  ) {
    return this.newsService.update(newsItem, id);
  }

  @Patch()
  @ApiResponse(BadRequestResponse)
  updateNewsItem(@Param('id') id: string, @Body() newsItem: UpdateNewsDto) {
    return this.newsService.update(newsItem, id);
  }

  @Delete(':id')
  @ApiResponse(BadRequestResponse)
  deleteNewsById(@Param('id') id: string) {
    return this.newsService.delete(id);
  }
}
