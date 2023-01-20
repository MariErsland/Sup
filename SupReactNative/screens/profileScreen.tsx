import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';

interface ProfileScreen {
  id: number;
  email: string;
  first_name: string;
}

function ProfileScreen() {
  const [data, setData] = useState([{id: 1, first_name: 'Iselin Bjaanes', email: 'Iselin@bjaanes.no'}]);
  
  function FetchUser(){
    fetch("http://152.94.160.72:3000/user/500")
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
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',
          onPress: () => {
            // code to delete the user here
            fetch(`http://152.94.160.72:3000/user/500`, {
              method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
              console.log('Bruker slettet suksess', data);
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

  

  return (
    <View>
        <Text>Profilside</Text>
        <Button title="Press her for bruker informasjon (test)" onPress={FetchUser}/>
        <Button title="Slett bruker" onPress={DeleteUser}/>
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