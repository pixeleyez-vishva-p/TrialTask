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
src/components/__tests__/
├── CustomButton.test.tsx
├── CustomInput.test.tsx
├── ItemCard.test.tsx
├── SkeletonPlaceholder.test.tsx
├── ItemCardSkeleton.test.tsx
└── SplashScreen.test.tsx
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
├── components/           # Reusable UI components
│   ├── __tests__/       # Component tests
│   ├── CustomButton.tsx
│   ├── CustomInput.tsx
│   ├── ItemCard.tsx
│   ├── SkeletonPlaceholder.tsx
│   ├── ItemCardSkeleton.tsx
│   └── SplashScreen.tsx
├── screens/             # App screens
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── DetailScreen.tsx
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx
├── store/              # Redux store and slices
│   ├── authSlice.ts
│   ├── itemsSlice.ts
│   └── index.ts
├── services/           # API services
│   ├── apiService.ts
│   └── authService.ts
├── types/              # TypeScript type definitions
│   ├── api.ts
│   ├── screen.ts
│   └── ui.ts
├── constants/          # App constants
│   ├── colors.ts
│   └── api.ts
├── hooks/              # Custom React hooks
│   └── useToast.ts
├── utils/              # Utility functions
│   └── validation.ts
└── setupTests.ts       # Jest test setup
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

### Development Dependencies
- TypeScript 5.8.3
- Jest 29.6.3
- React Testing Library
- ESLint & Prettier
- React Native CLI

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

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Happy Coding! 🚀**