import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  views: number;
}

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  views?: number;
}
