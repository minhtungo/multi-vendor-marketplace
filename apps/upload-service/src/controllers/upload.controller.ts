import { confirmUploadSchema, presignedUrlSchema } from '@/models/upload.model';
import { uploadService } from '@/services/upload.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class UploadController {
  public getPresignedUrl = async (req: Request, res: Response) => {
    const data = presignedUrlSchema.parse(req.body);
    const serviceResponse = await uploadService.getPresignedUrl(data.fileName);
    handleServiceResponse(serviceResponse, res);
  };

  public confirmUpload = async (req: Request, res: Response) => {
    const data = confirmUploadSchema.parse(req.body);
    const userId = req.user?.id!;
    const serviceResponse = await uploadService.confirmUpload(data, userId);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserUploads = async (req: Request, res: Response) => {
    const userId = req.user?.id!;
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 20);
    const serviceResponse = await uploadService.getUserUploads(userId, offset, limit);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteUpload = async (req: Request, res: Response) => {
    const { fileId } = req.params;
    const userId = req.user?.id!;
    const serviceResponse = await uploadService.deleteUpload(fileId, userId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const uploadController = new UploadController();
