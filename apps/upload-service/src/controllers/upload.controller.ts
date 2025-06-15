import {
  ConfirmUploadSchema,
  DeleteUploadSchema,
  GetPresignedUrlSchema,
  GetUserUploadsSchema,
} from '@/models/upload.model';
import { uploadService } from '@/services/upload.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class UploadController {
  public getPresignedUrl = async (req: Request, res: Response) => {
    const { body } = GetPresignedUrlSchema.parse(req);
    const serviceResponse = await uploadService.getPresignedUrl(body.fileName);
    handleServiceResponse(serviceResponse, res);
  };

  public confirmUpload = async (req: Request, res: Response) => {
    const { body } = ConfirmUploadSchema.parse(req);
    const userId = req.user?.id!;
    const serviceResponse = await uploadService.confirmUpload(body, userId);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserUploads = async (req: Request, res: Response) => {
    const userId = req.user?.id!;
    const { query } = GetUserUploadsSchema.parse(req);
    const serviceResponse = await uploadService.getUserUploads(userId, query.offset, query.limit);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteUpload = async (req: Request, res: Response) => {
    const { params } = DeleteUploadSchema.parse(req);
    const userId = req.user?.id!;
    const serviceResponse = await uploadService.deleteUpload(params.fileId, userId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const uploadController = new UploadController();
