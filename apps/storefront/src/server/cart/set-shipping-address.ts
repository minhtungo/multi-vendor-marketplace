'use server';

import { updateCart } from '@/server/cart/update-cart';

export async function setShippingAddress(prevState: unknown, formData: FormData) {
  if (!formData) {
    throw new Error('Form data is required');
  }

  const data = {
    shipping_address: {
      first_name: formData.get('shipping_address.first_name'),
      last_name: formData.get('shipping_address.last_name'),
      address_1: formData.get('shipping_address.address_1'),
      city: formData.get('shipping_address.city'),
      state: formData.get('shipping_address.state'),
      postal_code: formData.get('shipping_address.postal_code'),
      phone: formData.get('shipping_address.phone'),
    },
    email: formData.get('email'),
  } as any;

  const sameAsBilling = formData.get('same_as_billing');
  if (sameAsBilling === 'on') data.billing_address = data.shipping_address;

  if (sameAsBilling !== 'on') {
    data.billing_address = {
      first_name: formData.get('billing_address.first_name'),
      last_name: formData.get('billing_address.last_name'),
      address_1: formData.get('billing_address.address_1'),
      city: formData.get('billing_address.city'),
      state: formData.get('billing_address.state'),
      postal_code: formData.get('billing_address.postal_code'),
    };
  }

  await updateCart(data);

  return {
    success: true,
    message: 'Shipping address set successfully',
    data: null,
  };
}
