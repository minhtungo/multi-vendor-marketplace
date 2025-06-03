import { cartUpdateSchema } from '@/models/cart.model';
import { cartService } from '@/services/cart.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class CartController {
  public getCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const serviceResponse = await cartService.getOrCreateCart(userId, sessionId);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCart = async (req: Request, res: Response) => {
    const cartData = cartUpdateSchema.parse(req.body);
    const sessionId = req.sessionId;
    const userId = req.user?.id;

    console.log('============', cartData);

    const serviceResponse = await cartService.updateCart({
      userId,
      sessionId,
      cartData,
    });

    handleServiceResponse(serviceResponse, res);
  };

  public mergeCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const guestSessionId = req.sessionId;

    const serviceResponse = await cartService.mergeCart(userId, guestSessionId);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceResponse = await cartService.deleteCart(id);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartController = new CartController();
