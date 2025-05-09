type BaseEntity = {
	success: boolean;
	status: number;
	message: string;
	errors: Record<string, string>[];
};

export type ApiResponse<T> = BaseEntity & {
	data: T;
};

export type PaginatedApiResponse<T> = BaseEntity & {
	data: T & {
		nextOffset: number;
		hasNextPage: boolean;
	};
};
