import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { Role } from './auth/role/role.enum';

export class CrateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsOptional()
  avatar?: string;
}
