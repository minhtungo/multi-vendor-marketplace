import { insertProductSchema } from '@/db/schemas/products';
import { productService } from '@/services/product.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import type { NextFunction, Request, Response } from 'express';

class ProductController {
  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = insertProductSchema.parse(req.body);
    const vendorId = req.user?.id;
    const serviceResponse = await productService.createProduct(data, vendorId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
