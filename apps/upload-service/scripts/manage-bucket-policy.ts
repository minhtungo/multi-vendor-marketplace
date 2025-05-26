#!/usr/bin/env tsx

import { bucketPolicyManager } from '../src/utils/bucket-policy';
import { env } from '../src/configs/env';

const commands = {
  'make-public': async () => {
    await bucketPolicyManager.makePublic();
    console.log('✅ Bucket made public successfully');
  },
  'make-private': async () => {
    await bucketPolicyManager.makePrivate();
    console.log('✅ Bucket made private successfully');
  },
  'get-policy': async () => {
    const policy = await bucketPolicyManager.getCurrentPolicy();
    if (policy) {
      console.log('📋 Current bucket policy:');
      console.log(JSON.stringify(JSON.parse(policy), null, 2));
    } else {
      console.log('🔒 Bucket is private (no policy set)');
    }
  },
  'set-ip-restricted': async (ips: string[]) => {
    if (!ips.length) {
      console.error(
        '❌ Please provide IP addresses: npm run bucket-policy set-ip-restricted 192.168.1.0/24 10.0.0.0/8'
      );
      process.exit(1);
    }
    await bucketPolicyManager.setIPRestrictedAccess(ips);
    console.log(`✅ IP-restricted access set for: ${ips.join(', ')}`);
  },
  help: () => {
    console.log(`
🪣 MinIO Bucket Policy Manager

Usage: npm run bucket-policy <command> [options]

Commands:
  make-public           Make bucket publicly readable
  make-private          Make bucket private (remove public access)
  get-policy           Show current bucket policy
  set-ip-restricted    Set IP-restricted access (provide IP addresses/ranges)
  help                 Show this help message

Examples:
  npm run bucket-policy make-public
  npm run bucket-policy make-private
  npm run bucket-policy get-policy
  npm run bucket-policy set-ip-restricted 192.168.1.0/24 10.0.0.0/8

Current bucket: ${env.AWS_S3_BUCKET_NAME}
MinIO endpoint: ${env.AWS_S3_ENDPOINT}
    `);
  },
};

async function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || command === 'help') {
    commands.help();
    return;
  }

  if (!(command in commands)) {
    console.error(`❌ Unknown command: ${command}`);
    commands.help();
    process.exit(1);
  }

  try {
    console.log(`🔄 Executing: ${command}...`);

    if (command === 'set-ip-restricted') {
      await commands[command](args);
    } else {
      await (commands as any)[command]();
    }
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
    process.exit(1);
  }
}

main().catch(console.error);
