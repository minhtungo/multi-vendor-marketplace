import { z } from 'zod/v4';

// Common auth events enum
export enum AuthEventType {
  USER_REGISTERED = 'user.registered',
  USER_VERIFIED = 'user.verified',
  USER_LOGGED_IN = 'user.logged_in',
  USER_LOGGED_OUT = 'user.logged_out',
  USER_PASSWORD_RESET = 'user.password_reset',
  USER_PASSWORD_CHANGED = 'user.password_changed',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',

  VENDOR_REGISTERED = 'vendor.registered',
  VENDOR_VERIFIED = 'vendor.verified',
  VENDOR_LOGGED_IN = 'vendor.logged_in',
  VENDOR_LOGGED_OUT = 'vendor.logged_out',
  VENDOR_PASSWORD_RESET = 'vendor.password_reset',
  VENDOR_PASSWORD_CHANGED = 'vendor.password_changed',
  VENDOR_UPDATED = 'vendor.updated',
  VENDOR_DELETED = 'vendor.deleted',
}

// Exchange and queue naming conventions
export const AUTH_EXCHANGE = 'auth';
export const AUTH_EXCHANGE_TYPE = 'topic';
export const AUTH_QUEUE_PREFIX = 'auth';

// Base schemas
const baseEventSchema = z.object({
  timestamp: z.number().default(() => Date.now()),
});

const metadataSchema = z.record(z.string(), z.any()).optional();

// User event schemas
export const UserRegisteredSchema = baseEventSchema.extend({
  email: z.string().email(),
  password: z.string(),
});

export const UserVerifiedSchema = baseEventSchema.extend({
  userId: z.string(),
  email: z.string().email(),
});

export const UserLoginSchema = baseEventSchema.extend({
  userId: z.string(),
  email: z.string().email(),
  deviceInfo: z
    .object({
      ip: z.string().optional(),
      userAgent: z.string().optional(),
      device: z.string().optional(),
    })
    .optional(),
});

export const UserLogoutSchema = baseEventSchema.extend({
  userId: z.string(),
  sessionId: z.string().optional(),
});

export const UserPasswordSchema = baseEventSchema.extend({
  userId: z.string(),
  password: z.string(),
});

export const UserUpdatedSchema = baseEventSchema.extend({
  userId: z.string(),
  email: z.string().email().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  metadata: metadataSchema,
  changedFields: z.array(z.string()).optional(),
});

export const UserDeletedSchema = baseEventSchema.extend({
  userId: z.string(),
});

// Vendor event schemas
export const VendorRegisteredSchema = baseEventSchema.extend({
  email: z.string().email(),
  password: z.string(),
});

export const VendorVerifiedSchema = baseEventSchema.extend({
  vendorId: z.string(),
  email: z.string().email(),
});

export const VendorLoginSchema = baseEventSchema.extend({
  vendorId: z.string(),
  email: z.string().email(),
  deviceInfo: z
    .object({
      ip: z.string().optional(),
      userAgent: z.string().optional(),
      device: z.string().optional(),
    })
    .optional(),
});

export const VendorLogoutSchema = baseEventSchema.extend({
  vendorId: z.string(),
  sessionId: z.string().optional(),
});

export const VendorPasswordSchema = baseEventSchema.extend({
  email: z.string().email(),
  password: z.string(),
});

export const VendorUpdatedSchema = baseEventSchema.extend({
  vendorId: z.string(),
  email: z.string().email().optional(),
  storeName: z.string().optional(),
  metadata: metadataSchema,
  changedFields: z.array(z.string()).optional(),
});

export const VendorDeletedSchema = baseEventSchema.extend({
  vendorId: z.string(),
});

// Type exports
export type UserRegistered = z.infer<typeof UserRegisteredSchema>;
export type UserVerified = z.infer<typeof UserVerifiedSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserLogout = z.infer<typeof UserLogoutSchema>;
export type UserPassword = z.infer<typeof UserPasswordSchema>;
export type UserUpdated = z.infer<typeof UserUpdatedSchema>;
export type UserDeleted = z.infer<typeof UserDeletedSchema>;

export type VendorRegistered = z.infer<typeof VendorRegisteredSchema>;
export type VendorVerified = z.infer<typeof VendorVerifiedSchema>;
export type VendorLogin = z.infer<typeof VendorLoginSchema>;
export type VendorLogout = z.infer<typeof VendorLogoutSchema>;
export type VendorPassword = z.infer<typeof VendorPasswordSchema>;
export type VendorUpdated = z.infer<typeof VendorUpdatedSchema>;
export type VendorDeleted = z.infer<typeof VendorDeletedSchema>;
