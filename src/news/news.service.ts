import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { NewsEntity } from './news.interfaces';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import { BadRequestException } from './news.exception';

@Injectable()
export class NewsService {
  private readonly news: Array<NewsEntity> = [
    {
      id: '1',
      title: 'Initial',
      author: 'Poz',
      description: 'Initial new',
      views: 48,
    },
  ];

  getAll() {
    return this.news;
  }

  getById(searchId: NewsEntity['id']) {
    const found = this.news.find(({ id }) => id === searchId);
    if (!found) throw new BadRequestException('badId');

    return found;
  }

  create(newsItem: CreateNewsDto) {
    const dataItem = {
      ...newsItem,
      id: uuidv4(),
    };

    this.news.push(dataItem);

    return dataItem;
  }

  update(updateProps: UpdateNewsDto, updateId?: NewsEntity['id']) {
    if (!updateId && Object.keys(updateProps).indexOf('id') < 0)
      throw new BadRequestException('noId');

    const updateUtil = (idToUpdate: string) => {
      const newsItemToUpdateIdx = this.news.findIndex(
        ({ id }) => id === idToUpdate,
      );

      if (newsItemToUpdateIdx > -1) {
        const outdated = this.news[newsItemToUpdateIdx];

        const updated = {
          ...outdated,
          ...updateProps,
        };

        this.news[newsItemToUpdateIdx] = updated;

        return updated;
      }

      throw new BadRequestException('badId');
    };

    if (updateId) return updateUtil(updateId);
    if (updateProps.id) return updateUtil(updateProps.id);

    throw new BadRequestException('badId');
  }

  delete(deleteId: NewsEntity['id']) {
    const removeIdx = this.news.findIndex(({ id }) => id === deleteId);

    if (removeIdx < 0) throw new BadRequestException('badId');

    const deleted = this.news[removeIdx];

    this.news.splice(removeIdx, 1);
    return deleted;
  }
}
