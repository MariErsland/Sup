import React from 'react';

interface FilterContextProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCounties: string[];
  setSelectedCounties: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterContext = React.createContext<FilterContextProps>({
  selectedCategories: [],
  setSelectedCategories: () => {},
  selectedCounties: [],
  setSelectedCounties: () => {},
});






