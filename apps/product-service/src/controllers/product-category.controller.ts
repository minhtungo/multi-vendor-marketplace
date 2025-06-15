import {
  CreateProductCategorySchema,
  DeleteProductCategorySchema,
  GetProductCategorySchema,
  UpdateProductCategorySchema,
} from '@/models/product-categories.model';
import { productCategoryService } from '@/services/product-category.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { NextFunction, Request, Response } from 'express';

class ProductCategoryController {
  public getAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await productCategoryService.getAllProductCategories();
    handleServiceResponse(serviceResponse, res);
  };

  public getProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = GetProductCategorySchema.parse(req);
    const serviceResponse = await productCategoryService.getProductCategory(params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public createProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = CreateProductCategorySchema.parse(req);
    const serviceResponse = await productCategoryService.createProductCategory(body);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { params, body } = UpdateProductCategorySchema.parse(req);
    const serviceResponse = await productCategoryService.updateProductCategory(params.id, body);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = DeleteProductCategorySchema.parse(req);
    const serviceResponse = await productCategoryService.deleteProductCategory(params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await productCategoryService.deleteAllProductCategories();
    handleServiceResponse(serviceResponse, res);
  };
}

export const productCategoryController = new ProductCategoryController();
