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
  images: string[] | null;
  categories: string[] | null;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
};
