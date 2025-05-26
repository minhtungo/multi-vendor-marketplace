export type Upload = {
  id: string;
  key: string;
  fileName: string;
  mimeType: string;
  size: string | null;
  url: string | null;
  userId: string;
  createdAt: Date;
};
