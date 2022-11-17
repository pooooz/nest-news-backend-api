import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';

import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import { ApiResponse } from '@nestjs/swagger';

import { BadRequestResponse } from './news.responses';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews() {
    return this.newsService.getAll();
  }

  @Get(':id')
  @ApiResponse(BadRequestResponse)
  getNewsById(@Param('id') id: string) {
    return this.newsService.getById(id);
  }

  @Post()
  createNewsItem(@Body() newsItem: CreateNewsDto) {
    return this.newsService.create(newsItem);
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
