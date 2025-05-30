import { cartItemService } from '@/services/cart-item.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class CartItemController {
  public addItemToCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.body?.sessionId;
    const cartItemData = req.body;
    console.log('cartItemData======', cartItemData);
    console.log('sessionId======', sessionId);
    console.log('userId======', userId);

    const serviceResponse = await cartItemService.addItemToCart(userId, sessionId, cartItemData);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCartItemQuantity = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.body?.sessionId;
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    const serviceResponse = await cartItemService.updateCartItemQuantity(userId, sessionId, cartItemId, quantity);
    handleServiceResponse(serviceResponse, res);
  };

  public removeCartItem = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.body?.sessionId;
    const cartItemId = req.params.cartItemId;

    const serviceResponse = await cartItemService.removeCartItem(userId, sessionId, cartItemId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartItemController = new CartItemController();
