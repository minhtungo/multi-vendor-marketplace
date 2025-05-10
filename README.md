# Multi-Tenant Ecommerce Platform

A multi-tenant ecommerce platform built using a microservices architecture and Turborepo for monorepo management.

## Project Structure

This Turborepo includes the following packages and applications:

### Applications

- `api-gateway`: API Gateway service for routing and managing requests
- `auth-service`: Authentication and authorization service
- `store`: Main ecommerce storefront application

### Shared Packages

- `@repo/ui`: Shared UI components library
- `@repo/server`: Shared server utilities and configurations
- `@repo/config-eslint`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations for testing
- `@repo/typescript-config`: TypeScript configurations used throughout the monorepo

## Technology Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) for testing
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
