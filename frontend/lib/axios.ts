import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let csrfCookieFetched = false;
let csrfCookiePromise: Promise<void> | null = null;

const getCsrfCookie = async (): Promise<void> => {
  if (csrfCookieFetched && csrfCookiePromise) {
    return csrfCookiePromise;
  }

  if (!csrfCookiePromise) {
    csrfCookiePromise = axios
      .get(`${API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      })
      .then(() => {
        csrfCookieFetched = true;
      })
      .catch(() => {
        csrfCookieFetched = false;
        csrfCookiePromise = null;
      });
  }

  return csrfCookiePromise;
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
      try {
        await getCsrfCookie();
        
        if (typeof document !== 'undefined') {
          const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
          
          if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
          }
        }
      } catch {
        // CSRF cookie fetch failed, continue anyway
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

