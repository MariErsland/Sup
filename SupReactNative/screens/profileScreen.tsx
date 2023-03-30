import React, { useContext, useEffect, useState, Component } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import { getUser } from '../components/getUser';
import Footer from '../shared/Footer';
import { deleteToken, retrieveToken} from '../security/token_handling';
import { onSignOut } from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  first_name: string;
  email: string;
}

function ProfileScreen() {

  const navigation = useNavigation();
  const [data, setData] = useState<User[]>([]);
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
  const UserButton = require('../assets/user.png');
  useAuth({isLoggedIn, navigation});
  const [isLoading, setIsLoading] = useState(true);


  //Setting userdata with logged in user
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const user = await getUser();
      setData([user.user]);
      setIsLoading(false);
    };
    getData();
    
  }, []);
    
  function DeleteUser() {
    Alert.alert(
      'Slett profilen min',
      'Er du helt sikker på at du vil slette brukeren din?',
      [
        {
          text: 'Avbryt',
          style: 'cancel',
        },
        {
          text: 'Slett bruker',
          onPress: async () => {
            const myToken = await retrieveToken();
            fetch(`http://152.94.160.72:3000/delete-account`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${myToken}`,
              },
            })
            .then(response => {
              if (response.status === 500) {
                return response.json().then(error => {
                  throw new Error(JSON.stringify(error.message.message));
                });
              }
              return response.json();
            })
            .then(async data => {
              console.log('Bruker slettet = suksess', data);
              AsyncStorage.setItem('isLoggedIn', 'false');
              setIsLoggedIn(false);
              await deleteToken();
            })
            .catch(error => {
              console.log('Feil ved sletting av bruker', error);
              
              if (error.toString().includes('Cannot delete or update a parent row: a foreign key constraint fails')) {
                console.log("User has stuff attached to it, for example an activity");
                Alert.alert(
                  'Sorry',
                  'Delete all your activities before deleting your user',
                  [{ text: 'OK' }]
                );
              } 
              })
          },
        },
      ],
      { cancelable: false },
    );
  }

  function EditUser() {
    console.log("User: ", data[0]);
    navigation.navigate('Edit', { params: { userId: data[0].id } });
}

function test(){
  fetch(`https://supapp.info/test`)
  .then(response => {
    if (response.ok){
      console.log("Response ok!")
      console.log("Response", response);
    } else {
      console.log("Response no ok :", response )
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
 
}

function OnSignOut() {
  Alert.alert(
    'Logg av',
    'Er du helt sikker på at du vil logge av brukeren din?',
    [
      {
        text: 'Avbryt',
        style: 'cancel',
      },
      {
        text: 'Logg av',
        onPress: async () => {
          const myToken = await retrieveToken();
          fetch(`http://152.94.160.72:3000/log-out`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          })
          .then(response => {
            if (response.status === 500) {
              return response.json().then(error => {
                throw new Error(JSON.stringify(error.message.message));
              });
            }
            return response.json();
          })
          .then(async data => {
            console.log('Bruker logget av  = suksess', data);
            AsyncStorage.setItem('isLoggedIn', 'false');
            await deleteToken();
            setIsLoggedIn(false);
            console.log("Ferdig logget av");
            navigation.navigate('Feed', {});
          })
          .catch(error => {
            console.log('Feil ved logging av bruker', error);
            
            if (error.toString().includes('Cannot delete or update a parent row: a foreign key constraint fails')) {
              console.log("User has stuff attached to it, for example an activity");
              Alert.alert(
                'Sorry',
                'Delete all your activities before deleting your user',
                [{ text: 'OK' }]
              );
            } 
            })
        },
      },
    ],
    { cancelable: false },
  );
}

  async function handleOnSignOut(){
    const {setIsLoggedIn} = useContext(LoginContext);
      const myToken = await retrieveToken();
      console.log("Retrieved token", myToken);
      
      await fetch(`http://152.94.160.72:3000/log-out`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then(response => response.json())
      .then(async data => {
        console.log('Bruker logget ut = suksess', data);
      })
      .catch(error => {
        console.log('Feil ved logging ut av bruker', error);
      });
      await onSignOut();
      AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
      await deleteToken();
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
      
        {data === undefined || isLoading ? (
            <ActivityIndicator size="large" color="#EB7B31" />

            ) : (
            

              data.map((item: User) => (
                <View  key={item.id} >
                  <Text style={styles.infoElement}>{item.first_name}</Text>
                  <Text style={styles.infoElement}>{item.email}</Text>
                </View>
              ))
        
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => EditUser()}>
                <Text style={styles.buttonText}>Rediger bruker</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={test}>
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



