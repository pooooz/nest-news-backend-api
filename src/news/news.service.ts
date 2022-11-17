import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { NewsEntity } from './news.interfaces';
import { CreateNewsDto } from './news.dto';

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
    return this.news.find(({ id }) => id === searchId);
  }

  create(newsItem: CreateNewsDto) {
    const dataItem = {
      ...newsItem,
      id: uuidv4(),
    };

    this.news.push(dataItem);

    return dataItem;
  }

  delete(deleteId: NewsEntity['id']) {
    const removeIdx = this.news.findIndex(({ id }) => id === deleteId);
    const deleted = this.news[removeIdx];

    if (removeIdx > -1) {
      this.news.splice(removeIdx, 1);
      return deleted;
    }

    return null;
  }
}
