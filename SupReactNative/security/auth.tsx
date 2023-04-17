import { useEffect } from 'react';

interface Props {
  navigation: any;
  isLoggedIn: boolean;
}

export const useAuth = (props: Props) => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (props.isLoggedIn == false) {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}]
        });
      }
    };
    checkLoggedIn();
  }, [props.navigation, props.isLoggedIn]);
};



