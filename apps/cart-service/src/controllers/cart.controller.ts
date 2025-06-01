import { cartService } from '@/services/cart.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class CartController {
  public getCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const serviceResponse = await cartService.getOrCreateCart(userId, sessionId);
    handleServiceResponse(serviceResponse, res);
  };

  public updateCart = async (req: Request, res: Response) => {
    const { id: cardId } = req.params;
    const cartData = req.body;
    const serviceResponse = await cartService.updateCart(cardId, cartData);
    handleServiceResponse(serviceResponse, res);
  };

  public mergeCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { guestSessionId } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'User must be authenticated to merge cart' });
      return;
    }

    if (!guestSessionId) {
      res.status(400).json({ error: 'Guest session ID is required' });
      return;
    }

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
