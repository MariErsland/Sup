import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Feed from '../screens/feed';
import ProfileScreen from '../screens/profileScreen';
import Edit from '../screens/Edit';
import NewActivity from '../screens/CreateActivity'
import LoginScreen from '../screens/login';
import { LoginProvider } from '../App';
import DetailsActivity from '../screens/DetailsActivity';
import EditActivity from '../screens/EditActivity';
import MyCreatedActivities from '../screens/MyCreatedActivities';

const Stack = createNativeStackNavigator<RootStackParamList>();

const stackNavigationHome = () => {
    return (
      <LoginProvider>
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#DEE7E6',
            },
            headerTintColor: '#EB7B31',
            headerTitle: '', // set headerTitle to an empty string
            headerShadowVisible: false, // set headerShadowVisible to false
          }}
        >
            <Stack.Screen name='Feed' component={Feed}
            options={{
              headerShown: false, // hide the header on this screen
            }}
          />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Edit' component={Edit} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false}}/>
            <Stack.Screen name= 'NewActivity' component={NewActivity}
              options={{
                headerStyle: {
                  backgroundColor: '#f3f3f3'
            }}}/>
            <Stack.Screen name= 'DetailsActivity' component={DetailsActivity}/>
            <Stack.Screen name= 'EditActivity' component={EditActivity}/>
            <Stack.Screen name= 'MyCreatedActivities' component={MyCreatedActivities}/>
          </Stack.Navigator>
        </NavigationContainer>
      </LoginProvider>
    );
  }
 
  export default stackNavigationHome;