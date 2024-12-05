import * as admin from 'firebase-admin';
import { GenerateTokenDto } from '../../../infrastructure/transport/dto/auth/generate-token.dto';
import { SignInDto } from '../../../infrastructure/transport/dto/auth/sign-in.dto';

export interface AuthApplicationInterface {
  signIn(dto: SignInDto): Promise<string>;
  generateToken(dto: GenerateTokenDto): Promise<string>;
  verifyToken(token: string): Promise<admin.auth.DecodedIdToken>;
}
