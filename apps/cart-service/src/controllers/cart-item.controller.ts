import { AddItemToCartSchema, RemoveCartItemSchema, UpdateCartItemSchema } from '@/models/cart-item.model';
import { cartItemService } from '@/services/cart-item.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class CartItemController {
  public addItemToCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const { body } = AddItemToCartSchema.parse(req);

    const serviceResponse = await cartItemService.addItemToCart(userId, sessionId, body);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCartItem = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const { params, body } = UpdateCartItemSchema.parse(req);

    const serviceResponse = await cartItemService.updateCartItem(userId, sessionId, params.cartItemId, body);
    handleServiceResponse(serviceResponse, res);
  };

  public removeCartItem = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const { params } = RemoveCartItemSchema.parse(req);

    const serviceResponse = await cartItemService.removeCartItem(userId, sessionId, params.cartItemId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartItemController = new CartItemController();
