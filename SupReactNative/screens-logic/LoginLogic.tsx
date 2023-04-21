import {useState} from 'react';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { LoginContext } from '../App';
import { storeToken } from '../security/token_handling';

GoogleSignin.configure({
    webClientId:
      '793626058046-1vvfcdoglco03l1aitub77m9u8dqbfld.apps.googleusercontent.com',
     
    offlineAccess: false,
  });

  export const onSignOut = async () => {
    await GoogleSignin.signOut()
  };

export const useLoginLogic = (props: any) => {
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(LoginContext);

  const onSignIn = () => {
    setLoading(true);
    GoogleSignin.hasPlayServices()
      .then(() => {
        return GoogleSignin.signIn();
      })
      .then(async (response) => {
        const accessToken = response.idToken;
        //Sending fetch with access token to server. Fetch will send userToken back
        fetch('http://152.94.160.72:3000/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
             first_name: response.user.givenName, email: response.user.email
          }),
        })
        .then(response => {
          if(!response.ok){
              throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(async data => {
          let userToken = data.token;
          await storeToken(userToken);
          setIsLoggedIn(true);
          setLoading(false);
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Feed'}]
          });
        })
        .catch(error => {
          console.log("Error: ", error);
          setLoading(false);
          Alert.alert("Something went wrong in communicating with server. Please try again later.");
        })
      })
      .catch((err) => {
        console.log(err);
    });
  };

  return {
    loading,
    onSignIn,
  };
};




