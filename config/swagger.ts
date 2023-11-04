import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupSwagger(app: any) {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Entrance Test',
        version: '1.0.0',
        description: 'Entrance Test',
      },
    },
    apis: ['./routes/*.ts'], // Path to the API routes files
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}
