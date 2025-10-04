import { AxiosError, AxiosResponse } from 'axios';

/**
 * Axios utility functions
 */

/**
 * Check if error is an Axios error
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true;
};

/**
 * Extract error message from Axios error
 */
export const getAxiosErrorMessage = (error: AxiosError): string => {
  if (error.response?.data && typeof error.response.data === 'object') {
    const data = error.response.data as Record<string, unknown>;
    if (typeof data.message === 'string') {
      return data.message;
    }
    if (typeof data.error === 'string') {
      return data.error;
    }
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Extract status code from Axios error
 */
export const getAxiosErrorStatus = (error: AxiosError): number | undefined => {
  return error.response?.status;
};

/**
 * Check if response is successful
 */
export const isSuccessfulResponse = (response: AxiosResponse): boolean => {
  return response.status >= 200 && response.status < 300;
};

/**
 * Create a standardized error object
 */
export const createAxiosError = (error: AxiosError) => {
  return {
    message: getAxiosErrorMessage(error),
    status: getAxiosErrorStatus(error),
    isNetworkError: !error.response,
    isTimeoutError: error.code === 'ECONNABORTED',
    isServerError: error.response?.status
      ? error.response.status >= 500
      : false,
    isClientError: error.response?.status
      ? error.response.status >= 400 && error.response.status < 500
      : false,
  };
};

/**
 * Retry configuration for failed requests
 */
export const getRetryConfig = (attempt: number, maxRetries: number = 3) => {
  return {
    shouldRetry: attempt < maxRetries,
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
  };
};
