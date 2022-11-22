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
import { CommentsService } from '../comments/comments.service';
import { renderNewsList } from '../views/news/news.all';
import { renderTemplate } from '../views/template';
import { renderNewsItemDetailed } from '../views/news/news.detailed';

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
  getAllNewsView() {
    const news = this.newsService.getAll();
    const content = renderNewsList(news);

    return renderTemplate(content, {
      title: 'News',
      description: 'News list',
    });
  }

  @Get(':id/detail')
  @ApiResponse(BadRequestResponse)
  getNewsViewById(@Param('id') id: string) {
    const news = this.newsService.getById(id);
    const comments = this.commentsService.getById(id);

    return renderNewsItemDetailed(news, comments);
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
