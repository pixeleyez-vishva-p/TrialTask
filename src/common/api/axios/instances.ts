import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { API_BASE_URL, API_CONFIG } from '../../../constants';

/**
 * Axios instance with base configuration
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request interceptor for adding auth tokens and common headers
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    // You can get the token from AsyncStorage or Redux store
    // const token = await AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   };
    // }

    // Log request in development
    if (__DEV__) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling common responses and errors
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (__DEV__) {
      console.log('✅ API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  error => {
    // Log error in development
    if (__DEV__) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          console.warn('🔐 Unauthorized access - token may be expired');
          break;
        case 403:
          // Forbidden
          console.warn('🚫 Access forbidden');
          break;
        case 404:
          // Not found
          console.warn('🔍 Resource not found');
          break;
        case 500:
          // Server error
          console.error('🔥 Server error');
          break;
        default:
          console.error(
            `❌ HTTP Error ${status}: ${data?.message || 'Unknown error'}`
          );
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network error - no response received');
    } else {
      // Other error
      console.error('⚠️ Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
