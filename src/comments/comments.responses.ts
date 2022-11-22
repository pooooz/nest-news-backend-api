import { ApiProperty } from '@nestjs/swagger';

class BadRequestError {
  @ApiProperty({
    description: 'status',
    example: 400,
  })
  status: number;

  @ApiProperty({
    description: 'error',
    example: 'News with passed id not found',
  })
  error: string;
}

export const BadRequestResponse = {
  type: BadRequestError,
  status: 400,
};
