'use server';

import { checkoutSteps } from '@/lib/constants/checkout';
import { updateCart } from '@/server/cart/update-cart';
import { redirect } from 'next/navigation';

export async function setShippingMethod(prevState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error('Form data is required');
    }

    const data = {
      shippingMethod: {
        id: formData.get('shipping_method_id'),
        name: formData.get('shipping_method_name'),
        price: formData.get('shipping_method_price'),
      },
    } as any;

    await updateCart(data);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }

  redirect(`/checkout?step=${checkoutSteps[2].slug}`);
}
