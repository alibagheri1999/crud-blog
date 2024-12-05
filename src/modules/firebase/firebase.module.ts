import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { AuthService } from '../../core/application/auth.application';
import { AuthController } from '../../infrastructure/transport/rest/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/database/postgres/user.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const firebase_params = {
          type: configService.get<string>('FIREBASE_TYPE'),
          projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
          privateKeyId: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
          privateKey: configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'),
          clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          clientId: configService.get<string>('FIREBASE_CLIENT_ID'),
          authUri: configService.get<string>('FIREBASE_AUTH_URL'),
          tokenUri: configService.get<string>('FIREBASE_TOKEN_URL'),
          authProviderX509CertUrl: configService.get<string>(
            'FIREBASE_AUTH_PROVIDER',
          ),
          clientC509CertUrl: configService.get<string>(
            'FIREBASE_CLIENT_PROVIDER',
          ),
        };
        return admin.initializeApp({
          credential: admin.credential.cert(firebase_params),
        });
      },
    },
    AuthService,
    UserRepository,
  ],
  controllers: [AuthController],
  exports: ['FIREBASE_ADMIN', AuthService],
})
export class FirebaseModule {}
