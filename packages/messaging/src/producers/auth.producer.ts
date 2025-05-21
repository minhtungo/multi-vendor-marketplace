import { BaseProducer } from './base.producer';
import {
  AUTH_EXCHANGE,
  AUTH_EXCHANGE_TYPE,
  AuthEventType,
  UserRegistered,
  UserVerified,
  UserLogin,
  UserLogout,
  UserPassword,
  UserUpdated,
  UserDeleted,
  VendorRegistered,
  VendorVerified,
  VendorLogin,
  VendorLogout,
  VendorPassword,
  VendorUpdated,
  VendorDeleted,
} from '../events/auth.events';

export class UserAuthProducer extends BaseProducer {
  constructor(routingKey: string = 'user.#') {
    super(AUTH_EXCHANGE, AUTH_EXCHANGE_TYPE, routingKey);
  }

  async publishUserRegistered(userData: UserRegistered): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_REGISTERED,
      data: userData,
    });
  }

  async publishUserVerified(userData: UserVerified): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_VERIFIED,
      data: userData,
    });
  }

  async publishUserLoggedIn(userData: UserLogin): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_LOGGED_IN,
      data: userData,
    });
  }

  async publishUserLoggedOut(userData: UserLogout): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_LOGGED_OUT,
      data: userData,
    });
  }

  async publishUserPasswordReset(userData: UserPassword): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_PASSWORD_RESET,
      data: userData,
    });
  }

  async publishUserPasswordChanged(userData: UserPassword): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_PASSWORD_CHANGED,
      data: userData,
    });
  }

  async publishUserUpdated(userData: UserUpdated): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_UPDATED,
      data: userData,
    });
  }

  async publishUserDeleted(userData: UserDeleted): Promise<boolean> {
    return this.publish({
      type: AuthEventType.USER_DELETED,
      data: userData,
    });
  }
}

export class VendorAuthProducer extends BaseProducer {
  constructor(routingKey: string = 'vendor.#') {
    super(AUTH_EXCHANGE, AUTH_EXCHANGE_TYPE, routingKey);
  }

  async publishVendorRegistered(vendorData: VendorRegistered): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_REGISTERED,
      data: vendorData,
    });
  }

  async publishVendorVerified(vendorData: VendorVerified): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_VERIFIED,
      data: vendorData,
    });
  }

  async publishVendorLoggedIn(vendorData: VendorLogin): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_LOGGED_IN,
      data: vendorData,
    });
  }

  async publishVendorLoggedOut(vendorData: VendorLogout): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_LOGGED_OUT,
      data: vendorData,
    });
  }

  async publishVendorPasswordReset(vendorData: VendorPassword): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_PASSWORD_RESET,
      data: vendorData,
    });
  }

  async publishVendorPasswordChanged(vendorData: VendorPassword): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_PASSWORD_CHANGED,
      data: vendorData,
    });
  }

  async publishVendorUpdated(vendorData: VendorUpdated): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_UPDATED,
      data: vendorData,
    });
  }

  async publishVendorDeleted(vendorData: VendorDeleted): Promise<boolean> {
    return this.publish({
      type: AuthEventType.VENDOR_DELETED,
      data: vendorData,
    });
  }
}
