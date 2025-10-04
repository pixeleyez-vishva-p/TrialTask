import { TextInputProps } from 'react-native';

// Custom Button Props
export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: import('react-native').ViewStyle;
  textStyle?: import('react-native').TextStyle;
}

// Custom Input Props
export interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: import('react-native').ViewStyle;
  inputStyle?: import('react-native').TextInputStyle;
  labelStyle?: import('react-native').TextStyle;
  errorStyle?: import('react-native').TextStyle;
}

// Skeleton Placeholder Props
export interface SkeletonPlaceholderProps {
  width?: import('react-native').DimensionValue;
  height?: import('react-native').DimensionValue;
  borderRadius?: number;
  style?: import('react-native').ViewStyle;
  children?: React.ReactNode;
}

// Item Card Props
export interface ItemCardProps {
  item: {
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
  };
  onPress: (item: Item) => void;
  style?: import('react-native').ViewStyle;
}

// Splash Screen Props
export interface SplashScreenProps {
  message?: string;
}
