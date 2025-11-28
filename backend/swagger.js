const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Express API',
      version: '1.0.0',
      description: '풀스택 프로젝트 API 문서',
      contact: {
        name: 'Developer',
        email: 'dev@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: '개발 서버'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'user1' },
            email: { type: 'string', example: 'user1@example.com' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: '첫 번째 게시글' },
            content: { type: 'string', example: '안녕하세요!' },
            author: { type: 'string', example: '사용자1' },
            createdAt: { type: 'string', format: 'date-time' },
            views: { type: 'number', example: 10 }
          }
        },
        Message: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Hello Server' }
          }
        }
      }
    }
  },
  apis: ['./routes/api.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

