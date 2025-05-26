export type Product = {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  description: string | null;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
  status: 'draft' | 'published';
  type: 'physical' | 'digital';
  images: string[];
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
