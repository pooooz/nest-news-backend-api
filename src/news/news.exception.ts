import { HttpException, HttpStatus } from '@nestjs/common';

type Reasons = 'noId' | 'badId';

const errorMessages = new Map<Reasons, string>([
  ['noId', 'ID must be passed in the body of the request'],
  ['badId', 'News with passed ID not found'],
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
