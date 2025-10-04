import { Item } from '../api';

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { item: Item };
};
