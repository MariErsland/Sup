import { createContext } from 'react';

interface FilterContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const FilterContext = createContext<FilterContextType>({
  selectedCategory: '',
  setSelectedCategory: (category: string) => {},
});
