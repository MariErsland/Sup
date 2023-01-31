import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../App';
import { useAuth } from '../auth';
import Footer from '../shared/Footer';



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
    <View style={styles.background}>
        <Button title="Press her for bruker informasjon (test)" onPress={FetchUser}/>
        {
          data.map((item) => {
            return(
              <View key={item.id} style={styles.container}>
                <Text>Id: (skal ikke vise){item.id}</Text>
                <Text>Fornavn: {item.first_name}</Text>
                <Text>Email: {item.email}</Text>

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

              </View>
            )
          })
        }
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

