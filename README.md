# Multi-Tenant E-commerce Platform

Built using a microservices architecture and Turborepo for monorepo management.

## Project Structure

### Applications (`/apps`)

- **`api-gateway`**: Central API Gateway for routing and request management
- **`auth-service`**: Authentication and authorization service with JWT
- **`storefront`**: Customer-facing Next.js application
- **`vendor-dashboard`**: Vendor management dashboard
- **`vendor-service`**: Vendor profile and business logic management
- **`user-service`**: User account and profile management
- **`upload-service`**: File upload and media management
- **`product-service`**: Product catalog and inventory management
- **`order-service`**: Order processing and fulfillment
- **`payment-service`**: Payment processing and transaction handling
- **`cart-service`**: Shopping cart management and persistence

### Shared Packages (`/packages`)

- **`@repo/ui`**: Shared UI components library with Tailwind CSS
- **`@repo/server`**: Common server utilities and configurations
- **`@repo/eslint-config`**: Centralized ESLint configurations
- **`@repo/typescript-config`**: TypeScript configurations for the monorepo
- **`@repo/types`**: Shared TypeScript type definitions
- **`@repo/shared`**: Common utilities and helper functions
- **`@repo/messaging`**: RabbitMQ message broker integration
- **`@repo/redis`**: Redis client configuration and utilities
- **`@repo/email`**: Email service templates and sending logic

## Technology Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[TypeScript](https://www.typescriptlang.org/)**

### Backend

- **[Express.js](https://expressjs.com/)**
- **[Drizzle ORM](https://orm.drizzle.team/)**
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database

### Infrastructure & DevOps

- **[Docker](https://www.docker.com/)**
- **[Turborepo](https://turbo.build/repo)**
- **[PNPM](https://pnpm.io/)**
- **[Redis](https://redis.io/)**
- **[RabbitMQ](https://www.rabbitmq.com/)**
- **[MinIO](https://min.io/)** - S3-compatible object storage
- **[MailHog](https://github.com/mailhog/MailHog)** - Email testing in development

### Analytics

- **[PostHog](https://posthog.com/)**

### Development Tools

- **[ESLint](https://eslint.org/)** & **[Biome](https://biomejs.dev/)** - Code linting and formatting
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[TSup](https://tsup.egoist.dev/)** - TypeScript bundler

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start infrastructure services:

   ```bash
   ./scripts/start-services.sh
   # or
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. Start development servers:

   ```bash
   pnpm dev
   ```

4. Stop infrastructure services:
   ```bash
   ./scripts/stop-services.sh
   ```

## Development

- **Build all packages**: `pnpm build`
- **Lint code**: `pnpm lint`
- **Type checking**: `pnpm check-types`
- **Run tests**: `pnpm test`
- **Format code**: `pnpm format`

## Scripts & Management

- `pnpm db`: Database management utility
- `scripts/start-services.sh`: Start infrastructure services
- `scripts/stop-services.sh`: Stop infrastructure services
- `docker-compose.dev.yml`: Development infrastructure configuration
