import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = useCallback((config: ToastConfig) => {
    const { message, type, duration = 3000 } = config;

    // Use Toast library for all message types
    const getToastConfig = () => {
      switch (type) {
        case 'error':
          return {
            type: 'error' as const,
            text1: 'Error',
            text2: message,
            position: 'top' as const,
            visibilityTime: duration,
            autoHide: true,
            topOffset: 10,
          };
        case 'success':
          return {
            type: 'success' as const,
            text1: 'Success',
            text2: message,
            position: 'bottom' as const,
            visibilityTime: duration,
            autoHide: true,
          };
        case 'warning':
          return {
            type: 'info' as const, // Toast library doesn't have warning type, use info
            text1: 'Warning',
            text2: message,
            position: 'bottom' as const,
            visibilityTime: duration,
            autoHide: true,
          };
        case 'info':
          return {
            type: 'info' as const,
            text1: 'Info',
            text2: message,
            position: 'bottom' as const,
            visibilityTime: duration,
            autoHide: true,
          };
        default:
          return {
            type: 'info' as const,
            text1: 'Notification',
            text2: message,
            position: 'bottom' as const,
            visibilityTime: duration,
            autoHide: true,
          };
      }
    };

    Toast.show(getToastConfig());
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      showToast({ message, type: 'success' });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string) => {
      showToast({ message, type: 'error' });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string) => {
      showToast({ message, type: 'warning' });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      showToast({ message, type: 'info' });
    },
    [showToast]
  );

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
