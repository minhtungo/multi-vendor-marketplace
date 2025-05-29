import { Router } from 'express';
import { authRoutes } from './auth.route';
import { userRoutes } from './user.route';
import { productRoutes } from './product.route';
import { paymentRoutes } from './payment.route';
import { orderRoutes } from './order.route';
import { uploadRoutes } from './upload.route';
import { cartRoutes } from './cart.route';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(productRoutes);
router.use(paymentRoutes);
router.use(orderRoutes);
router.use(uploadRoutes);
router.use(cartRoutes);

export { router as serviceRoutes };
