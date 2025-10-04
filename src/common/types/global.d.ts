/**
 * Global Type Declarations
 * This file makes all types available globally without imports
 */

// Re-export all types from common/types
declare global {
  // API Types
  type User = import('./api/api').User;
  type LoginFormData = import('./api/api').LoginFormData;
  type AuthContextType = import('./api/api').AuthContextType;
  type Item = import('./api/api').Item;
  type ItemsResponse = import('./api/api').ItemsResponse;

  // API Wrapper Types
  type ApiResponse<T = unknown> = import('./api/api-wrapper').ApiResponse<T>;
  type ApiError = import('./api/api-wrapper').ApiError;
  type RequestConfig = import('./api/api-wrapper').RequestConfig;
  type HttpMethod = import('./api/api-wrapper').HttpMethod;

  // Component Types
  type CustomButtonProps = import('./components').CustomButtonProps;
  type CustomInputProps = import('./components').CustomInputProps;
  type SkeletonPlaceholderProps =
    import('./components').SkeletonPlaceholderProps;
  type ItemCardProps = import('./components').ItemCardProps;
  type SplashScreenProps = import('./components').SplashScreenProps;

  // Screen Types
  type HomeScreenProps = import('./screens').HomeScreenProps;
  type LoginScreenProps = import('./screens').LoginScreenProps;
  type DetailScreenProps = import('./screens').DetailScreenProps;
  type HomeScreenNavigationProp = import('./screens').HomeScreenNavigationProp;
  type LoginScreenNavigationProp =
    import('./screens').LoginScreenNavigationProp;
  type DetailScreenNavigationProp =
    import('./screens').DetailScreenNavigationProp;
  type DetailScreenRouteProp = import('./screens').DetailScreenRouteProp;

  // Store Types
  type AuthState = import('./store').AuthState;
  type ItemsState = import('./store').ItemsState;
  type RootState = import('./store').RootState;
  type AppDispatch = import('./store').AppDispatch;

  // Context Types
  type AuthProviderProps = import('./store/context').AuthProviderProps;

  // UI Types
  type ToastConfig = import('./ui').ToastConfig;

  // Constants Types
  type ColorKey = import('./constants').ColorKey;

  // Navigation Types
  type RootStackParamList = import('./screens/screen').RootStackParamList;
}

export {};
