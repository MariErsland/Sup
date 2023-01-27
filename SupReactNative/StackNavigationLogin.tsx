import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types'
import LoginScreen from './login';
import { LoginProvider } from './App';

const Stack = createNativeStackNavigator<RootStackParamList>();

const stackNavigationLogin = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginProvider>
  );
}
  
export default stackNavigationLogin;


  