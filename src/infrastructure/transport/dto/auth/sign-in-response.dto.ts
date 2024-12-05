import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponseDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
