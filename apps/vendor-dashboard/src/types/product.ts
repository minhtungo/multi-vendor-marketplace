export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  compareAtPrice: number | null;
  quantity: number;
  images: string[] | null;
  categories: string[] | null;
  tags: string[] | null;
  metadata: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
};
