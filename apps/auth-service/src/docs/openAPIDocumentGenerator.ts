import { authRegistry } from '@/routes/auth.route';
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { OpenAPIObjectConfig } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator';

export function generateOpenAPIDocument(): OpenAPIObjectConfig {
  // Combine all registries
  const registry = new OpenAPIRegistry([authRegistry]);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Auth Service API',
      description: 'API documentation for the authentication service',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
