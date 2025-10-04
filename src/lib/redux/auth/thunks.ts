import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../../../common/api/services/auth-service';

// Helper function to validate token
const isTokenValid = (token: string): boolean => {
  return Boolean(token && token.startsWith('mock-jwt-token-'));
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(email, password);

      if (response.success) {
        // Store user data and token in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        await AsyncStorage.setItem('authToken', response.token || 'mock-token');

        return {
          user: response.data,
          token: response.token,
        };
      } else {
        return rejectWithValue(response.message);
      }
    } catch {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();

      // Clear stored session data
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('authToken');

      return true;
    } catch {
      return rejectWithValue('Logout failed');
    }
  }
);

// Async thunk for checking existing session
export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { rejectWithValue }) => {
    try {
      // Small delay to ensure AsyncStorage is ready

      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('authToken');

      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);

        // Validate token (in real app, validate with backend)
        if (isTokenValid(storedToken)) {
          return {
            user: userData,
            token: storedToken,
          };
        } else {
          // Clear expired session
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('authToken');
          return null;
        }
      }

      return null;
    } catch {
      return rejectWithValue('Failed to check auth state');
    }
  }
);
