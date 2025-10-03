// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Login Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  token?: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
