import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3['generateDocument']>;

export interface OpenAPIConfig {
  title?: string;
  version?: string;
  externalDocs?: {
    description: string;
    url: string;
  };
}

export function generateOpenAPIDocument(registries: OpenAPIRegistry[], config: OpenAPIConfig = {}): OpenAPIDocument {
  const registry = new OpenAPIRegistry(registries);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: config.version || '1.0.0',
      title: config.title || 'Swagger API',
    },
    externalDocs: config.externalDocs || {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
