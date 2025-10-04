import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../common/api/services/auth-service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = useCallback(async () => {
    try {
      // Retrieve user data from AsyncStorage
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('authToken');

      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);

        // In a real app, you would validate the token with your backend
        // For now, we'll just check if the token exists and is not expired
        if (isTokenValid(storedToken)) {
          setUser(userData);
        } else {
          // Token is expired, clear the session
          await clearStoredSession();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check for existing user session on app start
    checkAuthState();
  }, [checkAuthState]);

  const isTokenValid = (token: string): boolean => {
    // In a real app, you would decode and validate the JWT token
    // For now, we'll just check if it's a valid format
    return Boolean(token && token.startsWith('mock-jwt-token-'));
  };

  const clearStoredSession = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('authToken');
    } catch {
      // Error clearing stored session - silently fail
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(email, password);

      if (response.success) {
        setUser(response.data);

        // Store user data and token in AsyncStorage for session persistence
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        await AsyncStorage.setItem('authToken', response.token || 'mock-token');

        return true;
      } else {
        throw new Error(response.message);
      }
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();

      // Clear user data and token from AsyncStorage
      await clearStoredSession();

      setUser(null);
    } catch {
      // Logout error - silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
