import {
  QueryCache,
  QueryClient,
  type QueryClientConfig,
} from '@tanstack/react-query';
import { toast } from 'sonner';

const queryConfig: QueryClientConfig = {
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
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
