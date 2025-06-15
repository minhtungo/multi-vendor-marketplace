import { DeleteCartSchema, UpdateCartSchema } from '@/models/cart.model';
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
    const { body } = UpdateCartSchema.parse(req);
    const sessionId = req.sessionId;
    const userId = req.user?.id;

    console.log('============', body);

    const serviceResponse = await cartService.updateCart({
      userId,
      sessionId,
      cartData: body,
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
    const { params } = DeleteCartSchema.parse(req);
    const serviceResponse = await cartService.deleteCart(params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public completeCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const serviceResponse = await cartService.completeCart(userId, sessionId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const cartController = new CartController();
