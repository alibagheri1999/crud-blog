export const routes = [
  {
    path: '/api/v1/auth/sign-in',
    method: 'post',
    summary: 'Sign in a user',
    tags: ['Auth'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/SignInDto' },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful sign-in',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SignInResponseDto' },
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/auth/generate-token',
    method: 'post',
    summary: 'generate token a new user',
    tags: ['Auth'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/GenerateTokenDto' },
        },
      },
    },
    responses: {
      201: {
        description: 'Successful generate token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/GenerateTokenResponseDto' },
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/posts',
    method: 'post',
    summary: 'Create a new blog post',
    tags: ['Blogs'],
    security: [
      {
        Authorization: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateBlogDto' },
        },
      },
    },
    responses: {
      200: {
        description: 'Blog created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Blog' },
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/posts/{id}',
    method: 'put',
    summary: 'Update a blog post',
    tags: ['Blogs'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the blog post',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    security: [
      {
        Authorization: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateBlogDto' },
        },
      },
    },
    responses: {
      200: {
        description: 'Blog created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Blog' },
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/posts/{id}',
    method: 'delete',
    summary: 'delete a blog post',
    tags: ['Blogs'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the blog post',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      200: {
        description: 'Blog deleted successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/VoidMessage' },
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/posts/{id}',
    method: 'get',
    summary: 'get a blog post',
    tags: ['Blogs'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the blog post',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      200: {
        description: 'Blog created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Blog' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      404: {
        description: 'NotFound',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/posts/',
    method: 'get',
    summary: 'get all blog posts',
    tags: ['Blogs'],
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'The page number',
        required: false,
        schema: {
          type: 'integer',
          default: 1,
          minimum: 1,
        },
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Number of items per page',
        required: false,
        schema: {
          type: 'integer',
          default: 10,
          minimum: 1,
        },
      },
      {
        name: 'sortBy',
        in: 'query',
        description: 'Sorting preferences as [field, direction]',
        required: false,
        schema: {
          type: 'array',
          items: {
            type: 'array',
            items: [
              { type: 'string', description: 'Field to sort by' },
              {
                type: 'string',
                enum: ['asc', 'desc'],
                description: 'Sort direction',
              },
            ],
          },
        },
      },
      {
        name: 'searchBy',
        in: 'query',
        description: 'Fields to search in',
        required: false,
        schema: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      {
        name: 'search',
        in: 'query',
        description: 'Search keyword',
        required: false,
        schema: { type: 'string' },
      },
      {
        name: 'filter',
        in: 'query',
        description: 'Filters for specific fields',
        required: false,
        schema: {
          type: 'object',
          additionalProperties: {
            anyOf: [
              { type: 'string' },
              { type: 'array', items: { type: 'string' } },
            ],
          },
        },
      },
      {
        name: 'select',
        in: 'query',
        description: 'Fields to select',
        required: false,
        schema: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    ],
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      200: {
        description: 'Get all Blogs successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PaginatedBlogsResponse' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  {
    path: '/api/v1/posts/upload-image/{id}',
    method: 'put',
    summary: 'Upload an image for a blog post',
    tags: ['Blogs'],
    security: [
      {
        Authorization: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the blog post',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              image: {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload',
              },
            },
            required: ['image'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Image uploaded successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Blog' },
          },
        },
      },
      400: {
        description: 'Validation error or invalid file',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      404: {
        description: 'Blog post not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
];
