import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { retrieveToken } from '../security/token_handling';
import { formatDate } from '../components/formatDate';
import { validateInputCharacters, validateInputLength } from '../components/inputValiation';
import { counties, useActivityState } from '../state/ActivityState';

interface EditActivityLogicProps {
  activity: any;
  onActivityUpdated: () => void;
}

export const useEditActivityLogic = ({
  activity,
  onActivityUpdated,
}: EditActivityLogicProps) => {
  const [selectedDate, setSelectedDate] = useState(activity.time);
  const {
    selectedCategory,
    setSelectedCategory,
    selectedCounty,
    setSelectedCounty,
    showDatePicker,
    setShowDatePicker,
  } = useActivityState();
  
  const [error, setError] = useState('');
  const descriptionMaxLength = 500;
  const addressMaxLength = 100;
  const descriptionMinLength = 20;
  const addressMinLength = 10;

  // To get this value prefilled I set the value locally here
  const [max_participants, setMax_participants] = useState(
    activity.max_participants.toString(),
  );
  const [description, setDescription] = useState(activity.description);
  const [address, setAddress] = useState(activity.address);
  const [title, setTitle] = useState(activity.title);
  const navigation = useNavigation();

  const handleEditActivity = async () => {
    if ((!selectedDate) || (!counties) || (!address.trim()) || (!selectedCategory) || (!description.trim())  || (!title)) {
        setError("Du må fylle ut alle felt")
        return;
    }
    if ((address.length < addressMinLength)) {
        console.log("Adressen kan ikke være mindre en ", addressMinLength, "tegn.")
        setError("Adressen kan ikke være mindre en " + addressMinLength + "tegn.")
        return;
    }
    if ((description.length < descriptionMinLength)) {
        console.log("Beskrivelsen kan ikke være mindre en ", descriptionMinLength, "tegn.")
        setError("Beskrivelsen kan ikke være mindre en " + descriptionMinLength + "tegn.")
        return;

    }
    try {
        const myToken = await retrieveToken();
        console.log('description: ', title);
        console.log('max_part: ', max_participants);
        const response = await fetch(`http://152.94.160.72:3000/activity/${activity.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify({
                time: selectedDate,
                category: selectedCategory,
                county: selectedCounty,
                address: address,
                description: description,
                title: title,
                max_participants: max_participants,

            }),
        });
        if (!response.ok) {
            console.log('tittel her', title)
            throw new Error(`Failed to update activity ${response.status}.`);
        }
        const data = await response.json();
        console.log('Activity updated successfully', data);
        navigation.navigate('Feed', {});

    } catch (error) {
        console.error('Error updating activity:', error);
    }
};

function handleDescriptionChange(text: string) {
    const errorMessageLength = validateInputLength(text, descriptionMaxLength);
    const errorMessageCharacters = validateInputCharacters(text);
    if (errorMessageCharacters !== '') {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
    }
    else {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
        setDescription(text)
    }

}
function handleAddressChange(text: string) {
    const errorMessageLength = validateInputLength(text, addressMaxLength);
    const errorMessageCharacters = validateInputCharacters(text);
    if (errorMessageCharacters !== '') {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
    }
    else {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
        setAddress(text)
    }
}

function handleTitleChange(text: string) {
    const errorMessageLength = validateInputLength(text, addressMaxLength);
    const errorMessageCharacters = validateInputCharacters(text);
    if (errorMessageCharacters !== '') {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
    }
    else {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
        setTitle(text)
    }
};

return {
    selectedDate,
    setSelectedDate,
    setSelectedCounty,
    setSelectedCategory,
    showDatePicker,
    setShowDatePicker,
    address,
    setAddress,
    handleAddressChange,
    description,
    setDescription,
    handleDescriptionChange,
    title,
    setTitle,
    handleTitleChange,
    max_participants,
    setMax_participants,
    error,
    setError,
    handleEditActivity,
  };
};
