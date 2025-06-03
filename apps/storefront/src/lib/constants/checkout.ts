export const checkoutSteps = [
  {
    step: 1,
    title: 'Shipping',
    slug: 'shipping',
  },
  {
    step: 2,
    title: 'Delivery',
    slug: 'delivery',
  },
  {
    step: 3,
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
    price: '0',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: '19.99',
  },
];
