import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { categories, counties } from '../state/ActivityState';
import activity, { ActivityProps } from './activity';
import { FilterContext } from '../helpers/FilterContext';
import { getUser } from '../services/getUser';
import { retrieveToken } from '../security/token_handling';


interface FilterProps {
  onPress: () => void;
  activities: ActivityProps[];
  filteredActivities: ActivityProps[] | null;
  activityParticipants: any;
  handleParticipantFilter: () => Promise<void>;
  setFilteredActivities: (activities: ActivityProps[] | null) => void;
  pastActivities: ActivityProps[];
}


const Filter = (props: FilterProps) => {
  const { selectedCategories, setSelectedCategories } = useContext(FilterContext);
  const { selectedCounties, setSelectedCounties } = useContext(FilterContext);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [showCounties, setShowCounties] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState<ActivityProps[]>([]);
  const [isParticipantFilterSelected, setIsParticipantFilterSelected] = useState(false); // 
  const [isPastDateSelected, setIsPastDateSelected] = useState(false);
  const [showPastActivities, setShowPastActivities] = useState(false);

  //console.log('showPastActivities', showPastActivities);
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
    //console.log("userid " + user?.user?.id);
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
      //console.log("activities" + activities);
      callback(activities);
      setIsParticipantFilterSelected(true);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleParticipantFilterReset = () => {
    setSelectedCategories([]);
    setSelectedCounties([]);
    setIsParticipantFilterSelected(false);
    setIsPastDateSelected(false);
  };

  const handleParticipantFilterPress = (callback: (activities: ActivityProps[]) => void) => {
    if (isParticipantFilterSelected) {
      handleParticipantFilterReset();
    } else {
      handleParticipantFilter(callback);
    }
  };

  const handlePastActivitiesFilter = () => {
    if (showPastActivities) {
      handleParticipantFilterReset();
    } else {
      props.setFilteredActivities(props.pastActivities);
    }
    setShowPastActivities(prevState => !prevState);
    //console.log("filteredActivities after setFilteredActivities:", props.filteredActivities);
  };
  
  

  return (
    <View>
      <View style={styles.container}>
        
        <View style={styles.categoryContainer}>
        <ScrollView horizontal={true}>
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
              Påmeldte
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePastActivitiesFilter}>
            <Text style={[
              styles.filterText,
              styles.filterButton,
              showPastActivities && styles.filterButtonSelected
            ]}>
              Tidligere aktiviteter
            </Text>
          </TouchableOpacity>
          </ScrollView>
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
