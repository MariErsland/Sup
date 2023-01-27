import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../App';
import { useAuth } from '../auth';



interface ProfileScreen {
  id: number;
  email: string;
  first_name: string;
}

function ProfileScreen() {

  const navigation = useNavigation();
  const [data, setData] = useState([{id: 1, first_name: 'Iselin Bjaanes', email: 'Iselin@bjaanes.no'}]);
  const {isLoggedIn} = useContext(LoginContext);
  useAuth({isLoggedIn, navigation});

  
  
  function FetchUser(){
    fetch("http://152.94.160.72:3000/user/505")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setData([data]);
    }).catch((error)=>{
      console.log('Error fetching data', error);
    })
  }

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
          onPress: () => {
            fetch(`http://152.94.160.72:3000/user/500`, {
              method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
              console.log('Bruker slettet = suksess', data);
            })
            .catch(error => {
              console.log('Feil ved sletting av bruker', error);
            });
          },
        },
      ],
      { cancelable: false },
    );
  }

  function EditUser() {
    console.log('userId before nav', data[0].id);
    navigation.navigate('Edit', { params: { userId: data[0].id } });
}


    
  return (
    <View>
        <Text>Profilside</Text>
        <Button title="Press her for bruker informasjon (test)" onPress={FetchUser}/>
        <Button title="Slett bruker" onPress={DeleteUser}/>
        <Button title="Rediger bruker" onPress={() => EditUser()}/>


        {
          data.map((item) => {
            return(
              <View key={item.id}>
                <Text>Id: {item.id}</Text>
                <Text>First Name: {item.first_name}</Text>
                <Text>Email: {item.email}</Text>
              </View>
            )
          })
        }
    </View>
  );
};
export default ProfileScreen;

