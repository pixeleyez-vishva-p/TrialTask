module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-skeleton-placeholder|react-native-vector-icons|react-native-toast-message|react-native-linear-gradient|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|@react-native-masked-view|@react-native-async-storage|@reduxjs/toolkit|react-redux)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
