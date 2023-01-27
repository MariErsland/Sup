import React, {useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { LoginContext } from './App';
import { useNavigation } from '@react-navigation/native';
import { storeToken, retrieveToken } from './token_handling';

GoogleSignin.configure({
  webClientId:
    '793626058046-1vvfcdoglco03l1aitub77m9u8dqbfld.apps.googleusercontent.com',
  offlineAccess: false,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const {setIsLoggedIn} = useContext(LoginContext);
  const [loading, setLoading] = useState(false);

  const onSignIn = () => {
    setLoading(true);
    GoogleSignin.hasPlayServices()
      .then(() => {
        return GoogleSignin.signIn();
      })
      .then((response) => {
        //Access token for å verifisere bruker i server
        const accessToken = response.idToken;

        //Sending fetch with access token to server. 
        //Fetch will send userToken back which contains userid which is used in the database
        const userToken = fetch('http://152.94.160.72:3000/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
             first_name: response.user.givenName, email: response.user.email
          })
        })
        .then(response => {
          if(!response.ok){
              throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          //const userToken = data.token;
          //storeToken(userToken);
          setIsLoggedIn(true);
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'Feed'}]
          }); 
        })
        .catch(error => {
          console.log("Error: ", error);
          setLoading(false);
          alert("Could not connect to server. Please try again later.");
        })
      })
      .catch((err) => {
        console.log(err);
    });
  };

  const onSignOut = () => {
    GoogleSignin.signOut()
      .then(() => {
        setUserInfo(null);
        setIsLoggedIn(false);
      })
      .catch((err) => {
      });
  };

  return (
    <SafeAreaView>
      {loading ? <Text>Loading...</Text> : <GoogleSigninButton onPress={onSignIn} />}
    </SafeAreaView>
  );
};

export default LoginScreen;