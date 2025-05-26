# MinIO Bucket Policy Management Guide

This guide explains how to change and manage MinIO bucket access policies in your multi-tenant e-commerce application.

## Overview

Your MinIO setup provides S3-compatible object storage with configurable access policies. You can control who can access your files and under what conditions.

## Current Configuration

- **MinIO Console**: `http://localhost:9001`
- **MinIO API**: `http://localhost:${AWS_S3_PORT}` (typically 9000)
- **Bucket Name**: Defined in `AWS_S3_BUCKET_NAME` environment variable
- **Credentials**: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

## Methods to Change Bucket Access

### 1. Using the Web Console (Easiest)

1. Open `http://localhost:9001` in your browser
2. Login with your MinIO credentials
3. Navigate to **Buckets** → Select your bucket
4. Go to **Access Rules** or **Bucket Policy**
5. Choose from:
   - **Private**: Only authenticated users can access
   - **Public**: Anyone can read/download files
   - **Custom**: Define specific access rules

### 2. Using the CLI Script (Recommended for Development)

We've provided a convenient CLI script for common operations:

```bash
# Make bucket public (read-only for everyone)
npm run bucket-policy make-public

# Make bucket private (remove public access)
npm run bucket-policy make-private

# View current bucket policy
npm run bucket-policy get-policy

# Set IP-restricted access
npm run bucket-policy set-ip-restricted 192.168.1.0/24 10.0.0.0/8

# Show help
npm run bucket-policy help
```

### 3. Using the REST API

The upload service now includes bucket policy management endpoints:

#### Make Bucket Public

```bash
curl -X POST http://localhost:8084/api/uploads/bucket-policy/public \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Make Bucket Private

```bash
curl -X POST http://localhost:8084/api/uploads/bucket-policy/private \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Get Current Policy

```bash
curl -X GET http://localhost:8084/api/uploads/bucket-policy/current \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Set Custom Policy

```bash
curl -X POST http://localhost:8084/api/uploads/bucket-policy/custom \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "policy": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::your-bucket/*"
        }
      ]
    }
  }'
```

#### Set IP-Restricted Access

```bash
curl -X POST http://localhost:8084/api/uploads/bucket-policy/ip-restricted \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "allowedIPs": ["192.168.1.0/24", "10.0.0.0/8"]
  }'
```

### 4. Using MinIO Client (mc)

If you have MinIO client installed:

```bash
# Configure alias
mc alias set myminio http://localhost:9000 YOUR_ACCESS_KEY YOUR_SECRET_KEY

# Make bucket public
mc anonymous set public myminio/your-bucket-name

# Make bucket private
mc anonymous set none myminio/your-bucket-name

# Set download-only access
mc anonymous set download myminio/your-bucket-name
```

### 5. Programmatic Access

You can also use the `BucketPolicyManager` class directly in your code:

```typescript
import { bucketPolicyManager } from '@/utils/bucket-policy';

// Make bucket public
await bucketPolicyManager.makePublic();

// Make bucket private
await bucketPolicyManager.makePrivate();

// Get current policy
const policy = await bucketPolicyManager.getCurrentPolicy();

// Set custom policy
await bucketPolicyManager.setCustomPolicy({
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: '*',
      Action: 's3:GetObject',
      Resource: 'arn:aws:s3:::your-bucket/*',
    },
  ],
});

// Set IP-restricted access
await bucketPolicyManager.setIPRestrictedAccess(['192.168.1.0/24']);
```

## Common Use Cases

### 1. Public File Sharing

For files that should be accessible to anyone (e.g., product images):

```bash
npm run bucket-policy make-public
```

### 2. Private File Storage

For sensitive files (e.g., user documents):

```bash
npm run bucket-policy make-private
```

### 3. IP-Restricted Access

For files that should only be accessible from specific networks:

```bash
npm run bucket-policy set-ip-restricted 192.168.1.0/24 10.0.0.0/8
```

### 4. Time-Based Access

For files with time restrictions, use the programmatic API:

```typescript
await bucketPolicyManager.setTimeRestrictedAccess('09:00:00Z', '17:00:00Z');
```

## Security Considerations

1. **Default to Private**: Always start with private access and only make public what's necessary
2. **Regular Audits**: Periodically review your bucket policies
3. **IP Restrictions**: Use IP restrictions for sensitive content
4. **Monitoring**: Monitor access logs for unusual activity
5. **Least Privilege**: Grant only the minimum necessary permissions

## Troubleshooting

### Policy Not Taking Effect

- Wait a few seconds for policy changes to propagate
- Check MinIO logs for errors
- Verify your credentials have sufficient permissions

### Access Denied Errors

- Ensure the bucket policy allows the requested action
- Check if IP restrictions are blocking access
- Verify authentication tokens are valid

### API Errors

- Ensure the upload service is running
- Check that environment variables are properly set
- Verify network connectivity to MinIO

## Environment Variables

Make sure these are properly configured in your `.env` file:

```env
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_ENDPOINT=http://localhost:9000
AWS_S3_PORT=9000
```

## API Documentation

For detailed API documentation, visit the Swagger UI at:
`http://localhost:8084/` (when the upload service is running)

The bucket policy endpoints are documented under the "Bucket Policy" section.
