import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActivityList from '../components/activity';
import Footer from '../shared/Footer';
import {retrieveToken}  from '../security/token_handling';

interface MyCreatedActivitiesProps {
  navigation: any;
}

const MyCreatedActivities: React.FC<MyCreatedActivitiesProps> = ({ navigation }) => {
  const [activity, setActivity] = useState(null);
  
  const handleMyCreatedActivities = async () => { 
    const myToken = await retrieveToken();
    try {
      const response = await fetch("http://152.94.160.72:3000/activities-by-user", {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      const data = await response.json();
      console.log('Data from server:', data);
      setActivity(data);
    } catch (error) {
      console.log('Error fetching activity', error);
    }
  }
  


useEffect(() => {
  const getData = async () => {
    await handleMyCreatedActivities();
  };
  getData();

  return () => {};
}, []);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {activity ? <ActivityList activities={activity} navigation={navigation} /> : <Text>Du har ikke laget noen aktiviteter enda... </Text>}
      </ScrollView>
      <View style={{ flex: 0 }}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DEE7E6',
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default MyCreatedActivities;
