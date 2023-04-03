import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ActivityList, { ActivityProps } from '../components/activity';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import { FilterContext } from '../helpers/FilterContext';
import { useFeedLogic } from '../screens-logic/FeedLogic';

interface FeedProps {
  navigation: NavigationProp<RootStackParamList, 'Feed'>;
}

const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const {
    isLoggedIn,
    isLoading,
    activities,
    filteredActivities,
    setFilteredActivities,
    pastActivities,
    selectedCategories,
    setSelectedCategories,
    selectedCounties,
    setSelectedCounties,
    handleFetchActivities,
    handleFilterReset,
  } = useFeedLogic();

  useAuth({ isLoggedIn, navigation: navigation });

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await handleFetchActivities();
      };
      getData();
    }, [])
  );

  return (
    <FilterContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        selectedCounties,
        setSelectedCounties,
      }}
    >
      <View style={styles.background}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#EB7B31" />
        ) : (
          <>
            <Filter
              onPress={handleFilterReset}
              activities={activities}
              filteredActivities={filteredActivities}
              setFilteredActivities={setFilteredActivities}
              pastActivities={pastActivities}
            />

            <ScrollView contentContainerStyle={styles.scrollView}>
              {filteredActivities && filteredActivities.length > 0 ? (
                <ActivityList
                  activities={filteredActivities}
                  navigation={navigation}
                  hideCreatedBy={false}
                  isUpcoming={false}
                />
              ) : (
                <Text>Ingen kommende aktiviteter....</Text>
              )}
            </ScrollView>

            <View style={{ flex: 0 }}>
              <Footer />
            </View>
          </>
        )}
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