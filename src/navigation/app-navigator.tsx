import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector, useAppDispatch } from '../common/store/hooks';
import {
  selectIsAuthenticated,
  selectIsLoading,
  checkAuthState,
} from '../lib/redux';
import { LoginScreen, HomeScreen, DetailScreen } from '../screens';
import { SplashScreen } from '../views/app/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    // Check for existing session on app start
    const checkSession = async () => {
      await dispatch(checkAuthState());
    };
    checkSession();
  }, [dispatch]);

  // Show splash screen while checking authentication state
  if (isLoading) {
    return <SplashScreen message='Checking authentication...' />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          // User is logged in, show authenticated screens
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen
              name='Detail'
              component={DetailScreen}
              options={{
                headerShown: true,
                title: 'Feed Details',
                headerStyle: {
                  backgroundColor: '#f8f9fa',
                },
                headerTintColor: '#333',
              }}
            />
          </>
        ) : (
          // User is not logged in, show Login screen
          <Stack.Screen name='Login' component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
