import '@testing-library/jest-native/extend-expect';

// Mock react-native-skeleton-placeholder
jest.mock('react-native-skeleton-placeholder', () => {
  const React = require('react');
  const { View } = require('react-native');

  const SkeletonPlaceholder = ({ children, ...props }: any) =>
    React.createElement(
      View,
      { testID: 'skeleton-container', ...props },
      children
    );

  SkeletonPlaceholder.Item = ({ style, ...props }: any) =>
    React.createElement(View, { testID: 'skeleton-item', style, ...props });

  return {
    __esModule: true,
    default: SkeletonPlaceholder,
  };
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({ children }: any) => children,
}));

// Mock @react-navigation/stack
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  }),
}));

// Mock Redux
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  Provider: ({ children }: any) => children,
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    register: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
  }),
  Controller: ({ render }: any) =>
    render({ field: { onChange: jest.fn(), value: '' } }),
}));

// Mock yup
jest.mock('yup', () => ({
  object: () => ({
    shape: () => ({
      validate: jest.fn(),
      isValid: jest.fn(),
    }),
  }),
  string: () => ({
    required: jest.fn().mockReturnThis(),
    email: jest.fn().mockReturnThis(),
    min: jest.fn().mockReturnThis(),
  }),
}));

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

// Suppress console warnings during tests
beforeAll(() => {
  // Suppress specific warnings during tests
  jest.spyOn(console, 'warn').mockImplementation((...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    // Suppress the warning by not calling the original
  });

  jest.spyOn(console, 'error').mockImplementation((...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') || args[0].includes('Error:'))
    ) {
      return;
    }
    // Suppress the warning by not calling the original
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
