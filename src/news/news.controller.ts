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
import { BadRequestException } from './news.exception';
import { NewsEntity } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  async getAllNews() {
    return this.newsService.findAll();
  }

  @Get('/all')
  @Render('news-list')
  async getAllNewsView() {
    const news = this.newsService.findAll();

    return {
      title: 'All news',
      news,
    };
  }

  @Get(':id/detail')
  @Render('news-detailed')
  @ApiResponse(BadRequestResponse)
  async getNewsViewById(@Param('id') id: number) {
    const news = await this.newsService.findById(id);

    if (!news) {
      throw new BadRequestException('badId');
    }

    return {
      title: news.title,
      news,
    };
  }

  @Get(':id')
  @ApiResponse(BadRequestResponse)
  async getNewsById(@Param('id') id: number) {
    const news = await this.newsService.findById(id);

    if (!news) {
      throw new BadRequestException('badId');
    }

    return {
      ...news,
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
    console.log(newsItem);
    if (cover?.filename) {
      coverSrc = `/${cover.filename}`;
    }

    if (!coverSrc) {
      throw new BadRequestException('noCover');
    }

    return this.newsService.create(newsItem, coverSrc);
  }

  /*@Patch(':id')
  @ApiResponse(BadRequestResponse)
  updateNewsItemById(@Param('id') id: string, @Body() newsItem: UpdateNewsDto) {
    return this.newsService.update(newsItem, id);
  }*/

  /*@Patch()
  @ApiResponse(BadRequestResponse)
  updateNewsItemByQueryParam(
    @Query('id') id: string,
    @Body() newsItem: UpdateNewsDto,
  ) {
    return this.newsService.update(newsItem, id);
  }*/

  /*@Patch()
  @ApiResponse(BadRequestResponse)
  updateNewsItem(@Param('id') id: string, @Body() newsItem: UpdateNewsDto) {
    return this.newsService.update(newsItem, id);
  }*/

  /*@Delete(':id')
  @ApiResponse(BadRequestResponse)
  deleteNewsById(@Param('id') id: string) {
    return this.newsService.delete(id);
  }*/
}
