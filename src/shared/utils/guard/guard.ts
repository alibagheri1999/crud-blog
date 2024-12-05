import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { UserRepository } from '../../../infrastructure/database/postgres/user.repository';
// import * as firebaseAuth from 'firebase/auth';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }
    const token = this.extractTokenFromHeader(authHeader);
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      const user = await this.userRepository.findById(decodedToken.uid);
      if (!user) {
        throw new UnauthorizedException('User not found in database.');
      }
      // Attach user to request.d.ts
      request.user = user;
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  private extractTokenFromHeader(authHeader: string): string {
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7); // Remove "Bearer " prefix
    }
    throw new UnauthorizedException('Invalid Authorization header format.');
  }
}
