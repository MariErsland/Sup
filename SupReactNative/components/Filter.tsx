import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { categories, counties } from '../state/ActivityState';
import { ActivityProps } from './activity';
import { FilterContext } from './FilterContext';

const Filter = (
  props: { onPress: () => void; activities: ActivityProps[]; }
) => {
  const { selectedCategories, setSelectedCategories } = useContext(FilterContext);
  const { selectedCounties = [], setSelectedCounties } = useContext(FilterContext);
  const [showCategories, setShowCategories] = useState(false);
  const [showCounties, setShowCounties] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState<ActivityProps[]>([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [isCountySelected, setIsCountySelected] = useState(false);


  const handleCategoryPress = () => {
    setShowCategories((prevState) => !prevState);
    setShowCounties(false);
    setIsCategorySelected((prevState) => !prevState);
    setIsCountySelected(false);
    setSelectedCategories([]);
  };
  
  const handleCountyPress = () => {
    setShowCounties((prevState) => !prevState);
    setShowCategories(false);
    setIsCountySelected((prevState) => !prevState);
    setIsCategorySelected(false);
    setSelectedCounties([]);
  };
  
  const handleFilter = (category: string) => {
    if (selectedCategories && selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const handleCountyFilter = (county: string) => {
    if (selectedCounties.includes(county)) {
      setSelectedCounties(selectedCounties.filter(c => c !== county));
    } else {
      setSelectedCounties([...selectedCounties, county]);
    }
  };
  

  
  const handleSearch = () => {
    const filtered = props.activities.filter((activity: ActivityProps) =>
      selectedCategories.some((category: string) => activity.category === category) &&
      (!selectedCounties.length || selectedCounties.includes(activity.county))
    );
    setFilteredActivities(filtered);
    props.onPress();
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={handleCategoryPress}>
            <Text style={[
              styles.filterText, 
              styles.filterButton, 
              isCategorySelected && styles.filterButtonSelected
            ]}>
              Kategori
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCountyPress}>
            <Text style={[
              styles.filterText, 
              styles.filterButton, 
              isCountySelected && styles.filterButtonSelected
            ]}>
              Sted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.filterText, styles.filterButton]}>Dato</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}>
            <Text style={[styles.filterText, styles.filterButton]}>Søk:    </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showCategories && (
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
        {filteredActivities.map(activity => (
          <Text>{activity.title}</Text>
        ))}
      </View>
    </View>
  );

};

  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems:   'center',
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
