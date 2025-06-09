import { MutationCache, QueryCache, QueryClient, type QueryClientConfig } from '@tanstack/react-query';
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
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }
    },
    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        toast.error(mutation.meta.errorMessage);
      }
    },
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidatesQuery) {
        queryClient.invalidateQueries({ queryKey: mutation.meta.invalidatesQuery });
      }
    },
  }),
};

export const queryClient = new QueryClient(queryConfig);
