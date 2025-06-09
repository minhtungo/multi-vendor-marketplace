import { uploadConfig } from '@/configs/upload';
import type { Request } from 'express';
import multer from 'multer';

const csvStorage = multer.memoryStorage();

const csvFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept CSV files and plain text files
  if (file.mimetype === 'text/csv' || file.mimetype === 'application/csv' || file.originalname.endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed!'));
  }
};

export const csvUpload = multer({
  storage: csvStorage,
  fileFilter: csvFileFilter,
  limits: {
    fileSize: uploadConfig.maxFileSize,
  },
});
