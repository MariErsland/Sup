import { createContext } from 'react';

interface FilterContextType {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;

  selectedCounties: string[];
  setSelectedCounties: (counties: string[]) => void;

 
}


export const FilterContext = createContext<FilterContextType>({
  selectedCategories: [],
  setSelectedCategories: (categories: string[]) => {},

  selectedCounties: [],
  setSelectedCounties: (counties: string[]) => {},

});





