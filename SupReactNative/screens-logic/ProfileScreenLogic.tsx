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

interface User {
  id: string;
  first_name: string;
  email: string;
}

export const ProfileScreenLogic = () => {

  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState<User[]>([]);
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
  useAuth({isLoggedIn, navigation});

  //Setting userdata with logged in user
  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const user = await getUser();
      setData([user.user]);
      setIsLoading(false)
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


            console.log(myToken)
            fetch(`http://152.94.160.72:3000/user/delete-account`, {
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
              setIsLoggedIn(false);
              await deleteToken();
            })
            .catch(error => {
              console.log('Feil ved sletting av bruker', error);
              if (error.toString().includes('Cannot delete or update a parent row: a foreign key constraint fails')) {
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
    navigation.navigate('Edit', { params: { userId: data[0].id, firstName: data[0].first_name, email: data[0].email } });
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
          fetch(`http://152.94.160.72:3000/auth/log-out`, {
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
            await deleteToken();
            setIsLoggedIn(false);
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
  

  return {
    data,
    setIsLoggedIn,
    DeleteUser,
    EditUser,
    OnSignOut,
    isLoading,
    setIsLoading,
    setData
    };

};