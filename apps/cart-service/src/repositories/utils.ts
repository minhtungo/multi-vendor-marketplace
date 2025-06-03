import { CartWithItems } from '../models/cart.model';

export const normalizeCartData = (cart: CartWithItems) => {
  return {
    ...cart,
    shippingAddress: {
      firstName: cart.shippingFirstName,
      lastName: cart.shippingLastName,
      address1: cart.shippingAddressLine1,
      city: cart.shippingCity,
      state: cart.shippingState,
      postalCode: cart.shippingPostalCode,
    },
    billingAddress: {
      firstName: cart.billingFirstName,
      lastName: cart.billingLastName,
      address1: cart.billingAddressLine1,
      city: cart.billingCity,
      state: cart.billingState,
      postalCode: cart.billingPostalCode,
    },
    shippingMethod: {
      name: cart.shippingMethodName,
      price: cart.shippingMethodPrice,
      id: cart.shippingMethodId,
    },
  };
};
