export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};
