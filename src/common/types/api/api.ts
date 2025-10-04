// Basic API types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ItemsResponse {
  items: Item[];
  total: number;
  skip: number;
  limit: number;
}
