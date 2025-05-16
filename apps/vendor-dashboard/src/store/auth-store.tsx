import { renewToken } from '@/api/auth/renew-token';
import { getVendor, getVendorQueryOptions } from '@/api/user/get-vendor';
import { queryClient } from '@/integrations/tanstack-query/query-client';
import { createZustandContext } from '@/lib/context';
import { createStore } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  token: string;
  vendorId: string;
  isLoaded: boolean;
};

export type AuthActions = {
  clearSession: () => void;
  createSession: (token: AuthState['token'], userId: AuthState['vendorId']) => void;
  setToken: (token: AuthState['token']) => void;
  initializeAuth: () => Promise<void>;
};

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoaded: false,
  token: '',
  vendorId: '',
};

export const authStore = createStore<AuthState & { actions: AuthActions }>((set) => ({
  ...initialAuthState,
  actions: {
    clearSession: () => set(initialAuthState),
    createSession: (token, vendorId) => set({ token, vendorId, isAuthenticated: true, isLoaded: true }),
    setToken: (token) => set({ token }),
    initializeAuth: async () => {
      try {
        const { data } = await renewToken();
        if (data?.accessToken) {
          set({ token: data.accessToken });
        }
        const vendor = await getVendor();
        console.log('vendor', vendor);
        queryClient.setQueryData(getVendorQueryOptions().queryKey, vendor.data);
        set({
          isAuthenticated: true,
          isLoaded: true,
          vendorId: vendor.data.id,
        });
      } catch (error) {
        set({ isAuthenticated: false, isLoaded: true });
      }
    },
  },
}));

const { useStore, Provider: AuthProvider } = createZustandContext(() => authStore);

export const useAuthActions = () => useStore((state) => state.actions);
export const useAuthIsAuthenticated = () => useStore((state) => state.isAuthenticated);
export const useAuthIsLoaded = () => useStore((state) => state.isLoaded);
export const useAuthToken = () => useStore((state) => state.token);
export const useAuthVendorId = () => useStore((state) => state.vendorId);

export { AuthProvider };
