import { PutBucketPolicyCommand, GetBucketPolicyCommand, DeleteBucketPolicyCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3-client';
import { env } from '@/configs/env';

export class BucketPolicyManager {
  private bucketName: string;

  constructor(bucketName?: string) {
    this.bucketName = bucketName || env.AWS_S3_BUCKET_NAME;
  }

  /**
   * Make bucket public (read-only access for everyone)
   */
  async makePublic(): Promise<void> {
    const publicPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicReadGetObject',
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${this.bucketName}/*`,
        },
      ],
    };

    const command = new PutBucketPolicyCommand({
      Bucket: this.bucketName,
      Policy: JSON.stringify(publicPolicy),
    });

    await s3Client.send(command);
  }

  /**
   * Make bucket private (remove public access)
   */
  async makePrivate(): Promise<void> {
    const command = new DeleteBucketPolicyCommand({
      Bucket: this.bucketName,
    });

    await s3Client.send(command);
  }

  /**
   * Set custom bucket policy
   */
  async setCustomPolicy(policy: object): Promise<void> {
    const command = new PutBucketPolicyCommand({
      Bucket: this.bucketName,
      Policy: JSON.stringify(policy),
    });

    await s3Client.send(command);
  }

  /**
   * Get current bucket policy
   */
  async getCurrentPolicy(): Promise<string | null> {
    try {
      const command = new GetBucketPolicyCommand({
        Bucket: this.bucketName,
      });

      const response = await s3Client.send(command);
      return response.Policy || null;
    } catch (error: any) {
      if (error.name === 'NoSuchBucketPolicy') {
        return null; // No policy set (private by default)
      }
      throw error;
    }
  }

  /**
   * Set read-only access for specific IP ranges
   */
  async setIPRestrictedAccess(allowedIPs: string[]): Promise<void> {
    const ipRestrictedPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'IPRestrictedAccess',
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${this.bucketName}/*`,
          Condition: {
            IpAddress: {
              'aws:SourceIp': allowedIPs,
            },
          },
        },
      ],
    };

    await this.setCustomPolicy(ipRestrictedPolicy);
  }

  /**
   * Set time-based access (e.g., only during business hours)
   */
  async setTimeRestrictedAccess(startTime: string, endTime: string): Promise<void> {
    const timeRestrictedPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'TimeRestrictedAccess',
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${this.bucketName}/*`,
          Condition: {
            DateGreaterThan: {
              'aws:CurrentTime': startTime,
            },
            DateLessThan: {
              'aws:CurrentTime': endTime,
            },
          },
        },
      ],
    };

    await this.setCustomPolicy(timeRestrictedPolicy);
  }
}

// Export a default instance
export const bucketPolicyManager = new BucketPolicyManager();
