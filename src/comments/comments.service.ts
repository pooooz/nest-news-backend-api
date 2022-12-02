import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CommentsData } from './comments.interfaces';
import { BadRequestException } from './comments.exceptions';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../news/news.entity';
import { Repository } from 'typeorm';
import { CommentsEntity } from './comments.entity';

@Injectable()
export class CommentsService {
  private readonly comments: CommentsData = {
    1: [
      {
        id: '1',
        author: 'Poz',
        text: 'New comment',
        avatar:
          'https://i.pinimg.com/550x/83/d3/36/83d336bea6c487be42c146f095acc28f.jpg',
      },
    ],
  };

  constructor(
    @InjectRepository(CommentsEntity)
    private readonly newsRepository: Repository<CommentsEntity>,
  ) {}

  getById(newsId: string) {
    const attempt = this.comments[newsId];

    return attempt || [];
  }

  create(
    newsId: string,
    comment: CreateCommentDto,
    avatar: string | undefined,
  ) {
    const attempt = this.comments[newsId];

    if (!attempt) {
      this.comments[newsId] = [];
    }

    const avatarSrc =
      avatar ||
      'https://i.pinimg.com/550x/83/d3/36/83d336bea6c487be42c146f095acc28f.jpg';
    const newCommentId = uuidv4();

    const newComment = {
      id: newCommentId,
      avatar: avatarSrc,
      ...comment,
    };

    this.comments[newsId].push(newComment);

    return newComment;
  }

  delete(newsId: string, commentId: string) {
    const attempt = this.comments[newsId];
    if (!attempt) throw new BadRequestException('badNewsId');

    const commentIdx = attempt.findIndex(({ id }) => id === commentId);

    if (commentIdx < 0) throw new BadRequestException('badCommentId');

    return this.comments[newsId].splice(commentIdx, 1);
  }

  update(newsId: string, commentId: string, updateProps: UpdateCommentDto) {
    const attempt = this.comments[newsId];

    if (!attempt) throw new BadRequestException('badNewsId');

    const commentIdx = attempt.findIndex(({ id }) => id === commentId);

    if (commentIdx < 0) throw new BadRequestException('badCommentId');

    const updated = { ...attempt[commentIdx], ...updateProps };

    this.comments[newsId][commentIdx] = updated;

    return updated;
  }
}
