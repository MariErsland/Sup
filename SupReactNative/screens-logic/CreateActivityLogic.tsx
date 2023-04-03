import { useState } from 'react';
import { useActivityState, categories, counties } from '../state/ActivityState';
import { retrieveToken } from '../security/token_handling';
import { validateInputCharacters, validateInputLength } from '../helpers/inputValiation';
import { useNavigation } from '@react-navigation/native';

export const useCreateActivityLogic = () => {
    const {
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
        title,
        setTitle,
        max_participants,
        setMax_participants,
    } = useActivityState();

    const [number_of_participants] = useState('0');
    const [created_by] = useState('');
    const [error, setError] = useState('');
    const descriptionMaxLength = 500;
    const addressMaxLength = 100;
    const descriptionMinLength = 20;
    const addressMinLength = 10;
    const ParticipantMin = 2; 

    const navigation = useNavigation();

    const handleCreateActivity = async () => {
        if ((!selectedDate) || (!counties) || (!address.trim()) || (!selectedCategory) || (!description.trim()) || (!title) || (!max_participants)) {
            setError("Alle felt må fylles ut")
            return;
        }
        if ((address.length < addressMinLength)) {
            setError("Addressen kan ikke være mindre enn " + addressMinLength + "tegn.")
            return;
        }
        if ((description.length < descriptionMinLength)) {
            setError("Beskrivelsen kan ikke være mindre enn " + descriptionMinLength + "tegn.")
            return;
        }
        const myToken = await retrieveToken();
        console.log(selectedDate, counties, categories);
        console.log(JSON.stringify({ selectedDate, counties, address, categories, description, number_of_participants, created_by, title, max_participants }));
        const response = await fetch('http://152.94.160.72:3000/create-activity', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: selectedDate, county: selectedCounty, address, category: selectedCategory, description, number_of_participants, created_by, title, max_participants }),
        });

        if (!response.ok) {
            console.error('Error creating activity:', response);
            return;
        }
        const data = await response.json();
        console.log('Success:', data);
        navigation.navigate('MyCreatedActivities');
    }

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

    function handletTitleChange(text: string) {
        const errorMessageLength = validateInputLength(text, descriptionMaxLength);
        const errorMessageCharacters = validateInputCharacters(text);
        if (errorMessageCharacters !== '') {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
        }
        else {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
            setTitle(text)
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

    function handleMaxParticipantChange(text: string) {
        if (!isNaN(Number(text))) {
            const numParticipants = Number(text);
            const errorMessageLength = validateInputLength(text, ParticipantMin);
            const errorMessageCharacters = validateInputCharacters(text);
            if (errorMessageCharacters !== '') {
                setError(errorMessageLength + ' ' + errorMessageCharacters)
            }
            else if (numParticipants < ParticipantMin ) {
                setError("Minst antall påmeldte kan ikke være mindre enn 2");
            }
            else {
                setError(errorMessageLength + ' ' + errorMessageCharacters)
                setMax_participants(text)
            }
        }
    }
    
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
        title,
        setTitle,
        max_participants,
        setMax_participants,
        number_of_participants,
        created_by,
        error,
        setError,
        handleCreateActivity,
        handleDescriptionChange,
        handletTitleChange,
        handleAddressChange,
        handleMaxParticipantChange,
    };
};
