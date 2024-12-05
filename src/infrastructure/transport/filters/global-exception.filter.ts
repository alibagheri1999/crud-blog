import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    ctx.getRequest();
    const status =
      exception?.response?.statusCode ||
      exception.statusCode ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      response: exception?.response?.message || exception?.response || null,
      error:
        exception?.response?.error ||
        exception?.error ||
        'Internal server error',
      statusCode: status,
    };
    response.status(status).json(errorResponse);
  }
}
