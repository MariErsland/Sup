import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ActivityList from '../components/activity';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import Footer from '../shared/Footer';
import { retrieveToken } from '../security/token_handling';
import { useActivityState } from '../state/ActivityState';
import Filter from '../components/Filter';
import { FilterContext } from '../components/FilterContext';


interface FeedProps {
  navigation: NavigationProp<RootStackParamList, 'Feed'>;
}

const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const { selectedCategory, setSelectedCategory } = useActivityState();
  useAuth({ isLoggedIn, navigation: navigation });

  const [activities, setActivities] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState(null);

  const handleFetchActivities = async () => {
    console.log('Getting token from retrieve token');
    const myToken = await retrieveToken();
    console.log('Handle Fetch act');
    await fetch(`http://152.94.160.72:3000/activities/`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Setting data in feed');
        setActivities(data);
        setFilteredActivities(data); // set filtered activities to all activities initially
        console.log('data: ', data);
      })
      .catch((error) => {
        console.log('Error fetching activity', error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      console.log('About to fetch act');
      await handleFetchActivities();
    };
    getData();
  }, []);

  const handleSetSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter(
        (activity: { category: string }) => activity.category === selectedCategory
      );
      setFilteredActivities(filtered);
    }
  }, [selectedCategory, activities]);

  return (
    <FilterContext.Provider
      value={{ selectedCategory, setSelectedCategory: handleSetSelectedCategory }}
    >
      <View style={styles.background}>
        <Filter onPress={() => setFilteredActivities(activities)} handleFilter={handleSetSelectedCategory} selectedCategory={selectedCategory} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredActivities ? (
            <ActivityList
              activities={filteredActivities}
              navigation={navigation}
              hideCreatedBy={false}
              isUpcoming={false}
            />
          ) : (
            <ActivityList activities={[]} navigation={navigation} hideCreatedBy={false} isUpcoming={false} />
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

