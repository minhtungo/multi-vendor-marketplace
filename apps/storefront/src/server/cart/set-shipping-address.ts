'use server';

import { checkoutSteps } from '@/lib/constants/checkout';
import { updateCart } from '@/server/cart/update-cart';
import { redirect } from 'next/navigation';

export async function setShippingAddress(prevState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error('Form data is required');
    }

    const data = {
      shippingAddress: {
        firstName: formData.get('shipping_address.first_name'),
        lastName: formData.get('shipping_address.last_name'),
        address1: formData.get('shipping_address.address_1'),
        city: formData.get('shipping_address.city'),
        state: formData.get('shipping_address.state'),
        postalCode: formData.get('shipping_address.postal_code'),
      },
      email: formData.get('email'),
    } as any;

    const sameAsBilling = formData.get('same_as_billing');
    if (sameAsBilling === 'on') data.billingAddress = data.shippingAddress;

    if (sameAsBilling !== 'on') {
      data.billingAddress = {
        firstName: formData.get('billing_address.first_name'),
        lastName: formData.get('billing_address.last_name'),
        address1: formData.get('billing_address.address_1'),
        city: formData.get('billing_address.city'),
        state: formData.get('billing_address.state'),
        postalCode: formData.get('billing_address.postal_code'),
      };
    }

    await updateCart(data);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }

  redirect(`/checkout?step=${checkoutSteps[1].slug}`);
}
