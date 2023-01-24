import React, { useContext, useEffect, useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';
import { LoginContext } from '../App';

const Edit = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const {isLoggedIn} = useContext(LoginContext);
  
  useEffect(() => {
    if (!isLoggedIn) {
        navigation.navigate("Login");
    } 
  }, [isLoggedIn, navigation]);

  
  if(!route.params) return <View><Text>Test her...</Text></View>
  console.log('route.params:', route.params);
  const userId: any = route.params.params.userId;
  console.log('userId', userId);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  async function saveChanges() {
    console.log("kommer her");
    try {
      const response = await fetch(`http://152.94.160.72:3000/user/505`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ first_name: firstName, email: email })
      });
      const data = await response.json();
      console.log('User updated successfully', data);
      navigation.navigate('Profile', {params: {user: data}});


    } catch (error) {
      console.log('Error updating user', error);
    }
  }

  return (
    <View>
      <Text>Edit User {userId} hallo</Text>
      <TextInput
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Button title="Save Changes" onPress={saveChanges}/>
    </View>
  );
};

export default Edit;
