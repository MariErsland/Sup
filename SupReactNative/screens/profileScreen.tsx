import React, { useContext, useEffect, useState, Component } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import { getUser } from '../services/getUser';
import Footer from '../components/Footer';
import { deleteToken, retrieveToken} from '../security/token_handling';
//import { onSignOut } from '../screens/login'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileScreenLogic } from '../screens-logic/ProfileScreenLogic';



interface User {
  id: string;
  first_name: string;
  email: string;
}

const UserButton = require('../assets/user.png');

function ProfileScreen() {

  const {
    data,
    setIsLoggedIn,
    DeleteUser,
    EditUser,
    OnSignOut,
  } = ProfileScreenLogic();



     
  return (
    <View style={styles.background}>
   
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageFrame}>
          <Image style={styles.image} source={UserButton} />
        </View>
      </View>
      <View style={styles.infoContainer}>
     
        {
          data === undefined ?
            <View><Text> Loading... </Text></View> :
           
              data.map((item: User) => (
                <View  key={item.id} >
                  <Text style={styles.infoElement}>{item.first_name}</Text>
                  <Text style={styles.infoElement}>{item.email}</Text>
                </View>
              ))
        }
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => EditUser()}>
                <Text style={styles.buttonText}>Rediger bruker</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={DeleteUser}>
                <Text style={styles.buttonText}>Slett bruker</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={OnSignOut}>
                <Text style={styles.buttonText}>Logg ut</Text>
            </TouchableOpacity>
        </View>
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
    alignItems: 'center',
  },
  infoElement: {
    padding: 5,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%'
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
  }
 


})


export default ProfileScreen;
