import { addToCartItemSchema } from '@/models/cart-item.model';
import { cartItemService } from '@/services/cart-item.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class CartItemController {
  public addItemToCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const data = addToCartItemSchema.parse(req.body);

    const serviceResponse = await cartItemService.addItemToCart(userId, sessionId, data);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCartItemQuantity = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    const serviceResponse = await cartItemService.updateCartItemQuantity(userId, sessionId, cartItemId, quantity);
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
