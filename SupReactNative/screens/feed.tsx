import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';
import { LoginContext } from '../App';
import { useAuth } from '../auth';

interface FeedscreenProps {
    navigation: any
}

function Feed(props: FeedscreenProps) {
  
  const {isLoggedIn} = useContext(LoginContext);
  useAuth({isLoggedIn, navigation: props.navigation});
  /*useEffect(() => {
    if (!isLoggedIn) {
        props.navigation.navigate("Login");
    } 
  }, [isLoggedIn, props.navigation]);*/

  return (
    <View>
      <Text>This is the feeed, wassupp??</Text>
      <Button title="Min profil" onPress={() => props.navigation.push("Profile")}/>
    </View>
  );
};

export default Feed;



