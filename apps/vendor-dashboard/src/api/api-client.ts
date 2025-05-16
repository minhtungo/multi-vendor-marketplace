import { renewToken } from '@/api/auth/renew-token';
import { type CustomAxiosRequestConfig, baseAxiosConfig } from '@/api/axios';
import { client } from '@/configs/client';
import { env } from '@/configs/env';
import { authStore, useAuthActions, useAuthToken } from '@/store/auth-store';
import Axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

// Queue to handle concurrent refresh token requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: CustomAxiosRequestConfig;
}> = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Auth request interceptor function
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    const accessToken = authStore.getState().token;
    console.log('authStore', accessToken);
    console.log('authRequestInterceptor accessToken', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
}

function createAuthResponseInterceptor(axiosInstance: AxiosInstance) {
  return axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
      const prevRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 403 && !prevRequest.sent) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: prevRequest });
          })
            .then((token) => {
              if (token) {
                prevRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(prevRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        prevRequest.sent = true;
        isRefreshing = true;

        try {
          const response = await renewToken();
          if (response.data.accessToken) {
            const newAccessToken = response.data.accessToken;
            authStore.setState(() => ({
              token: newAccessToken,
            }));
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            processQueue(null, newAccessToken);
            return axiosInstance(prevRequest);
          }
        } catch (refreshError) {
          // Process all queued requests with the error
          processQueue(refreshError, null);
          console.error('Token refresh failed:', refreshError);
          window.location.href = client.path.signIn;
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
}

// Response interceptor for public APIs (no auth handling)
function createPublicResponseInterceptor(axiosInstance: AxiosInstance) {
  return axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
}

function setupErrorInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      }

      return Promise.reject(error);
    },
  );
}

// Factory function to create API clients
function createApiClient(baseURL: string, authenticated = false): AxiosInstance {
  const axiosInstance = Axios.create({
    ...baseAxiosConfig,
    baseURL: `${baseURL}`,
  });

  setupErrorInterceptor(axiosInstance);
  if (authenticated) {
    axiosInstance.interceptors.request.use(authRequestInterceptor);
    createAuthResponseInterceptor(axiosInstance);
  } else {
    createPublicResponseInterceptor(axiosInstance);
  }

  return axiosInstance;
}

export const publicApi = createApiClient(env.VITE_SERVER_URL, false);

export const privateApi = createApiClient(env.VITE_SERVER_URL, true);
