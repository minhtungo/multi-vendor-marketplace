import { cartService } from '@/services/cart.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class CartController {
  public getCartByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const serviceResponse = await cartService.getCartByUserId(userId);
    handleServiceResponse(serviceResponse, res);
  };

  public getCartById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceResponse = await cartService.getCartById(id);
    handleServiceResponse(serviceResponse, res);
  };

  public getCartBySessionId = async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const serviceResponse = await cartService.getCartBySessionId(sessionId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartController = new CartController();
