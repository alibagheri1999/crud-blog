import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GenerateTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  user_name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  password: string;
}
