import { useEffect } from 'react';

interface Props {
  isLoggedIn: boolean;
  navigation: any;
}

// Check if user is logged in or not
export const useAuth = (props: Props) => {
  useEffect(() => {
    if (!props.isLoggedIn) {
      console.log('Redirecting to login');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}]
      });
    } 
  }, [props.isLoggedIn, props.navigation]);
};