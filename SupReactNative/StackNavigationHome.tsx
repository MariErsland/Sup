import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import Feed from './screens/feed';
import ProfileScreen from './screens/profileScreen';
import Edit from './screens/Edit';
import NewActivity from './screens/CreateActivity'
import LoginScreen from './login';
import { LoginProvider } from './App';


const Stack = createNativeStackNavigator<RootStackParamList>();

const stackNavigationHome = () => {
    return (
      <LoginProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Feed' component={Feed} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Edit' component={Edit} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name= 'NewActivity' component={NewActivity}/>
          </Stack.Navigator>
        </NavigationContainer>
      </LoginProvider>
    );
  }
  
  export default stackNavigationHome;