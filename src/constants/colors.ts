/**
 * Color constants for the application
 * Centralized color management for consistent theming
 */

export const Colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA6FF',

  // Secondary colors
  secondary: '#34C759',
  secondaryDark: '#28A745',
  secondaryLight: '#5DD579',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  darkGray: '#3A3A3C',

  // Background colors
  background: '#F8F9FA',
  backgroundSecondary: '#FFFFFF',
  backgroundTertiary: '#F2F2F7',

  // Text colors
  textPrimary: '#1C1C1E',
  textSecondary: '#3A3A3C',
  textTertiary: '#8E8E93',
  textInverse: '#FFFFFF',

  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',

  // Border colors
  border: '#E5E5EA',
  borderLight: '#F2F2F7',
  borderDark: '#C7C7CC',

  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',

  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Transparent
  transparent: 'transparent',
} as const;

// Type for color keys
export type ColorKey = keyof typeof Colors;
