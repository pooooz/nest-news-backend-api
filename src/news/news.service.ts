import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNewsDto, UpdateNewsDto } from './news.dto';

import { NewsEntity } from './news.entity';
import { UsersService } from '../users/users.service';
import { CommentsService } from '../comments/comments.service';
import { BadRequestException } from './news.exception';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,

    private readonly usersService: UsersService,

    @Inject(forwardRef(() => CommentsService))
    private readonly commentsService: CommentsService,
  ) {}

  async findAll() {
    return await this.newsRepository.find({
      relations: ['user', 'comments', 'comments.user'],
    });
  }

  async findById(id: number) {
    return await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'comments', 'comments.user'],
    });
  }

  async create(newsItem: CreateNewsDto, coverSrc: string) {
    const newNews = new NewsEntity();
    newNews.title = newsItem.title;
    newNews.cover = coverSrc;
    newNews.description = newsItem.description;

    newNews.comments = [];

    const user = await this.usersService.findByEmail(newsItem.authorEmail);
    if (!user) {
      throw new HttpException('Bad user email', 400);
    }

    newNews.user = user;

    return await this.newsRepository.save(newNews);
  }

  async update(updateProps: UpdateNewsDto, updateId?: string) {
    const updateUtil = async (idToUpdate: string) => {
      const paramsToUpdate = {
        cover: updateProps.cover,
        description: updateProps.description,
        title: updateProps.title,
      };

      return await this.newsRepository.update(idToUpdate, {
        ...paramsToUpdate,
      });
    };

    if (!updateId && updateProps.id) {
      return updateUtil(updateProps.id);
    }

    if (updateId && !updateProps.id) {
      return updateUtil(updateId);
    }
  }

  async delete(deleteId: number) {
    const news = await this.newsRepository.findOne({
      where: { id: deleteId },
      relations: ['comments'],
    });

    if (!news) {
      throw new BadRequestException('badCommentId');
    }

    const promiseArray = news.comments.map(({ id }) =>
      this.commentsService.delete(id),
    );

    await Promise.all(promiseArray);

    return this.newsRepository.delete(deleteId);
  }
}
