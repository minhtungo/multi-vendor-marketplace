# Multi-Vendor Marketplace Platform

Built using a microservices architecture and Turborepo for monorepo management.

## Project Structure

### Applications

- `api-gateway`: API Gateway service for routing and managing requests
- `auth-service`: Authentication and authorization service
- `storefront`: Storefront application
- `vendor-dashboard`: Dashboard for vendors to manage their products and orders
- `vendor-service`: Service for managing vendors
- `user-service`: Service for managing users
- `upload-service`: Service for handling file uploads
- `product-service`: Service for managing products
- `order-service`: Service for handling orders
- `payment-service`: Service for processing payments and transactions

### Shared Packages

- `@repo/ui`: Shared UI components library
- `@repo/server`: Shared server utilities and configurations
- `@repo/eslint-config`: ESLint configurations
- `@repo/typescript-config`: TypeScript configurations used throughout the monorepo
- `@repo/types`: Shared type definitions
- `@repo/shared`: Common utilities and shared code
- `@repo/messaging`: Message broker
- `@repo/redis`: Redis client
- `@repo/email`: Email service and templates

## Technology Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Router](https://tanstack.com/router)
- [Express](https://expressjs.com/) for backend API development
- [ESLint](https://eslint.org/) for code linting
- [Docker](https://www.docker.com/) for containerization
- [Turborepo](https://turbo.build/repo) for monorepo management
- [Redis](https://redis.io/) for caching and message queuing
- [RabbitMQ](https://www.rabbitmq.com/) for event-driven communication
