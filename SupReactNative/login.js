import React, {useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '793626058046-1vvfcdoglco03l1aitub77m9u8dqbfld.apps.googleusercontent.com',
  offlineAccess: false,
});

const Login = () => {

  const [userInfo, setUserInfo] = useState(null);

  const onSignIn = () => {
    GoogleSignin.hasPlayServices()
      .then(() => {
        return GoogleSignin.signIn();
      })
      .then((response) => {
        setUserInfo(response);
      })
      .catch((err) => {
        console.log(err);
    });
  };

  const onSignOut = () => {
    GoogleSignin.signOut()
      .then(() => {
        setUserInfo(null);
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
              Hello  {`${userInfo.user.givenName} ${userInfo.user.familyName}`}
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

export default Login;