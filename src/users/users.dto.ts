import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class CrateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
