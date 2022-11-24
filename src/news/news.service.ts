import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { NewsData } from './news.interfaces';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import { BadRequestException } from './news.exception';

@Injectable()
export class NewsService {
  private readonly news: NewsData = {
    1: {
      id: '1',
      title: 'Initial',
      author: 'Poz',
      description: 'Initial new',
      coverSrc:
        'https://i.pinimg.com/736x/f4/d2/96/f4d2961b652880be432fb9580891ed62.jpg',
      views: 48,
    },
  };

  getAll() {
    return this.news;
  }

  getById(newsId: string) {
    const attempt = this.news[newsId];

    if (!attempt) throw new BadRequestException('badId');

    return attempt;
  }

  create(newsItem: CreateNewsDto, coverSrc: string | undefined) {
    if (!coverSrc) {
      throw new BadRequestException('noCover');
    }

    const newsId = uuidv4();

    const dataItem = {
      ...newsItem,
      coverSrc,
      id: newsId,
    };

    this.news[newsId] = dataItem;

    return dataItem;
  }

  update(updateProps: UpdateNewsDto, updateId?: string) {
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
  }

  delete(deleteId: string) {
    const attempt = this.news[deleteId];

    if (!attempt) throw new BadRequestException('badId');

    delete this.news[deleteId];

    return attempt;
  }
}
