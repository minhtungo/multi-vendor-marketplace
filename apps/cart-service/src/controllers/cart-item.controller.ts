import { insertCartItemSchema, updateCartItemSchema } from '@/models/cart-item.model';
import { cartItemService } from '@/services/cart-item.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class CartItemController {
  public addItemToCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const data = insertCartItemSchema.parse(req.body);

    const serviceResponse = await cartItemService.addItemToCart(userId, sessionId, data);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCartItem = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const cartItemId = req.params.cartItemId;
    const data = updateCartItemSchema.parse(req.body);

    const serviceResponse = await cartItemService.updateCartItem(userId, sessionId, cartItemId, data);
    handleServiceResponse(serviceResponse, res);
  };

  public removeCartItem = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const cartItemId = req.params.cartItemId;

    const serviceResponse = await cartItemService.removeCartItem(userId, sessionId, cartItemId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartItemController = new CartItemController();
