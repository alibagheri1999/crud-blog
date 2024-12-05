import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  token: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
