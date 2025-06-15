export interface VendorRegisteredEventPayload {
  email: string;
  name: string;
  password: string;
}

export interface VendorForgotPasswordEventPayload {
  email: string;
  token: string;
}

export const VENDOR_EVENTS = {
  VENDOR_REGISTERED: {
    event: 'vendor.registered',
    routingKey: 'vendor.events.registered',
  },
  VENDOR_FORGOT_PASSWORD: {
    event: 'vendor.forgot.password',
    routingKey: 'vendor.events.forgot.password',
  },
} as const;
