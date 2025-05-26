import { bucketPolicyManager } from '@/utils/bucket-policy';
import { handleServiceResponse } from '@repo/server/lib';
import { ServiceResponse } from '@repo/server/lib';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import type { Request, Response } from 'express';
import { logger } from '@/utils/logger';

class BucketPolicyController {
  public makePublic = async (req: Request, res: Response) => {
    try {
      await bucketPolicyManager.makePublic();
      const serviceResponse = ServiceResponse.success('Bucket made public successfully', null);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      logger.error('Error making bucket public:', error);
      const serviceResponse = ServiceResponse.failure(
        'Failed to make bucket public',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  };

  public makePrivate = async (req: Request, res: Response) => {
    try {
      await bucketPolicyManager.makePrivate();
      const serviceResponse = ServiceResponse.success('Bucket made private successfully', null);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      logger.error('Error making bucket private:', error);
      const serviceResponse = ServiceResponse.failure(
        'Failed to make bucket private',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  };

  public getCurrentPolicy = async (req: Request, res: Response) => {
    try {
      const policy = await bucketPolicyManager.getCurrentPolicy();
      const serviceResponse = ServiceResponse.success('Current bucket policy retrieved', {
        policy: policy ? JSON.parse(policy) : null,
        isPublic: policy !== null,
      });
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      logger.error('Error getting bucket policy:', error);
      const serviceResponse = ServiceResponse.failure(
        'Failed to get bucket policy',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  };

  public setCustomPolicy = async (req: Request, res: Response) => {
    try {
      const { policy } = req.body;
      await bucketPolicyManager.setCustomPolicy(policy);
      const serviceResponse = ServiceResponse.success('Custom bucket policy set successfully', null);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      logger.error('Error setting custom bucket policy:', error);
      const serviceResponse = ServiceResponse.failure(
        'Failed to set custom bucket policy',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  };

  public setIPRestrictedAccess = async (req: Request, res: Response) => {
    try {
      const { allowedIPs } = req.body;
      await bucketPolicyManager.setIPRestrictedAccess(allowedIPs);
      const serviceResponse = ServiceResponse.success('IP-restricted access set successfully', null);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      logger.error('Error setting IP-restricted access:', error);
      const serviceResponse = ServiceResponse.failure(
        'Failed to set IP-restricted access',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  };
}

export const bucketPolicyController = new BucketPolicyController();
