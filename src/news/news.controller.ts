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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Render } from '@nestjs/common';

import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

import { BadRequestResponse } from './news.responses';
import { FileLoadHelper } from '../utils/fileLoadHelper';
import { BadRequestException } from './news.exception';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiTags('news')
  async getAllNews() {
    return this.newsService.findAll();
  }

  @Get('/all')
  @Render('news-list')
  @ApiTags('news')
  async getAllNewsView() {
    const news = await this.newsService.findAll();

    return {
      title: 'All news',
      news,
    };
  }

  @Get(':id/detail')
  @Render('news-detailed')
  @ApiResponse(BadRequestResponse)
  @ApiTags('news')
  async getNewsViewById(@Param('id') id: number) {
    const news = await this.newsService.findById(id);

    if (!news) {
      throw new BadRequestException('badNewsId');
    }

    return {
      title: news.title,
      news,
    };
  }

  @Get(':id')
  @ApiResponse(BadRequestResponse)
  @ApiTags('news')
  async getNewsById(@Param('id') id: number) {
    const news = await this.newsService.findById(id);

    if (!news) {
      throw new BadRequestException('badNewsId');
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
  @ApiTags('news')
  createNewsItem(
    @Body() newsItem: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    let coverSrc = newsItem.coverSrc;
    if (cover?.filename) {
      coverSrc = `/${cover.filename}`;
    }

    if (!coverSrc) {
      throw new BadRequestException('noCover');
    }

    return this.newsService.create(newsItem, coverSrc);
  }

  @Patch(':id')
  @ApiResponse(BadRequestResponse)
  @ApiTags('news')
  async updateNewsItemById(
    @Param('id') id: string,
    @Body() newsItem: UpdateNewsDto,
  ) {
    const result = await this.newsService.update(newsItem, id);
    if (!result?.affected) {
      throw new BadRequestException('badNewsId');
    }
    return !!result?.affected;
  }

  @Patch()
  @ApiResponse(BadRequestResponse)
  @ApiTags('news')
  updateNewsItemByQueryParam(
    @Query('id') id: string,
    @Body() newsItem: UpdateNewsDto,
  ) {
    return this.newsService.update(newsItem, id);
  }

  @Patch()
  @ApiResponse(BadRequestResponse)
  @ApiTags('news')
  updateNewsItem(@Param('id') id: string, @Body() newsItem: UpdateNewsDto) {
    return this.newsService.update(newsItem, id);
  }

  @Delete(':id')
  @ApiResponse(BadRequestResponse)
  @ApiTags('news')
  async deleteNewsById(@Param('id') id: number) {
    const { affected } = await this.newsService.delete(id);
    if (!affected) {
      throw new BadRequestException('badNewsId');
    }
    return !!affected;
  }
}
