import { AxiosRequestConfig } from 'axios';

// API Response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  status?: number;
  statusText?: string;
  success: boolean;
  message?: string;
  timestamp?: number;
  requestId?: string;
  token?: string;
}

// API Error wrapper with detailed error information
export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  data?: unknown;
  code?: string;
  timestamp: number;
  requestId?: string;
  isNetworkError: boolean;
  isTimeoutError: boolean;
  isServerError: boolean;
  isClientError: boolean;
  retryable: boolean;
}

// Request configuration options
export interface RequestConfig extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  requestId?: string;
}

// HTTP Methods enum
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
