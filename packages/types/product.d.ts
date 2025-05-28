export type Product = {
  id: string;
  vendorId: string;
  name: string;
  handle: string;
  description: string | null;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  status: 'draft' | 'published';
  type: 'physical' | 'digital';
  images: string[];
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
