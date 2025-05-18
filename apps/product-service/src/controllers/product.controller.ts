import { insertProductSchema } from '@/db/schemas/products';
import { productService } from '@/services/product.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import type { NextFunction, Request, Response } from 'express';
import { insertProductCategorySchema } from '@/db/schemas/product-categories';

class ProductController {
  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = insertProductSchema.parse(req.body);
    const vendorId = req.user?.id;
    const serviceResponse = await productService.createProduct(data, vendorId);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const data = insertProductSchema.partial().parse(req.body);
    const vendorId = req.user?.id;
    const serviceResponse = await productService.updateProduct(productId, data, vendorId);
    handleServiceResponse(serviceResponse, res);
  };

  public createProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const data = insertProductCategorySchema.parse(req.body);
    const serviceResponse = await productService.createProductCategory(data);
    handleServiceResponse(serviceResponse, res);
  };

  public updateProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const data = insertProductCategorySchema.partial().parse(req.body);
    const serviceResponse = await productService.updateProductCategory(categoryId, data);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const serviceResponse = await productService.deleteProductCategory(categoryId);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await productService.deleteAllProductCategories();
    handleServiceResponse(serviceResponse, res);
  };

  public getAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await productService.getAllProductCategories();
    handleServiceResponse(serviceResponse, res);
  };

  public getProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const serviceResponse = await productService.getProductCategory(categoryId);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.user?.id;
    const serviceResponse = await productService.deleteAllProducts(vendorId);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const vendorId = req.user?.id;
    const serviceResponse = await productService.deleteProduct(productId, vendorId);
    handleServiceResponse(serviceResponse, res);
  };

  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const serviceResponse = await productService.getProduct(productId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
