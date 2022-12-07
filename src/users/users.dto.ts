import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class CrateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
