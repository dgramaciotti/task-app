import swaggerJSDoc from 'swagger-jsdoc'
import { config } from '../config'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TS API Boilerplate',
    version: '1.0.0',
    description: 'API documentation for the TS API Boilerplate',
  },
  servers: [
    {
      url: `${config.host}:${config.port}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: [
    './src/server.ts',
    './src/api/v1/routes/*.ts',
    './src/api/v1/controllers/*.ts',
  ],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
