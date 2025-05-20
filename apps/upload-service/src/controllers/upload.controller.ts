import { uploadService } from '@/services/upload.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class UploadController {
  public getPresignedUrl = async (req: Request, res: Response) => {
    const { fileName } = req.body;
    const serviceResponse = await uploadService.getPresignedUrl(fileName);
    handleServiceResponse(serviceResponse, res);
  };

  public confirmUpload = async (req: Request, res: Response) => {
    const { key, fileName, mimeType, size } = req.body;
    const userId = req.user?.id!;
    const serviceResponse = await uploadService.confirmUpload({ key, fileName, mimeType, size }, userId);
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
