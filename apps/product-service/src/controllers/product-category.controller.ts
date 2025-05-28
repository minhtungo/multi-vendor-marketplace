import { insertProductCategorySchema } from '@/db/schemas/categories';
import { productCategoryService } from '@/services/product-category.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { NextFunction, Request, Response } from 'express';

class ProductCategoryController {
  public getAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await productCategoryService.getAllProductCategories();
    handleServiceResponse(serviceResponse, res);
  };

  public getProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const serviceResponse = await productCategoryService.getProductCategory(categoryId);
    handleServiceResponse(serviceResponse, res);
  };

  public createProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const data = insertProductCategorySchema.parse(req.body);
    const serviceResponse = await productCategoryService.createProductCategory(data);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const data = insertProductCategorySchema.partial().parse(req.body);
    const serviceResponse = await productCategoryService.updateProductCategory(categoryId, data);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const serviceResponse = await productCategoryService.deleteProductCategory(categoryId);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await productCategoryService.deleteAllProductCategories();
    handleServiceResponse(serviceResponse, res);
  };
}

export const productCategoryController = new ProductCategoryController();
