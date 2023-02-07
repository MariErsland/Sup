import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActivityList from '../components/activity';
import Footer from '../shared/Footer';
import { getUser } from '../components/getUser'

interface MyCreatedActivitiesProps {
  navigation: any;
}

interface ActivityData {
    id: number;
    time: number;
    county : string;
    address : string;
    category: string;
    description: string;
    number_of_participants: number;
    created_by: number;
    onPress: () => void;
    navigation: any;
    activities: ActivityData[];
}

const MyCreatedActivities: React.FC<MyCreatedActivitiesProps> = ({ navigation }) => {
  const [activity, setActivity] = useState<ActivityData[] | null>(null);
  
  //Skal endres når ny aktivitet er klar med id
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    getUser().then(userData => {
      setUser(userData);
    });
    }, []);
    console.log(user);
    console.log(user.id);
// skal bort det over... 

  useEffect(() => {
    fetch(`http://152.94.160.72:3000/activity/`)
      .then((response) => response.json())
      .then((data: ActivityData[]) => {
        if (user)
        setActivity(data.filter(activity => activity.created_by === user.id));
      })
      .catch((error) => {
        console.log('Error fetching activity', error);
      });
  }, [user]);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {activity ? <ActivityList activities={activity} navigation={navigation} /> : <Text>.....Ingenting her.....</Text>}
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
