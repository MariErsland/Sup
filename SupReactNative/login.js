import React, { useEffect } from 'react';
import { View } from 'react-native';
import GoogleSignin from 'react-native-google-signin';

const LoginScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '678861880955-v3t20enq0fbkttjdqj7mf05s41ch5tu6.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default LoginScreen;