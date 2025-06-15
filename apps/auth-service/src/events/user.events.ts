export interface UserRegisteredEventPayload {
  email: string;
  name: string;
  password: string;
}

export interface UserForgotPasswordEventPayload {
  email: string;
  token: string;
}

export const USER_EVENTS = {
  USER_REGISTERED: {
    event: 'user.registered',
    routingKey: 'user.events.registered',
  },
  USER_FORGOT_PASSWORD: {
    event: 'user.forgot.password',
    routingKey: 'user.events.forgot.password',
  },
} as const;

export const VENDOR_EVENTS = {
  VENDOR_REGISTERED: {
    event: 'vendor.registered',
    routingKey: 'vendor.events.registered',
  },
} as const;
