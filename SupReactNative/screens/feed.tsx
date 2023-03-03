import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ActivityList, { ActivityProps } from '../components/activity';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import Footer from '../shared/Footer';
import { retrieveToken } from '../security/token_handling';
import { categories } from '../state/ActivityState';
import Filter from '../components/Filter';
import { FilterContext } from '../components/FilterContext';

interface FeedProps {
  navigation: NavigationProp<RootStackParamList, 'Feed'>;
}
  

const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  useAuth({isLoggedIn, navigation: navigation});
  console.log('Is logged in in feed: ', isLoggedIn);
  //const [activity, setActivity] = useState(null);


  const [activities, setActivities] = useState<ActivityProps[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityProps[] | null>(null);

  const handleFetchActivities = async () => {
    const myToken = await retrieveToken();
    await fetch(`http://152.94.160.72:3000/activities/`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('json' + JSON.stringify(data)) // add this console.log statement.. ?
        setActivities(data);
        setFilteredActivities(data); // set filtered activities to all activities initially
      })
      .catch((error) => {
        console.log('Error fetching activity', error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      await handleFetchActivities();
    };
    getData();
  }, []);

  useEffect(() => {
    let filtered = activities;
    if (selectedCategories.length) {
      filtered = filtered.filter((activity: ActivityProps) =>
        selectedCategories.some((category: string) => activity.category === category)
      );
    }
    if (selectedCounties.length) {
      filtered = filtered.filter((activity: ActivityProps) =>
        selectedCounties.includes(activity.county)
      );
    }
    setFilteredActivities(filtered);
  }, [selectedCategories, selectedCounties, activities]);

  const handleFilterReset = () => {
    setSelectedCategories([]);
    setSelectedCounties([]);
    setFilteredActivities(activities);
  };
  

  return (
    <FilterContext.Provider value={{ selectedCategories, setSelectedCategories, selectedCounties, setSelectedCounties }}>
      <View style={styles.background}>
        <Filter onPress={handleFilterReset} activities={activities} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredActivities ? (
            <ActivityList
              activities={filteredActivities}
              navigation={navigation}
              hideCreatedBy={false}
              isUpcoming={false}
            />
          ) : (
            <ActivityList
              activities={[]}
              navigation={navigation}
              hideCreatedBy={false}
              isUpcoming={false}
            />
          )}
        </ScrollView>
        <View style={{ flex: 0 }}>
          <Footer />
        </View>
      </View>
    </FilterContext.Provider>
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

export default Feed;