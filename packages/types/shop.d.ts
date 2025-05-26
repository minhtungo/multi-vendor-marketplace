export type ShopStatus = 'draft' | 'published' | 'suspended';

export type Shop = {
  id: string;
  vendorId: string;
  name: string;
  description?: string;
  slug: string;
  logo?: string;
  banner?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  isActive: boolean;
  isVerified: boolean;
  status: ShopStatus;
  createdAt: Date;
  updatedAt: Date;
};
