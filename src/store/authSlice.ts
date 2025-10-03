import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { AuthService } from '../services/authService';

// Auth state interface
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoginLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true, // Start with loading true to prevent flash
  isLoginLoading: false, // Separate loading state for login form
  isAuthenticated: false,
  error: null,
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

// Helper function to validate token
const isTokenValid = (token: string): boolean => {
  return Boolean(token && token.startsWith('mock-jwt-token-'));
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    // Login cases
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // Logout cases
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Check auth state cases
      .addCase(checkAuthState.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, setLoading } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectIsLoginLoading = (state: { auth: AuthState }) =>
  state.auth.isLoginLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
