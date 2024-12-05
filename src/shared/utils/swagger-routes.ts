import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { routes } from '../../docs/routes';
import { schema } from '../../docs/schemas';

export interface Route {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'; // Valid HTTP methods
  summary: string;
  tags: string[];
  parameters?: any[];
  requestBody?: any;
  responses: any;
  security?: any;
}

export function InitiateDoc(app: INestApplication<any>) {
  // Base Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();

  // Combine routes and schemas into Swagger Document
  const baseDocument = SwaggerModule.createDocument(app, config);

  // Generate `paths`
  const paths: Record<string, PathItemObject> = {};
  const document = {
    ...baseDocument,
    paths: routes.reduce((paths, route) => {
      if (!paths[route.path]) {
        paths[route.path] = {};
      }
      paths[route.path][route.method] = {
        summary: route.summary,
        tags: route.tags,
        parameters: route?.['parameters'] || [],
        requestBody: route.requestBody,
        responses: route.responses,
        security: route?.['security'] || [],
      };
      return paths;
    }, paths),
    components: {
      ...baseDocument.components,
      ...schema.components,
    },
  };

  // Setup Swagger
  SwaggerModule.setup('api-docs', app, document);
}
