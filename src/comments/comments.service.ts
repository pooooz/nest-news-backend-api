import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CommentsData } from './comments.interfaces';
import { BadRequestException } from './comments.exceptions';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  private readonly comments: CommentsData = {
    1: [{ id: '1', author: 'Poz', text: 'New comment' }],
  };

  getById(newsId: string) {
    const attempt = this.comments[newsId];
    if (attempt) {
      return attempt;
    }

    throw new BadRequestException('badNewsId');
  }

  create(newsId: string, comment: CreateCommentDto) {
    console.log(comment);
    const attempt = this.comments[newsId];

    if (!attempt) {
      this.comments[newsId] = [];
    }

    const newCommentId = uuidv4();
    const newComment = {
      id: newCommentId,
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
