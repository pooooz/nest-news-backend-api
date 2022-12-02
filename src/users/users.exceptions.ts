import { HttpException, HttpStatus } from '@nestjs/common';

type Reasons = 'noAvatar';

const errorMessages = new Map<Reasons, string>([
  ['noAvatar', 'The request must contain a file or a link to the avatar art'],
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
