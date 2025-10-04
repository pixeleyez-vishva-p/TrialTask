/**
 * React Native App with Login and Home Screens
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from './src/common/store';
import { AppNavigator } from './src/navigation/app-navigator';
import { Colors } from './src/constants';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.background}
        />
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
