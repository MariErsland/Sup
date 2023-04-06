import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ActivityList from '../components/activity';
import Footer from '../components/Footer';
import { useMyActivitiesLogic } from '../screens-logic/MyCreatedActivitiesLogic'
import { useIsFocused } from '@react-navigation/native';


interface MyCreatedActivitiesProps {
  navigation: any;
}

const MyCreatedActivitiesScreen: React.FC<MyCreatedActivitiesProps> = ({ navigation }) => {
  const { activities, isLoading, handleMyCreatedActivities } = useMyActivitiesLogic();
  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused) {
      handleMyCreatedActivities();
    }
  }, [isFocused]);
  
  return (
    <View style={styles.background}>
      <View></View>
      <Text style={styles.title}> Aktiviteter laget av meg </Text> 
      <ScrollView contentContainerStyle={styles.scrollView}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#EB7B31" />
        ) : activities && activities.length > 0 ? (
          <ActivityList activities={activities} navigation={navigation} hideCreatedBy={true} />
        ) : (
          <Text> Du har ikke opprettet noen aktiviteter enda... </Text> 
        )}
      </ScrollView>
      <View style={{ flex: 0 }}>
        <Footer/>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center', 
    paddingBottom: 15
  }
});

export default MyCreatedActivitiesScreen;
