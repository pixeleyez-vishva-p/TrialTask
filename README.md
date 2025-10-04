# TrialTask - React Native E-commerce App

A modern React Native e-commerce application built with TypeScript, Redux Toolkit, and comprehensive testing.

## 🚀 Features

- **Modern UI Components** - Custom reusable components with consistent design
- **State Management** - Redux Toolkit for efficient state management
- **Type Safety** - Full TypeScript support throughout the application
- **Navigation** - React Navigation for seamless screen transitions
- **Authentication** - Complete auth flow with login/logout functionality
- **Product Catalog** - Browse and view product details with ratings
- **Loading States** - Skeleton placeholders for better UX
- **Toast Notifications** - User feedback for actions
- **Comprehensive Testing** - 124+ unit tests with Jest and React Testing Library

## 📱 Screens

- **Splash Screen** - App loading screen
- **Login Screen** - User authentication
- **Home Screen** - Product catalog with search and filtering
- **Detail Screen** - Individual product details

## 🛠 Tech Stack

- **React Native** 0.81.4
- **TypeScript** 5.8.3
- **Redux Toolkit** 2.9.0
- **React Navigation** 7.x
- **React Hook Form** 7.63.0
- **Yup** 1.7.1 (validation)
- **Jest** 29.6.3 (testing)
- **React Testing Library** (testing)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (>= 20.0.0)
- **Yarn** (recommended) or **npm**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TrialTask
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. iOS Setup (macOS only)

```bash
cd ios && pod install && cd ..
```

### 4. Start Metro Bundler

```bash
yarn start
```

### 5. Run the App

#### Android
```bash
yarn android
```

#### iOS
```bash
yarn ios
```

## 🧪 Testing

This project includes comprehensive unit testing with Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

### Test Coverage

- **124 tests** across 7 test suites
- **100% test pass rate**
- **Comprehensive component testing** including:
  - CustomButton (20+ tests)
  - CustomInput (20+ tests)
  - ItemCard (25+ tests)
  - SkeletonPlaceholder (15+ tests)
  - ItemCardSkeleton (15+ tests)
  - SplashScreen (10+ tests)

### Test Structure

```
src/common/components/__tests__/
├── CustomButton.test.tsx
└── CustomInput.test.tsx

src/views/items/__tests__/
├── ItemCard.test.tsx
└── ItemCardSkeleton.test.tsx

src/views/ui/__tests__/
└── SkeletonPlaceholder.test.tsx

src/views/app/__tests__/
└── SplashScreen.test.tsx

__tests__/
└── App.test.tsx
```

## 🔧 Development Scripts

```bash
# Start development server
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run tests
yarn test

# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check

# Type checking
yarn type-check

# Run all quality checks
yarn check-all
```

## 📁 Project Structure

```
src/
├── common/                    # Common utilities and shared code
│   ├── api/                  # API configuration and services
│   │   ├── axios/           # Axios configuration
│   │   │   ├── instances.ts
│   │   │   └── utils.ts
│   │   ├── services/        # API service classes
│   │   │   ├── auth-service.ts
│   │   │   └── item-service.ts
│   │   └── request-wrapper.ts # Generic API wrapper
│   ├── components/          # Reusable UI components
│   │   ├── __tests__/       # Component tests
│   │   ├── CustomButton.tsx
│   │   └── CustomInput.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── use-toast.ts
│   ├── store/              # Redux store configuration
│   │   ├── hooks.ts
│   │   └── index.ts
│   └── types/              # Global type definitions
│       ├── api/            # API-related types
│       ├── components/     # Component prop types
│       ├── constants/      # Constants types
│       ├── screens/        # Screen and navigation types
│       ├── store/          # Redux store types
│       ├── ui/             # UI-related types
│       └── global.d.ts     # Global type declarations
├── views/                   # Feature-based components
│   ├── items/              # Items-related components
│   │   ├── __tests__/
│   │   ├── ItemCard.tsx
│   │   └── ItemCardSkeleton.tsx
│   ├── ui/                 # UI components
│   │   ├── __tests__/
│   │   └── SkeletonPlaceholder.tsx
│   └── app/                # App-level components
│       ├── __tests__/
│       └── SplashScreen.tsx
├── screens/                 # App screens (feature-based)
│   ├── auth/               # Authentication screens
│   │   └── login-screen.tsx
│   └── items/              # Items-related screens
│       ├── home-screen.tsx
│       └── detail-screen.tsx
├── lib/                    # Library code
│   └── redux/              # Redux implementation
│       ├── auth/           # Auth module
│       │   ├── slice.ts
│       │   └── thunks.ts
│       └── items/          # Items module
│           ├── slice.ts
│           └── thunks.ts
├── navigation/              # Navigation configuration
│   └── app-navigator.tsx
├── context/                # React Context providers
│   └── auth-context.tsx
├── constants/              # App constants
│   ├── colors.ts
│   └── api.ts
├── utils/                  # Utility functions
│   └── validation.ts
└── setup-tests.ts          # Jest test setup
```

## 🎨 Components

### CustomButton
A versatile button component with multiple variants, sizes, and states.

**Props:**
- `title: string` - Button text
- `onPress: () => void` - Press handler
- `loading?: boolean` - Loading state
- `disabled?: boolean` - Disabled state
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style
- `size?: 'small' | 'medium' | 'large'` - Button size

### CustomInput
A form input component with label, error handling, and validation.

**Props:**
- `label: string` - Input label
- `error?: string` - Error message
- `containerStyle?: ViewStyle` - Container styling
- All standard TextInput props

### ItemCard
A product card component displaying item information.

**Props:**
- `item: Item` - Product data
- `onPress: (item: Item) => void` - Press handler
- `style?: ViewStyle` - Custom styling

## 🔐 Authentication

The app includes a complete authentication system with:

- Login/logout functionality
- Form validation with Yup
- Error handling and user feedback
- Secure token management
- Redux state management

## 📱 Navigation

Built with React Navigation v7:

- Stack navigation for main flow
- Type-safe navigation with TypeScript
- Screen parameter definitions
- Navigation state management

## 🎯 State Management

Redux Toolkit is used for state management with:

- **Auth Slice** - User authentication state
- **Items Slice** - Product data and loading states
- **Type-safe actions** and reducers
- **Async thunks** for API calls
- **Module-based organization** - Each feature has its own slice and thunks
- **Centralized store configuration** in `src/common/store/`

## 🌐 API Architecture

The app uses a robust API architecture with:

- **Axios-based HTTP client** with interceptors
- **Request wrapper** for consistent error handling and retry logic
- **Type-safe API responses** with generic types
- **Service layer pattern** - Separate services for different domains
- **Centralized API configuration** in `src/common/api/`
- **Mock services** for development and testing

### API Structure
```
src/common/api/
├── axios/              # Axios configuration and utilities
├── services/           # Domain-specific API services
└── request-wrapper.ts  # Generic API wrapper with error handling
```

## 🎨 Styling

- **Consistent color scheme** defined in constants
- **Responsive design** for different screen sizes
- **Custom component styling** with StyleSheet
- **Theme-based colors** for maintainability

## 🚀 Performance

- **Optimized rendering** with proper React patterns
- **Efficient state updates** with Redux Toolkit
- **Lazy loading** for better performance
- **Memory leak prevention** in components

## 🔧 Code Quality

The project maintains high code quality standards with:

- **TypeScript** - Full type safety throughout the application
- **ESLint** - Code linting with custom rules for React Native
- **Prettier** - Consistent code formatting
- **Global type declarations** - Types available without imports
- **Comprehensive error handling** - Proper error boundaries and fallbacks
- **Clean architecture** - Separation of concerns and modular design

### Quality Metrics
- **124 tests** with 100% pass rate
- **0 TypeScript errors**
- **11 ESLint warnings** (only console statements for debugging)
- **Consistent code formatting** across all files
- **Type-safe API calls** with proper error handling

## 🧪 Testing Strategy

### Unit Testing
- **Component testing** with React Testing Library
- **User-centric testing** approach
- **Comprehensive coverage** of all components
- **Mock external dependencies**

### Test Categories
- **Rendering tests** - Component renders correctly
- **Interaction tests** - User interactions work
- **Props tests** - Props are handled correctly
- **State tests** - Component state changes
- **Accessibility tests** - A11y compliance
- **Edge cases** - Error handling and boundary conditions

## 📦 Dependencies

### Production Dependencies
- React Native 0.81.4
- React 19.1.0
- Redux Toolkit 2.9.0
- React Navigation 7.x
- React Hook Form 7.63.0
- Yup 1.7.1
- Axios 1.7.7 (HTTP client)
- @react-native-async-storage/async-storage (local storage)

### Development Dependencies
- TypeScript 5.8.3
- Jest 29.6.3
- React Testing Library
- ESLint & Prettier
- React Native CLI
- @typescript-eslint/eslint-plugin
- jest-environment-jsdom

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

4. **Test failures**
   ```bash
   yarn test --clearCache
   ```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Run linting and formatting
7. Submit a pull request

## 🆕 Recent Improvements

### Architecture Enhancements
- **Modular Redux structure** - Separated slices and thunks by feature
- **Centralized API layer** - Axios-based HTTP client with error handling
- **Global type system** - Types available without explicit imports
- **Feature-based organization** - Screens and components grouped by functionality
- **Enhanced error handling** - Comprehensive error boundaries and user feedback

### Code Quality Improvements
- **Type safety** - Replaced all `any` types with specific types
- **Code cleanup** - Removed unused imports and variables
- **Consistent formatting** - Prettier configuration for code consistency
- **ESLint optimization** - Custom rules for React Native development
- **Test coverage** - Comprehensive unit tests for all components

### Performance Optimizations
- **Efficient state management** - Optimized Redux selectors and actions
- **Memory leak prevention** - Proper cleanup in useEffect hooks
- **Bundle optimization** - Tree-shaking and code splitting
- **API caching** - Request deduplication and caching strategies

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Happy Coding! 🚀**