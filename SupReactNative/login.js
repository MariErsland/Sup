import React, {useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { LoginContext } from './App';
import { useNavigation } from '@react-navigation/native';


GoogleSignin.configure({
  webClientId:
    '793626058046-1vvfcdoglco03l1aitub77m9u8dqbfld.apps.googleusercontent.com',
  offlineAccess: false,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const {setIsLoggedIn} = useContext(LoginContext);

  const onSignIn = () => {
    
    GoogleSignin.hasPlayServices()
      .then(() => {
        return GoogleSignin.signIn();
      })
      .then((response) => {
        setUserInfo(response);
        setIsLoggedIn(true);
        navigation.reset({
          index: 0,
          routes: [{name: 'Feed'}]
        }); 
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
        <Text> 
        {userInfo ? (
          <>
            <Text>
              Hello  {`${userInfo.user.givenName} ${userInfo.user.familiName}`}
            </Text>
            <></>
            <Button title="Sign out" onPress={onSignOut} />
          </>
        ) : (
          <GoogleSigninButton onPress={onSignIn} />
        )}
        </Text>
      </SafeAreaView>
  );
};

export default LoginScreen;