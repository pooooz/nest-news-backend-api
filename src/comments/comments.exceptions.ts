import { HttpException, HttpStatus } from '@nestjs/common';

type Reasons = 'badNewsId' | 'badCommentId';

const errorMessages = new Map<Reasons, string>([
  ['badNewsId', 'News with passed ID not found'],
  ['badCommentId', 'Comment with passed ID not found'],
]);

export class BadRequestException extends HttpException {
  constructor(reason: Reasons) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: errorMessages.get(reason),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
