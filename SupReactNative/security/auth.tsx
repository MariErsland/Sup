import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

interface Props {
  isLoggedIn: boolean;
  navigation: any;
}

// Check if user is logged in or not
/*export const useAuth = (props: Props) => {
  useEffect(() => {
    const value = await AsyncStorage.getItem('isLoggedIn');
    console.log("Value: ", value);
    if (!props.isLoggedIn || !value) {
      console.log("Redirecting to login.. ")
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}]
      });
    }
  }, [props.isLoggedIn, props.navigation]);
};*/

export const useAuth = (props: Props) => {
  useEffect(() => {
    
    const checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('isLoggedIn');
      console.log("In auth. Value of async: ", value, " Value of isLoggedIn: ", props.isLoggedIn);
      console.log("Value: ", value);
      if ((props.isLoggedIn == false) && (value == 'false')) {
        console.log("Redirecting to login.. ")
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}]
        });
      }
    };
    checkLoggedIn();
  }, [props.isLoggedIn, props.navigation]);
};



