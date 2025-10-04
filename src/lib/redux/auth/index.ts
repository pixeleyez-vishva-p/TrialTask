// Export slice
export { default as authReducer } from './slice';
export {
  clearError as clearAuthError,
  setLoading as setAuthLoading,
} from './slice';
export {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectIsLoginLoading,
  selectAuthError,
} from './slice';

// Export thunks
export { loginUser, logoutUser, checkAuthState } from './thunks';
