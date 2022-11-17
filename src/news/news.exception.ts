import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'News with passed id not found',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
