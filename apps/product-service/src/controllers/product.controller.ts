import { createProductRequestSchema, getProductQuerySchema, updateProductRequestSchema } from '@/models/product.model';
import { productService } from '@/services/product.service';
import { sortOptions } from '@/utils/constants';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class ProductController {
  public getProduct = async (req: Request, res: Response) => {
    const data = getProductQuerySchema.parse(req.query);
    const serviceResponse = await productService.getProduct(data);
    handleServiceResponse(serviceResponse, res);
  };

  public getProducts = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const sortQuery = req.query.sort as 'price_asc' | 'price_desc' | 'latest_desc' | 'latest_asc' | undefined;
    const sort = sortOptions.find((option) => option === sortQuery) || 'latest_desc';

    const vendorId = req.user?.role === 'vendor' ? req.user?.id : undefined;

    const serviceResponse = await productService.getAllProducts(page, limit, vendorId, sort);
    handleServiceResponse(serviceResponse, res);
  };

  public createProduct = async (req: Request, res: Response) => {
    const vendorId = req.user?.id;
    const data = createProductRequestSchema.parse(req.body);
    const serviceResponse = await productService.createProduct(data, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProduct = async (req: Request, res: Response) => {
    const vendorId = req.user?.id;
    const productId = req.params.id;
    const data = updateProductRequestSchema.parse(req.body);
    const serviceResponse = await productService.updateProduct(productId, data, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProducts = async (req: Request, res: Response) => {
    const vendorId = req.user?.id;
    const serviceResponse = await productService.deleteAllProducts(vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const vendorId = req.user?.id;

    const serviceResponse = await productService.deleteProduct(productId, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public importProducts = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const file = files?.[0];
    const serviceResponse = await productService.importProductsFromCsv(file, req.user?.id!);
    handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
