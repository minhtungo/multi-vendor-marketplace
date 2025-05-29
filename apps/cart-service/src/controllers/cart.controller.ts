import { cartService } from '@/services/cart.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class CartController {
  public getCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.params?.sessionId;

    const serviceResponse = await cartService.getOrCreateCart(userId, sessionId);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cartData = req.body;
    const serviceResponse = await cartService.updateCart(id, cartData);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartController = new CartController();
