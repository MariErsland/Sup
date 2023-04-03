import React, {useState} from 'react';
import {SafeAreaView, Text, Button, Alert, StyleSheet, View, Image, ImageBackground} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { LoginContext } from '../App';
import { deleteToken, retrieveToken, storeToken } from '../security/token_handling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginLogic } from '../screens-logic/LoginLogic';

const LogoSup = require('../assets/supLogo.png');
const FrontPagePhoto = require('../assets/frontPagePhoto.png');

interface Props {
  isLoggedIn: boolean;
  navigation: any;
  timeoutId: any;
}

const LoginScreen = (props: Props) => {
  const { loading, onSignIn } = useLoginLogic(props);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={FrontPagePhoto} resizeMode="cover" style={styles.image}>
          <Image source={LogoSup} style={styles.logo} />
        <Text style={styles.description}>SUP lar deg finne aktiviteter med nye venner....</Text>
        {loading ? <Text>Loading...</Text> : <GoogleSigninButton style={styles.googleSigninButton} onPress={onSignIn} />}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    marginVertical: 'auto',
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
});

export default LoginScreen;
