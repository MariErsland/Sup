import React, { useContext, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import Footer from '../shared/Footer';
import { retrieveToken } from '../security/token_handling';
import { validateInputCharacters, validateInputLength } from '../components/inputValiation';

const Edit = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const {isLoggedIn} = useContext(LoginContext);
  useAuth({isLoggedIn, navigation});
  const [error, setError] = useState('');
  const nameMaxLength = 30;
  const MIN_LENGHT_FIRST_NAME = 2;

  
  if(!route.params) return <View><Text>Test her...</Text></View>
  console.log('route.params:', route.params);
  const userId: any = route.params.params.userId;
  console.log('userId', userId);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  async function saveChanges() {
    if ((!firstName.trim()) || (firstName.length < MIN_LENGHT_FIRST_NAME)) {
      console.log("selected name: ", firstName);
      console.log("All input field must be filled out");
      setError("All input field must be filled out and must be at least " + MIN_LENGHT_FIRST_NAME)
      return;
  }
    const myToken = await retrieveToken();
    try {
      const response = await fetch(`http://152.94.160.72:3000/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
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

  function handleSetFirstName(text: string ){
    const errorMessageLength = validateInputLength(text, nameMaxLength);
    const errorMessageCharacters = validateInputCharacters(text);
    if (errorMessageCharacters !== '')
    {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
    }
    else {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
        setFirstName(text)
    }
}

  return (
    <View style={styles.background}>
      <View style={styles.container}>
      <Text>Navn: {email}</Text>
      <TextInput
        placeholder="Fornavn"
        onChangeText={text => handleSetFirstName(text)}
        value={firstName}
        maxLength={(nameMaxLength+1)}
      />
      
      <Text>Email: {email}</Text>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={saveChanges}>
                        <Text style={styles.buttonText}>Lagre endringer</Text>
                    </TouchableOpacity>
                </View>
      </View>
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DEE7E6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    width: '90%',
    height: '70%',
},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
},
  buttonText: {
    color: 'white',
    textAlign: 'center',
},
  buttonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: '30%',
    backgroundColor: '#EB7B31',
    borderRadius: 10,
},
})

export default Edit;
