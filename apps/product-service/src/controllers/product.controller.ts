import {
  CreateProductSchema,
  DeleteProductSchema,
  GetProductSchema,
  GetProductsSchema,
  UpdateProductSchema,
} from '@/models/product.model';
import { productService } from '@/services/product.service';
import { sortOptions } from '@/utils/constants';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class ProductController {
  public getProduct = async (req: Request, res: Response) => {
    const { query } = GetProductSchema.parse(req);
    const serviceResponse = await productService.getProduct(query);
    handleServiceResponse(serviceResponse, res);
  };

  public getProducts = async (req: Request, res: Response) => {
    const { query } = GetProductsSchema.parse(req);

    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const sortQuery = query?.sort;
    const sort = sortOptions.find((option) => option === sortQuery) || 'latest_desc';

    const vendorId = req.user?.role === 'vendor' ? req.user?.id : undefined;

    const serviceResponse = await productService.getAllProducts(page, limit, vendorId, sort);
    handleServiceResponse(serviceResponse, res);
  };

  public createProduct = async (req: Request, res: Response) => {
    const vendorId = req.user?.id;
    const { body } = CreateProductSchema.parse(req);
    const serviceResponse = await productService.createProduct(body, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProduct = async (req: Request, res: Response) => {
    const vendorId = req.user?.id;
    const { params, body } = UpdateProductSchema.parse(req);
    const serviceResponse = await productService.updateProduct(params.id, body, vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProducts = async (req: Request, res: Response) => {
    const vendorId = req.user?.id;
    const serviceResponse = await productService.deleteAllProducts(vendorId!);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProduct = async (req: Request, res: Response) => {
    const { params } = DeleteProductSchema.parse(req);
    const vendorId = req.user?.id;

    const serviceResponse = await productService.deleteProduct(params.id, vendorId!);
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
