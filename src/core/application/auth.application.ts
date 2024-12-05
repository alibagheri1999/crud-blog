import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthApplicationInterface } from './interfaces/auth.application.interface';
import { UserRepository } from '../../infrastructure/database/postgres/user.repository';
import { SignInDto } from '../../infrastructure/transport/dto/auth/sign-in.dto';
import { GenerateTokenDto } from '../../infrastructure/transport/dto/auth/generate-token.dto';
import { sendPostRequest } from '../../shared/utils/axios';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../shared/utils/guard/roles';

@Injectable()
export class AuthService implements AuthApplicationInterface {
  private readonly firebaseAuth: admin.auth.Auth;
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    this.firebaseAuth = this.firebaseApp.auth();
  }

  async signIn(dto: SignInDto): Promise<string> {
    const { token, email } = dto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    try {
      const { idToken } = await this.signInWithEmailAndPassword(token);
      return idToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid email');
    }
  }

  async generateToken(dto: GenerateTokenDto): Promise<string> {
    const { email, user_name, password } = dto;
    const user = await this.userRepository.findByEmail(email);
    try {
      if (!user) {
        const userRecord = await this.firebaseAuth.createUser({
          email,
          displayName: user_name,
          password,
        });
        const newUser = this.userRepository.create({
          email,
          user_name,
          firebase_uid: userRecord.uid,
          role: Role.EDITOR,
        });
        await this.userRepository.save(newUser);
        return this.generateCustomToken(userRecord.uid);
      }
      return this.generateCustomToken(user.firebase_uid);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-exists') {
        throw new BadRequestException('Email is already in use.');
      }
      throw new BadRequestException('GenerateToken failed.');
    }
  }

  private async signInWithEmailAndPassword(token: string) {
    const url =
      this.configService.get<string>('FIREBASE_SIGN_IN_URL') +
      this.configService.get<string>('FIREBASE_API_KEY');
    return await sendPostRequest(
      url,
      {
        token,
        returnSecureToken: true,
      },
      {},
    );
  }

  private async generateCustomToken(uid: string): Promise<string> {
    return this.firebaseAuth.createCustomToken(uid);
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.firebaseAuth.verifyIdToken(token);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
