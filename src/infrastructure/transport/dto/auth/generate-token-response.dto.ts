import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenResponseDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
