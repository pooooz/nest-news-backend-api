import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class CrateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
