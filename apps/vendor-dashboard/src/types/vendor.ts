export type VendorStatus = 'pending' | 'active' | 'suspended';

export type Vendor = {
  id: string;
  name: string;
  email: string;
  description?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  status: VendorStatus;
  stripeId?: string;
  createdAt: Date;
  updatedAt: Date;
};
