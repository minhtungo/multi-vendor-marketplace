import { BaseConsumer } from './base.consumer';
import {
  AUTH_EXCHANGE,
  AUTH_EXCHANGE_TYPE,
  AUTH_QUEUE_PREFIX,
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

export type EventData =
  | UserRegistered
  | UserVerified
  | UserLogin
  | UserLogout
  | UserPassword
  | UserUpdated
  | UserDeleted
  | VendorRegistered
  | VendorVerified
  | VendorLogin
  | VendorLogout
  | VendorPassword
  | VendorUpdated
  | VendorDeleted;

export interface AuthEventMessage {
  type: AuthEventType;
  data: EventData;
}

export abstract class AuthConsumer extends BaseConsumer {
  constructor(queueSuffix: string, routingKey: string) {
    const queue = `${AUTH_QUEUE_PREFIX}.${queueSuffix}`;
    super(AUTH_EXCHANGE, AUTH_EXCHANGE_TYPE, queue, routingKey);
  }

  async handleMessage(message: AuthEventMessage): Promise<void> {
    switch (message.type) {
      // User events
      case AuthEventType.USER_REGISTERED:
        await this.onUserRegistered(message.data as UserRegistered);
        break;
      case AuthEventType.USER_VERIFIED:
        await this.onUserVerified(message.data as UserVerified);
        break;
      case AuthEventType.USER_LOGGED_IN:
        await this.onUserLoggedIn(message.data as UserLogin);
        break;
      case AuthEventType.USER_LOGGED_OUT:
        await this.onUserLoggedOut(message.data as UserLogout);
        break;
      case AuthEventType.USER_PASSWORD_RESET:
        await this.onUserPasswordReset(message.data as UserPassword);
        break;
      case AuthEventType.USER_PASSWORD_CHANGED:
        await this.onUserPasswordChanged(message.data as UserPassword);
        break;
      case AuthEventType.USER_UPDATED:
        await this.onUserUpdated(message.data as UserUpdated);
        break;
      case AuthEventType.USER_DELETED:
        await this.onUserDeleted(message.data as UserDeleted);
        break;

      // Vendor events
      case AuthEventType.VENDOR_REGISTERED:
        await this.onVendorRegistered(message.data as VendorRegistered);
        break;
      case AuthEventType.VENDOR_VERIFIED:
        await this.onVendorVerified(message.data as VendorVerified);
        break;
      case AuthEventType.VENDOR_LOGGED_IN:
        await this.onVendorLoggedIn(message.data as VendorLogin);
        break;
      case AuthEventType.VENDOR_LOGGED_OUT:
        await this.onVendorLoggedOut(message.data as VendorLogout);
        break;
      case AuthEventType.VENDOR_PASSWORD_RESET:
        await this.onVendorPasswordReset(message.data as VendorPassword);
        break;
      case AuthEventType.VENDOR_PASSWORD_CHANGED:
        await this.onVendorPasswordChanged(message.data as VendorPassword);
        break;
      case AuthEventType.VENDOR_UPDATED:
        await this.onVendorUpdated(message.data as VendorUpdated);
        break;
      case AuthEventType.VENDOR_DELETED:
        await this.onVendorDeleted(message.data as VendorDeleted);
        break;

      default:
        console.warn(`Unknown event type: ${message.type}`);
    }
  }

  // User event handlers (to be implemented by concrete consumers)
  protected async onUserRegistered(data: UserRegistered): Promise<void> {}
  protected async onUserVerified(data: UserVerified): Promise<void> {}
  protected async onUserLoggedIn(data: UserLogin): Promise<void> {}
  protected async onUserLoggedOut(data: UserLogout): Promise<void> {}
  protected async onUserPasswordReset(data: UserPassword): Promise<void> {}
  protected async onUserPasswordChanged(data: UserPassword): Promise<void> {}
  protected async onUserUpdated(data: UserUpdated): Promise<void> {}
  protected async onUserDeleted(data: UserDeleted): Promise<void> {}

  // Vendor event handlers (to be implemented by concrete consumers)
  protected async onVendorRegistered(data: VendorRegistered): Promise<void> {}
  protected async onVendorVerified(data: VendorVerified): Promise<void> {}
  protected async onVendorLoggedIn(data: VendorLogin): Promise<void> {}
  protected async onVendorLoggedOut(data: VendorLogout): Promise<void> {}
  protected async onVendorPasswordReset(data: VendorPassword): Promise<void> {}
  protected async onVendorPasswordChanged(data: VendorPassword): Promise<void> {}
  protected async onVendorUpdated(data: VendorUpdated): Promise<void> {}
  protected async onVendorDeleted(data: VendorDeleted): Promise<void> {}
}
