# Multi-Vendor Marketplace Platform

Built using a microservices architecture and Turborepo for monorepo management.

## Project Structure

### Applications

- `api-gateway`: API Gateway service for routing and managing requests
- `auth-service`: Authentication and authorization service
- `store`: Main ecommerce storefront application
- `vendor-dashboard`: Dashboard for vendors to manage their products and orders

### Shared Packages

- `@repo/ui`: Shared UI components library
- `@repo/server`: Shared server utilities and configurations
- `@repo/config-eslint`: ESLint configurations used throughout the monorepo
- `@repo/typescript-config`: TypeScript configurations used throughout the monorepo

## Technology Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Router](https://tanstack.com/router)
- [Express](https://expressjs.com/) for backend API development
- [ESLint](https://eslint.org/) for code linting
- [Docker](https://www.docker.com/) for containerization
- [Turborepo](https://turbo.build/repo) for monorepo management

## Getting Started

1. Install dependencies:

```sh
pnpm install
```

2. Start the development environment:

```sh
docker-compose up
```

3. Run the development server:

```sh
pnpm dev
```

## Development

This project uses pnpm workspaces and Turborepo for managing the monorepo. Each application and package is 100% TypeScript.

### Available Scripts

- `pnpm build` - Build all applications and packages
- `pnpm dev` - Start development environment
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
