import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';

import { NewsService } from './news.service';
import { CreateNewsDto } from './news.dto';
import { BadRequestException } from './news.exception';
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
    const found = this.newsService.getById(id);
    if (found) {
      return found;
    }

    throw new BadRequestException();
  }

  @Post()
  createNewsItem(@Body() newsItem: CreateNewsDto) {
    return this.newsService.create(newsItem);
  }

  @Delete(':id')
  @ApiResponse(BadRequestResponse)
  deleteNewsById(@Param('id') id: string) {
    const deleted = this.newsService.delete(id);

    if (deleted) {
      return deleted;
    }

    throw new BadRequestException();
  }
}
