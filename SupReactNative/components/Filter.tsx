import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { categories, counties } from '../state/ActivityState';
import activity, { ActivityProps } from './activity';
import { FilterContext } from './FilterContext';
import { getUser } from '../components/getUser';
import { retrieveToken } from '../security/token_handling';

interface FilterProps {
  onPress: () => void;
  activities: ActivityProps[];
  filteredActivities: ActivityProps[] | null;
  activityParticipants: any;
  handleParticipantFilter: () => Promise<void>;
  setFilteredActivities: (activities: ActivityProps[] | null) => void;
}


const Filter = (props: FilterProps) => {
  const { selectedCategories, setSelectedCategories } = useContext(FilterContext);
  const { selectedCounties, setSelectedCounties } = useContext(FilterContext);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [showCounties, setShowCounties] = useState(false);
  const [showActivityParticipants, setShowActivityParticipants] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState<ActivityProps[]>([]);
  const [isParticipantFilterSelected, setIsParticipantFilterSelected] = useState(false); // 

  const handleCategoryPress = () => {
    setShowSubCategories(prevState => !prevState);
    setShowCounties(false);
    setSelectedCategories([]);
  };

  const handleCountyPress = () => {
    setShowSubCategories(false);
    setShowCounties(true);
    setSelectedCounties([]);
  };

  const handleFilter = (category: string) => {
    setSelectedCategories(prevSelectedCategories => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter(c => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleCountyFilter = (county: string) => {
    setSelectedCounties(prevSelectedCounties => {
      if (prevSelectedCounties.includes(county)) {
        return prevSelectedCounties.filter(c => c !== county);
      } else {
        return [...prevSelectedCounties, county];
      }
    });
  };

  const handleParticipantFilter = async (callback: (activities: ActivityProps[]) => void) => {
    console.log("er inne i HandleParticipantFilter");
    const user = await getUser();
    console.log("userid " + user?.user?.id);
    try {
      const myToken = retrieveToken();
      const response = await fetch(`http://152.94.160.72:3000/activities-by-participants/${user.user.id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      console.log("Response: ", response);
      if (!response.ok) {
        throw new Error(`Failed to get activity participants ${response.status}.`);
      }
      const activities = await response.json();
      console.log('Activity participants collected successfully', activities);
      console.log("activities" + activities);
      callback(activities);
      setIsParticipantFilterSelected(true); // Set state variable to true when filter is applied
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleParticipantFilterReset = () => {
    setSelectedCategories([]);
    setSelectedCounties([]);
    setIsParticipantFilterSelected(false);
  };

  const handleParticipantFilterPress = (callback: (activities: ActivityProps[]) => void) => {
    if (isParticipantFilterSelected) {
      handleParticipantFilterReset();
    } else {
      handleParticipantFilter(callback);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={handleCategoryPress}>
            <Text style={[
              styles.filterText,
              styles.filterButton,
              selectedCategories.length > 0 && styles.filterButtonSelected
            ]}>
              Kategori
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCountyPress}>
            <Text style={[
              styles.filterText,
              styles.filterButton,
              selectedCounties.length > 0 && styles.filterButtonSelected
            ]}>
              Sted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleParticipantFilterPress(props.setFilteredActivities)}>
            <Text style={[
              styles.filterText,
              styles.filterButton,
              isParticipantFilterSelected && styles.filterButtonSelected
            ]}>
              Påmeldte aktiviteter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showSubCategories && (
        <ScrollView horizontal={true} contentContainerStyle={[styles.subMenu, { marginBottom: 20 }]}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedCategories.includes(category.value) && styles.filterButtonSelected,
              ]}
              onPress={() => handleFilter(category.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategories.includes(category.value) && styles.filterTextSelected,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {showCounties && (
        <ScrollView horizontal={true} contentContainerStyle={[styles.subMenu, { marginBottom: 20 }]}>
          {counties.map((county, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedCounties.includes(county.value) && styles.filterButtonSelected,
              ]}
              onPress={() => handleCountyFilter(county.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCounties.includes(county.value) && styles.filterTextSelected,
                ]}
              >
                {county.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View>
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <Text>{activity.title}</Text>
          ))
        ) : (
          props.activities.map(activity => (
            <Text>{activity.title}</Text>
          ))
        )}
      </View>
    </View>
  );



};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 10,
  },
  subMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#145D6E',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#EB7B31',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterTextSelected: {
    color: '#fff',
  },
});

export default Filter;
