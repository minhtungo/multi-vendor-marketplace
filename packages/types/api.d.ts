type BaseEntity = {
  success: boolean;
  status: number;
  message: string;
  errors: any[];
};

export type ApiResponse<T> = BaseEntity & {
  data: T;
};

export type PaginatedData<T> = T & {
  count: number;
  limit: number;
  offset: number;
};

export type PaginatedApiResponse<T> = BaseEntity & {
  data: T & {
    count: number;
  };
};
