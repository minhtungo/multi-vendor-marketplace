export type Product = {
  id: string;
  vendorId: string;
  name: string;
  handle: string;
  description: string | null;
  sku: string;
  price: string;
  compareAtPrice: string | null;
  stock: number;
  status: 'draft' | 'published';
  type: 'physical' | 'digital';
  images: string[];
  categories: {
    id: string;
    name: string;
    handle: string;
  }[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
