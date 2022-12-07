import { HttpException, HttpStatus } from '@nestjs/common';

type Reasons = 'noId' | 'badNewsId' | 'badCommentId' | 'noCover';

const errorMessages = new Map<Reasons, string>([
  ['noId', 'ID must be passed in the body of the request'],
  ['badNewsId', 'News with passed ID not found'],
  ['noCover', 'The request must contain a file or a link to the cover art'],
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
