import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import { ProfileScreenLogic } from '../screens-logic/ProfileScreenLogic';
import { useIsFocused } from '@react-navigation/native';
import { getUser } from '../services/getUser';




interface User {
  id: string;
  first_name: string;
  email: string;
}

const UserButton = require('../assets/user.png');

function ProfileScreen() {

  const {
    data,
    DeleteUser,
    EditUser,
    OnSignOut,
    isLoading,
    setIsLoading,
    setData
  } = ProfileScreenLogic();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused){
      setIsLoading(true)
      const getData = async () => {
        const user = await getUser();
        setData([user.user]);
        setIsLoading(false)
      };
      getData();
    }
  }, [isFocused]);


  return (
    <View style={styles.background}>
   <Text style={styles.title}> Min profil </Text> 
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageFrame}>
          <Image style={styles.image} source={UserButton} />
        </View>
      </View>
      <View style={styles.infoContainer}>
     
        {
          (isLoading || !data ) ?
          (<ActivityIndicator size="large" color="#EB7B31" />) :
           
             ( data.map((item: User) => (
                <View  key={item.id} >
                  <Text style={styles.infoElement}>{item.first_name}</Text>
                  <Text style={styles.infoElement}>{item.email}</Text>
                </View>
              )))
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center', 
    paddingBottom: 15
  }
 


})


export default ProfileScreen;
