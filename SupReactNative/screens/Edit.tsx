import React, { useContext, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
  const UserButton = require('../assets/user.png');

  
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
      <View style={styles.imageContainer}>
        <View style={styles.imageFrame}>
          <Image style={styles.image} source={UserButton} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}> Navn: </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={firstName}
            onChangeText={text => handleSetFirstName(text)}
            value={firstName}
            maxLength={(nameMaxLength+1)}
            style={styles.input}
          />
        </View>
      <Text style={styles.label}>{email}</Text>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      </View>

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
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 90,
    borderRadius: 10,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    height: '40%',
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start' ,
  },
  buttonContainer: {
    marginVertical: 10,
    backgroundColor: '#EB7B31',
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    height: 40,
  },
    buttonText: {
      color: 'white',
      textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFrame: {
    borderWidth: 2, 
    borderColor: 'grey',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
  image: {
    width: 50, 
    height: 55,
  },
  inputContainer: {
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'grey',
    width: '100%',
    height: 40
  },
  input: {
    fontSize: 16,
    color: 'grey'
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default Edit;
