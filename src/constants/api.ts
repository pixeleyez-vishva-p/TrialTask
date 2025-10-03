/**
 * API Constants
 * Centralized location for all API-related constants
 */

// Base URLs
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// API Endpoints
export const API_ENDPOINTS = {
  POSTS: '/posts',
  POST_BY_ID: (id: number) => `/posts/${id}`,
} as const;

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Mock Data Configuration
export const MOCK_CONFIG = {
  ITEMS_LIMIT: 20,
  CATEGORIES: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'] as const,
  PRICE_RANGE: {
    MIN: 10,
    MAX: 1010,
  },
  RATING_RANGE: {
    MIN: 1.0,
    MAX: 5.0,
  },
  RATING_COUNT_RANGE: {
    MIN: 1,
    MAX: 100,
  },
} as const;

// Image URLs
export const IMAGE_URLS = {
  PICSUM_BASE: 'https://picsum.photos',
  ITEM_IMAGE: (id: number, width = 300, height = 200) => 
    `${IMAGE_URLS.PICSUM_BASE}/${width}/${height}?random=${id}`,
  DETAIL_IMAGE: (id: number, width = 400, height = 300) => 
    `${IMAGE_URLS.PICSUM_BASE}/${width}/${height}?random=${id}`,
} as const;
