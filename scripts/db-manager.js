#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const services = [
  'auth-service',
  'product-service',
  'payment-service',
  'upload-service',
  'order-service',
  'user-service',
  'vendor-service',
  'cart-service',
];

const commands = ['generate', 'migrate', 'push', 'studio', 'seed', 'reset'];

function showHelp() {
  console.log(`
🗄️  Database Manager for Multivendor Platform

Usage: npm run db <service> <command>

Services:
  ${services.map((s) => `- ${s.replace('-service', '')}`).join('\n  ')}
  - all (run command on all services)

Commands:
  - generate  : Generate migrations
  - migrate   : Run migrations  
  - push      : Push schema changes
  - studio    : Open Drizzle Studio
  - seed      : Seed database
  - reset     : Reset database

Examples:
  pnpm run db auth generate
  pnpm run db product migrate
  pnpm run db all push
  pnpm run db user studio
`);
}

function main() {
  const [, , service, command] = process.argv;

  if (!service || !command || service === 'help') {
    showHelp();
    return;
  }

  if (!commands.includes(command)) {
    console.error(`❌ Invalid command: ${command}`);
    showHelp();
    return;
  }

  const serviceName = service.endsWith('-service') ? service : `${service}-service`;

  if (service === 'all') {
    console.log(`🚀 Running db:${command} on all services...`);
    services.forEach((svc) => {
      console.log(`\n📦 ${svc}:`);
      try {
        execSync(`pnpm run --filter @repo/${svc} db:${command}`, {
          stdio: 'inherit',
          cwd: process.cwd(),
        });
      } catch (error) {
        console.error(`❌ Failed for ${svc}`);
      }
    });
    return;
  }

  if (!services.includes(serviceName)) {
    console.error(`❌ Invalid service: ${service}`);
    console.log(`Available services: ${services.map((s) => s.replace('-service', '')).join(', ')}`);
    return;
  }

  console.log(`🗄️  Running db:${command} for ${serviceName}...`);

  try {
    execSync(`pnpm run --filter @repo/${serviceName} db:${command}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error(`❌ Command failed for ${serviceName}`);
    process.exit(1);
  }
}

main();
