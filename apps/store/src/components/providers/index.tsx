'use client';

import { QueryClientProviders } from '@/components/providers/query-client-providers';

export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProviders>{children}</QueryClientProviders>;
}
