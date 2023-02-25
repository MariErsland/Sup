import { useState } from 'react';

export const useActivityState = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  return {
    selectedCategory,
    setSelectedCategory,
    selectedCounty,
    setSelectedCounty,
    selectedDate,
    setSelectedDate,
    address,
    setAddress,
    description,
    setDescription,
    showDatePicker,
    setShowDatePicker,
  };
};

export const categories = [
  { label: 'Friluft', value: 'Tur' },
  { label: 'Trening', value: 'Jogging' },
  { label: 'Matlaging', value: 'Matlaging' },
  { label: 'Annet', value: 'Annet' },
  { label: 'Test', value: 'Test' },
];

export const counties = [
  {label: 'Rogaland', value: 'Rogaland' },
  {label: 'Agder', value: 'Agder' },
  {label:'Innland', value: 'Innland'},
  {label:'Møre og Romsdal', value: 'Møre og Romsdal'},
  {label:'Nordland', value: 'Norland'},
  {label:'Oslo', value: 'Oslo'},
  {label:'Vestfold og Telemark', value: 'Vestfold og Telemark'},
  {label:'Troms og Finnmark', value: 'Troms og Finnmark'},
  {label:'Trøndelag', value: 'Trøndelag'},
  {label:'Vestland', value: 'Vestland'},
  {label:'Viken', value: 'Viken'},
];

