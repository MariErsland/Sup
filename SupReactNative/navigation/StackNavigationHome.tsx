import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Feed from '../screens/Feed';
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
          <Stack.Navigator>
            <Stack.Screen name='Feed' component={Feed} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Edit' component={Edit} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name= 'NewActivity' component={NewActivity}/>
            <Stack.Screen name= 'DetailsActivity' component={DetailsActivity}/>
            <Stack.Screen name= 'EditActivity' component={EditActivity}/>
            <Stack.Screen name= 'MyCreatedActivities' component={MyCreatedActivities}/>
          </Stack.Navigator>
        </NavigationContainer>
      </LoginProvider>
    );
  }
  
  export default stackNavigationHome;