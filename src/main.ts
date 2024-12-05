import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './infrastructure/transport/interceptor/response.interceptor';
import { GlobalExceptionFilter } from './infrastructure/transport/filters/global-exception.filter';
import { LoggingInterceptor } from './infrastructure/transport/interceptor/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { routes } from './docs/routes';
import { schema } from './docs/schemas';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { InitiateDoc } from './shared/utils/swagger-routes';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const logger = new Logger('Bootstrap');
  app.useLogger(logger);
  InitiateDoc(app);
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application is running on http://localhost:${port}`);
}

bootstrap();
