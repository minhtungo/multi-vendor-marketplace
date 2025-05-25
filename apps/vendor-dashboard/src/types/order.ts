export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

export enum PaymentMethod {
  STRIPE = 'stripe',
}

export type Address = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string | null;
};

export type Order = {
  id: number;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  totalAmount: string;
  currency: string;
  discountCodeId?: number | null;
  discountAmount?: string | null;

  shippingFirstName: string;
  shippingLastName: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhone?: string | null;

  billingFirstName: string;
  billingLastName: string;
  billingAddressLine1: string;
  billingAddressLine2?: string | null;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  billingPhone?: string | null;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string | null;
  metadata?: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  vendorId: string;
};

export interface ShippingAddress extends Address {}

export interface BillingAddress extends Address {}

export interface OrderWithAddresses
  extends Omit<
    Order,
    | 'shippingFirstName'
    | 'shippingLastName'
    | 'shippingAddressLine1'
    | 'shippingAddressLine2'
    | 'shippingCity'
    | 'shippingState'
    | 'shippingPostalCode'
    | 'shippingCountry'
    | 'shippingPhone'
    | 'billingFirstName'
    | 'billingLastName'
    | 'billingAddressLine1'
    | 'billingAddressLine2'
    | 'billingCity'
    | 'billingState'
    | 'billingPostalCode'
    | 'billingCountry'
    | 'billingPhone'
  > {
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
}

export interface CreateOrderInput {
  orderNumber: string;
  customerId: string;
  status?: OrderStatus;
  totalAmount: string;
  currency?: string;
  discountCodeId?: number;
  discountAmount?: string;

  // Shipping Address
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhone?: string;

  // Billing Address
  billingFirstName: string;
  billingLastName: string;
  billingAddressLine1: string;
  billingAddressLine2?: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  billingPhone?: string;

  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  notes?: string;
  metadata?: Record<string, any>;
  vendorId: string;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  totalAmount?: string;
  currency?: string;
  discountCodeId?: number | null;
  discountAmount?: string | null;

  shippingFirstName?: string;
  shippingLastName?: string;
  shippingAddressLine1?: string;
  shippingAddressLine2?: string | null;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  shippingPhone?: string | null;

  billingFirstName?: string;
  billingLastName?: string;
  billingAddressLine1?: string;
  billingAddressLine2?: string | null;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  billingPhone?: string | null;

  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  notes?: string | null;
  metadata?: Record<string, any> | null;
}

export type CreateOrderWithAddressesInput = {
  orderNumber: string;
  customerId: string;
  status?: OrderStatus;
  totalAmount: string;
  currency?: string;
  discountCodeId?: number;
  discountAmount?: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  notes?: string;
  metadata?: Record<string, any>;
  vendorId: string;
};

export type OrderSummary = {
  id: number;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  totalAmount: string;
  currency: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  vendorId: string;
};

export type OrderFilters = {
  status?: OrderStatus | OrderStatus[];
  paymentStatus?: PaymentStatus | PaymentStatus[];
  customerId?: string;
  vendorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: string;
  maxAmount?: string;
  orderNumber?: string;
};

export type OrderSortOptions = {
  field: 'createdAt' | 'updatedAt' | 'totalAmount' | 'orderNumber';
  direction: 'asc' | 'desc';
};

export type OrderPagination = {
  page: number;
  pageSize: number;
  total?: number;
  totalPages?: number;
};

export type OrderQueryResult = {
  orders: Order[];
  pagination: OrderPagination;
};
