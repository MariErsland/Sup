import React, {useState} from 'react';
import {SafeAreaView, Text, Button, Alert, StyleSheet, View, Image, ImageBackground} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { LoginContext } from '../App';
import { deleteToken, storeToken } from '../token_handling';

GoogleSignin.configure({
  webClientId:
    '793626058046-1vvfcdoglco03l1aitub77m9u8dqbfld.apps.googleusercontent.com',
    
  offlineAccess: false,
});

interface Props {
  isLoggedIn: boolean;
  navigation: any;
  timeoutId: any;
}

const FrontPagePhoto = require('../assets/frontPagePhoto.png');


export const onSignOut = () => {
  GoogleSignin.signOut()
    .then(async () => {
      await deleteToken();
    })
    .catch((err) => {console.log(err)});
};



const LoginScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const {setIsLoggedIn} = useContext(LoginContext);
  let timeoutId = props.timeoutId;

  const startTimeout = () => {
    timeoutId = setTimeout(() => {
      console.log("Request timed out");
      setLoading(false);
      Alert.alert("Could not connect to server. Please try again later2.");
    }, 10 * 1000); //10 seconds
  };

  const onSignIn = () => {
    startTimeout();
    setLoading(true);
    GoogleSignin.hasPlayServices()
      .then(() => {
        return GoogleSignin.signIn();
      })
      .then((response) => {
        //Access token for å verifisere bruker i server
        const accessToken = response.idToken;
        //Sending fetch with access token to server. Fetch will send userToken back 
        fetch('http://152.94.160.72:3000/verify-token', {
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
          clearTimeout(timeoutId);
          return response.json();
        })
        .then(async data => {
          const userToken = data.token;
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
          Alert.alert("Could not connect to server. Please try again later.");
        })
      })
      .catch((err) => {
        console.log(err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={FrontPagePhoto} resizeMode="cover" style={styles.image}>
        <Text style={styles.logo}>SUP!</Text>
        <Text style={styles.description}>SUP lar deg finne aktiviteter med nye venner....</Text>
        {loading ? <Text>Loading...</Text> : <GoogleSigninButton style={styles.googleSigninButton} onPress={onSignIn} />}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  image: {
    flex:1,
    justifyContent: 'center'
  },
  logo: {
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    fontSize: 40,
    fontWeight: 'bold',
    
  },

  description: {
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },

  googleSigninButton: {
    alignSelf: 'center',
    marginBottom: 350,

  }

})




export default LoginScreen;



