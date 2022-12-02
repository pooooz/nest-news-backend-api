import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNewsDto } from './news.dto';

import { NewsEntity } from './news.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    private readonly usersService: UsersService,
  ) {}

  async findAll() {
    return await this.newsRepository.find({ relations: ['user'] });
  }

  async findById(id: number) {
    return await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

  async create(newsItem: CreateNewsDto, coverSrc: string) {
    const newNews = new NewsEntity();
    newNews.title = newsItem.title;
    newNews.cover = coverSrc;
    newNews.description = newsItem.description;

    const user = await this.usersService.findByEmail(newsItem.authorEmail);
    if (!user) {
      throw new HttpException('Bad user id', 400);
    }

    newNews.user = user;

    return await this.newsRepository.save(newNews);
  }

  /*update(updateProps: UpdateNewsDto, updateId?: string) {
    if (!updateId && Object.keys(updateProps).indexOf('id') < 0)
      throw new BadRequestException('noId');

    const updateUtil = (idToUpdate: string) => {
      const attempt = this.news[idToUpdate];

      if (attempt) {
        const updated = {
          ...attempt,
          ...updateProps,
        };

        this.news[idToUpdate] = updated;

        return updated;
      }

      throw new BadRequestException('badId');
    };

    if (updateId) return updateUtil(updateId);
    if (updateProps.id) return updateUtil(updateProps.id);
  }*/

  /*delete(deleteId: string) {
    const attempt = this.news[deleteId];

    if (!attempt) throw new BadRequestException('badId');

    delete this.news[deleteId];

    return attempt;
  }*/
}
