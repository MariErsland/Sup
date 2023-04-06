import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import { useEditLogic } from '../screens-logic/EditLogic';

const Edit = () => {
  const {
    firstName,
    email,
    error,
    saveChanges,
    handleSetFirstName,
  } = useEditLogic();

  if (error === 'No route parameters found') {
    return <View><Text>Test her...</Text></View>;
  }

  const UserButton = require('../assets/user.png');
  const nameMaxLength = 30;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.background, styles.scroll]}>
      <Text style={styles.title}> Rediger din profil </Text> 
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
            <Text style={styles.label}>E-post:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={email}
                  editable={false}
                  style={styles.input}
                />
              </View>
          {error && <Text style={{color: 'red'}}>{error}</Text>}
          </View>

          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={saveChanges}>
                  <Text style={styles.buttonText}> Lagre endringer </Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 25,
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
  scroll: {
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center', 
    paddingBottom: 15
  }
})

export default Edit;
