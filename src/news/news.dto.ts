import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverSrc: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  views: number;
}

export class UpdateNewsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  author?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  coverSrc?: string;

  @IsNumber()
  @IsOptional()
  views?: number;
}
