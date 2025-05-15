import { renewToken } from '@/api/auth/renew-token';
import { getVendor, getVendorQueryOptions } from '@/api/user/get-vendor';
import { queryClient } from '@/integrations/tanstack-query/query-client';
import { createZustandContext } from '@/lib/context';
import { createStore } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  isLoaded: boolean;
};

export type AuthActions = {
  clearSession: () => void;
  createSession: (token: AuthState['token'], userId: AuthState['userId']) => void;
  initializeAuth: () => Promise<void>;
};

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoaded: false,
  token: '',
  userId: '',
};

const authStore = createStore<AuthState & { actions: AuthActions }>((set) => ({
  ...initialAuthState,
  actions: {
    clearSession: () => set(initialAuthState),
    createSession: (token, userId) => set({ token, userId, isAuthenticated: true, isLoaded: true }),
    initializeAuth: async () => {
      try {
        const { data } = await renewToken();
        if (data?.accessToken) {
          set({ token: data.accessToken });
        }
        const vendor = await getVendor();
        queryClient.setQueryData(getVendorQueryOptions().queryKey, vendor.data);
        console.log('vendor', vendor);
        set({
          isAuthenticated: true,
          isLoaded: true,
          userId: vendor.data.id,
        });
      } catch (error) {
        set({ isAuthenticated: false, isLoaded: true });
      }
    },
  },
}));

const { useStore, Provider: AuthProvider } = createZustandContext(() => authStore);

export const useAuthActions = (): AuthActions => useStore((state) => state.actions);
export const useAuthIsAuthenticated = (): AuthState['isAuthenticated'] => useStore((state) => state.isAuthenticated);
export const useAuthIsLoaded = (): AuthState['isLoaded'] => useStore((state) => state.isLoaded);
export const useAuthToken = (): AuthState['token'] => useStore((state) => state.token);
export const useAuthUserId = (): AuthState['userId'] => useStore((state) => state.userId);

export { AuthProvider };
