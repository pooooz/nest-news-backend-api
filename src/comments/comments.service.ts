import { Injectable, forwardRef, Inject } from '@nestjs/common';

import { BadRequestException } from './comments.exceptions';
import { CreateCommentDto } from './comments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from './comments.entity';
import { NewsService } from '../news/news.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,

    private readonly usersService: UsersService,

    @Inject(forwardRef(() => NewsService))
    private readonly newsService: NewsService,
  ) {}

  async findByNewsId(newsId: number) {
    const news = await this.newsService.findById(newsId);

    if (!news) {
      throw new BadRequestException('badNewsId');
    }

    return news.comments;
  }

  async create(newsId: number, comment: CreateCommentDto) {
    const newComment = new CommentsEntity();
    newComment.text = comment.text;

    const news = await this.newsService.findById(newsId);

    if (!news) {
      throw new BadRequestException('badNewsId');
    }

    newComment.news = news;

    const user = await this.usersService.findByEmail(comment.authorEmail);

    if (!user) {
      throw new BadRequestException('badUserEmail');
    }

    newComment.user = user;

    return this.commentsRepository.save(newComment);
  }

  async delete(commentId: number) {
    return this.commentsRepository.delete(commentId);
  }
}
