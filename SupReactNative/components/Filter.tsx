import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { categories } from '../state/ActivityState';
import { FilterContext } from './FilterContext';

const Filter = (props: { onPress: () => void; }) => {
const { selectedCategory, setSelectedCategory } = useContext(FilterContext);
const [showCategories, setShowCategories] = useState(false);

const handleCategoryPress = () => {
  setShowCategories((prevState) => !prevState);
  setSelectedCategory('');
};

  const handleFilter = (category: string) => {
    console.log('running handleFilter');
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
    props.onPress();
  };
  
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={handleCategoryPress}>
          <Text style={[styles.filterText, styles.filterButton, selectedCategory === 'Kategori' && styles.filterButtonSelected]}>
            Kategori
          </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.filterText, styles.filterButton, selectedCategory === 'Sted' && styles.filterButtonSelected]}>Sted</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.filterText, styles.filterButton]}>Dato</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
                selectedCategory === category.value && styles.filterButtonSelected,
              ]}
              onPress={() => handleFilter(category.value)} 
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category.value && styles.filterTextSelected,
                ]}
              >
                {category.label}
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
