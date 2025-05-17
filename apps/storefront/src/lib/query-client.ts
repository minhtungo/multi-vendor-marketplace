import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

const queryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: 0,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
		mutations: {
			retry: false,
		},
	},
};

export const queryClient = new QueryClient(queryConfig);
