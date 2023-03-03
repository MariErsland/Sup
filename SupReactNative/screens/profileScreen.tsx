import React, { useContext, useEffect, useState, Component } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
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
  useAuth({isLoggedIn, navigation});

  //Setting userdata with logged in user
  useEffect(() => {
    const getData = async () => {
      const user = await getUser();
      setData([user.user]);
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
      {
        data === undefined ? 
          <View><Text> Loading... </Text></View> : 
          
            data.map((item: User) => (
              <View key={item.id} >
                <Text>Id: (should not show){item.id}</Text>
                <Text>First name: {item.first_name}</Text>
                <Text>Email: {item.email}</Text>
              </View>
            ))
      }
    
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
},
  buttonText: {
    color: 'white',
    textAlign: 'center',
},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#EB7B31',
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center'

},

})

export default ProfileScreen;



