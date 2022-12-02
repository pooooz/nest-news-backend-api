import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My comment',
  })
  text: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  author?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;
}
