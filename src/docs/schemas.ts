export const schema = {
  components: {
    schemas: {
      SignInDto: {
        type: 'object',
        required: ['token', 'email'],
        properties: {
          token: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
      },
      SignInResponseDto: {
        type: 'object',
        properties: {
          response: {
            type: 'object',
            required: ['token'],
            properties: {
              token: {
                type: 'string',
              },
            },
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
      GenerateTokenDto: {
        type: 'object',
        required: ['email', 'user_name', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          user_name: {
            type: 'string',
            minLength: 2,
          },
          password: {
            type: 'string',
            minLength: 2,
          },
        },
      },
      GenerateTokenResponseDto: {
        type: 'object',
        properties: {
          response: {
            type: 'object',
            required: ['token'],
            properties: {
              token: {
                type: 'string',
              },
            },
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
      CreateBlogDto: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: {
            type: 'string',
            minLength: 3,
          },
          content: {
            type: 'string',
            minLength: 3,
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          response: {
            type: 'string',
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
      VoidMessage: {
        type: 'object',
        properties: {
          response: {
            type: 'string',
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
      Blog: {
        type: 'object',
        properties: {
          response: {
            type: 'object',
            required: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
              },
              title: {
                type: 'string',
              },
              content: {
                type: 'string',
              },
              image: {
                type: 'string',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
      PaginatedBlogsResponse: {
        type: 'object',
        properties: {
          response: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Blog' },
              },
              meta: {
                type: 'object',
                properties: {
                  totalItems: {
                    type: 'integer',
                    description: 'Total number of items',
                  },
                  itemCount: {
                    type: 'integer',
                    description: 'Number of items in the current page',
                  },
                  itemsPerPage: {
                    type: 'integer',
                    description: 'Number of items per page',
                  },
                  totalPages: {
                    type: 'integer',
                    description: 'Total number of pages',
                  },
                  currentPage: {
                    type: 'integer',
                    description: 'Current page number',
                  },
                },
              },
              links: {
                type: 'object',
                properties: {
                  first: {
                    type: 'string',
                    description: 'Link to the first page',
                  },
                  previous: {
                    type: 'string',
                    description: 'Link to the previous page',
                  },
                  next: {
                    type: 'string',
                    description: 'Link to the next page',
                  },
                  last: {
                    type: 'string',
                    description: 'Link to the last page',
                  },
                },
              },
            },
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
    },
  },
};
