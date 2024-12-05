import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../core/application/auth.application';
import { SignInDto } from '../dto/auth/sign-in.dto';
import { SignInResponseDto } from '../dto/auth/sign-in-response.dto';
import { GenerateTokenDto } from '../dto/auth/generate-token.dto';
import { GenerateTokenResponseDto } from '../dto/auth/generate-token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInDto): Promise<SignInResponseDto> {
    const token = await this.authService.signIn(body);
    return { token };
  }

  @Post('generate-token')
  async generateToken(
    @Body() body: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto> {
    const token = await this.authService.generateToken(body);
    return { token };
  }
}
