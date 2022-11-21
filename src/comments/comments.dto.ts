import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @ApiProperty({
    example: 'My comment',
  })
  text: string;
}
