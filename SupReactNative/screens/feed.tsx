import React from 'react';
import { View, Text, Button } from 'react-native';

interface FeedscreenProps {
    navigation: any
}

function Feed(props: FeedscreenProps) {
  return (
    <View>
      <Text>This is the feeed, wassupp??</Text>
      <Button title="Min profil" onPress={() => props.navigation.push("Profile")}/>
    </View>
  );
};

export default Feed;