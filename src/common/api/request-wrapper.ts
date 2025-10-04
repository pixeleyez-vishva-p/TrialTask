import { axiosInstance } from './axios';
import { AxiosResponse } from 'axios';
import { HttpMethod } from '../types/api/api-wrapper';

/**
 * API Wrapper class with success and error handling
 */
export class RequestWrapper {
  /**
   * Generate unique request ID
   */
  private static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create enhanced error object
   */
  private static createApiError(error: unknown, requestId?: string): ApiError {
    const timestamp = Date.now();
    const errorObj = error as Record<string, unknown>;
    const status = errorObj.response?.status as number | undefined;
    const isNetworkError = !errorObj.response && errorObj.request;
    const isTimeoutError =
      errorObj.code === 'ECONNABORTED' ||
      (typeof errorObj.message === 'string' &&
        errorObj.message.includes('timeout'));
    const isServerError = (status ?? 0) >= 500;
    const isClientError = (status ?? 0) >= 400 && (status ?? 0) < 500;
    const retryable = isNetworkError || isTimeoutError || (status ?? 0) >= 500;

    return {
      message:
        typeof errorObj.message === 'string'
          ? errorObj.message
          : 'An unexpected error occurred',
      status,
      statusText: errorObj.response?.statusText as string | undefined,
      data: errorObj.response?.data,
      code: errorObj.code as string | undefined,
      timestamp,
      requestId,
      isNetworkError: Boolean(isNetworkError),
      isTimeoutError: Boolean(isTimeoutError),
      isServerError: Boolean(isServerError),
      isClientError: Boolean(isClientError),
      retryable: Boolean(retryable),
    };
  }

  /**
   * Create enhanced response object
   */
  private static createApiResponse<T>(
    response: AxiosResponse<T>,
    requestId?: string
  ): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      success: true,
      timestamp: Date.now(),
      requestId,
    };
  }

  /**
   * Retry logic for failed requests
   */
  private static async retryRequest<T>(
    method: HttpMethod,
    url: string,
    data: unknown,
    config: RequestConfig,
    retries: number
  ): Promise<ApiResponse<T>> {
    try {
      return await this.makeRequest(method, url, data, config);
    } catch (error: unknown) {
      const apiError = this.createApiError(error, config.requestId);

      if (retries > 0 && apiError.retryable) {
        const delay = config.retryDelay || 1000;
        await new Promise<void>(resolve => setTimeout(resolve, delay));
        return this.retryRequest(method, url, data, config, retries - 1);
      }

      throw apiError;
    }
  }

  /**
   * Make the actual HTTP request
   */
  private static async makeRequest<T>(
    method: HttpMethod,
    url: string,
    data: unknown,
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    const requestId = config.requestId || this.generateRequestId();
    const finalConfig = {
      ...config,
      requestId,
      timeout: config.timeout || 10000,
    };

    const response: AxiosResponse<T> = await axiosInstance.request({
      method,
      url,
      data,
      ...finalConfig,
    });

    return this.createApiResponse(response, requestId);
  }

  /**
   * Generic request method with error handling and retry logic
   */
  private static async request<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      const requestId = config.requestId || this.generateRequestId();
      const finalConfig = { ...config, requestId };

      // Use retry logic if retries are specified
      if (config.retries && config.retries > 0) {
        return await this.retryRequest(
          method,
          url,
          data,
          finalConfig,
          config.retries
        );
      }

      return await this.makeRequest(method, url, data, finalConfig);
    } catch (error: unknown) {
      const apiError = this.createApiError(error, config.requestId);
      throw apiError;
    }
  }

  /**
   * GET request with enhanced configuration
   */
  static async get<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.GET, url, undefined, config);
  }

  /**
   * POST request with enhanced configuration
   */
  static async post<T>(
    url: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.POST, url, data, config);
  }

  /**
   * PUT request with enhanced configuration
   */
  static async put<T>(
    url: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.PUT, url, data, config);
  }

  /**
   * PATCH request with enhanced configuration
   */
  static async patch<T>(
    url: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.PATCH, url, data, config);
  }

  /**
   * DELETE request with enhanced configuration
   */
  static async delete<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.DELETE, url, undefined, config);
  }

  /**
   * Upload file with enhanced configuration
   */
  static async upload<T>(
    url: string,
    formData: FormData,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(HttpMethod.POST, url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      },
    });
  }

  /**
   * Download file with enhanced error handling
   */
  static async download(
    url: string,
    config: RequestConfig = {}
  ): Promise<Blob> {
    try {
      const response = await axiosInstance.get(url, {
        ...config,
        responseType: 'blob',
      });
      return response.data;
    } catch (error: unknown) {
      const apiError = this.createApiError(error, config.requestId);
      throw apiError;
    }
  }

  /**
   * Set authorization token
   */
  static setAuthToken(token: string): void {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authorization token
   */
  static removeAuthToken(): void {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }

  /**
   * Set base URL
   */
  static setBaseURL(baseURL: string): void {
    axiosInstance.defaults.baseURL = baseURL;
  }

  /**
   * Get current base URL
   */
  static getBaseURL(): string | undefined {
    return axiosInstance.defaults.baseURL;
  }
}

export default RequestWrapper;
