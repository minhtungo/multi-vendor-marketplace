import { cartItemService } from '@/services/cart-item.service';
import { cartService } from '@/services/cart.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class CartItemController {
  public addItemToCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.params?.sessionId;
    const cartItemData = req.body;

    const serviceResponse = await cartItemService.addItemToCart(userId, sessionId, cartItemData);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartItemController = new CartItemController();
