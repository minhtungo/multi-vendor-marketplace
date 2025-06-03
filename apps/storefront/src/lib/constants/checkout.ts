export const checkoutSteps = [
  {
    title: 'Shipping',
    slug: 'shipping',
  },
  {
    title: 'Delivery',
    slug: 'delivery',
  },
  {
    title: 'Payment',
    slug: 'payment',
  },
] as const;

export type CheckoutStepSlug = (typeof checkoutSteps)[number]['slug'];

export const defaultCheckoutStep = checkoutSteps[0];

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 19.99,
  },
];
