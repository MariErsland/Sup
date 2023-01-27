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
      props.navigation.navigate("Login");
    } 
  }, [props.isLoggedIn, props.navigation]);
};