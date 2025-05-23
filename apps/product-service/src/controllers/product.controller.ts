import { insertProductSchema } from '@/db/schemas/products';
import { CreateProductRequestSchema } from '@/models/product.model';
import { productService } from '@/services/product.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { NextFunction, Request, Response } from 'express';

class ProductController {
  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const serviceResponse = await productService.getProduct(productId);
    handleServiceResponse(serviceResponse, res);
  };

  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const serviceResponse = await productService.getAllProducts(page, limit);
    handleServiceResponse(serviceResponse, res);
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.user?.id;
    const data = CreateProductRequestSchema.parse(req.body);
    const serviceResponse = await productService.createProduct(data, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.user?.id;
    const productId = req.params.id;
    const data = insertProductSchema.partial().parse(req.body);
    const serviceResponse = await productService.updateProduct(productId, data, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.user?.id;
    const serviceResponse = await productService.deleteAllProducts(vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const vendorId = req.user?.id;
    const serviceResponse = await productService.deleteProduct(productId, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
