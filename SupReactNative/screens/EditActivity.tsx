import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { useActivityState, categories, counties } from '../state/ActivityState';
import { retrieveToken } from '../security/token_handling';
import { formatDate } from '../components/formatDate';
import { validateInputCharacters, validateInputLength } from '../components/inputValiation';

interface EditActivityProps {
    route: {
        params: {
            activity: any;
        }
    }

    id: number,
    time: string,
    county: string,
    address: string,
    category: string,
    description: string,
    number_of_participants: number,
    created_by: string,
    title: string,
    max_participants: number,
}

const EditActivity: React.FC<EditActivityProps> = ({ route }) => {
    const { activity } = route.params;
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

    useEffect(() => {
        setSelectedDate(formatDate(selectedDate));
        setSelectedCounty(activity.county)
        setSelectedCategory(activity.category)
    }, []);

    // To get this value prefilled I set the value locally here
 
    const [max_participants, setMax_participants] = useState(activity.max_participants);
    console.log("maks participant", activity.max_participants);
    console.log('participants', activity.number_of_participants);
    const [numberOfParticipants, setNumberOfParticipants] = useState(activity.number_of_participants);

    const [description, setDescription] = useState(activity.description);
    const [address, setAddress] = useState(activity.address);
    const [title, setTitle] = useState(activity.title);

    const navigation = useNavigation();

    console.log("ID=" + activity.id);
    console.log("selectedCategory:" + selectedCategory);

    const handleEditActivity = async () => {
        if ((!selectedDate) || (!counties) || (!address.trim()) || (!selectedCategory) || (!description.trim())){
            console.log("selected date: ", selectedDate);
            console.log("selected county: ", selectedCounty);
            console.log("selected address: ", address);
            console.log("selected categories: ", selectedCategory);
            console.log("selected description: ", description);
            console.log("selected title: ", title);
            console.log("All input field must be filled out");
            return;
        }
        if ((address.length < addressMinLength)){
            console.log("Address cant be less that ", addressMinLength, "characters.")
            setError("Address cant be less that " + addressMinLength + "characters.")
            return;
        }
        if ((description.length < descriptionMinLength)){
            console.log("Description cant be less that ", descriptionMinLength, "characters.")
            setError("Description cant be less that " + descriptionMinLength + "characters.")
            return;
        
        }
        try {
            const myToken = await retrieveToken();
            console.log('description: ',title);
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
                console.log('tittel her',title)
                throw new Error(`Failed to update activity. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity updated successfully', data);
            navigation.navigate('Feed', {});

        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    function handleDescriptionChange(text: string ){
        const errorMessageLength = validateInputLength(text, descriptionMaxLength);
        const errorMessageCharacters = validateInputCharacters(text);
        if (errorMessageCharacters !== '')
        {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
        }
        else {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
            setDescription(text)
        }
        
    }
    function handleAddressChange(text: string ){
        const errorMessageLength = validateInputLength(text, addressMaxLength);
        const errorMessageCharacters = validateInputCharacters(text);
        if (errorMessageCharacters !== '')
        {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
        }
        else {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
            setAddress(text)
        }
    }

    function handleTitleChange(text: string ){
        const errorMessageLength = validateInputLength(text, addressMaxLength);
        const errorMessageCharacters = validateInputCharacters(text);
        if (errorMessageCharacters !== '')
        {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
        }
        else {
            setError(errorMessageLength + ' ' + errorMessageCharacters)
            setTitle(text)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.background, styles.scroll]}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text style={styles.label}>Dato og tidspunkt</Text>
                        <Text>
                            {selectedDate}
                        </Text>
                        {showDatePicker && (
                            <DatePicker
                                selected={selectedDate}
                                onSelectedChange={setSelectedDate}
                            />
                        )}
                    </TouchableOpacity>

                    <Text></Text>

                    <SelectList
                        setSelected={setSelectedCategory}
                        data={categories}
                        save="value"
                        placeholder={activity.category}
                        defaultOption={activity.category ? activity.category : ''}
                    />
                    <Text></Text>

                    <SelectList
                        setSelected={setSelectedCounty}
                        data={counties}
                        save="value"
                        placeholder={activity.county}
                        defaultOption={activity.county}
                    />

                    <>
                    <Text style={styles.label}>Møtested: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        value={address}
                        onChangeText={handleAddressChange}
                        maxLength={(addressMaxLength+1)}
                        style={[styles.input, {maxHeight: 200}]}
                        multiline={true}
                        />
                    </View>
                    </>
                    <>
                    <Text style={styles.label}>Beskrivelse: </Text>
                    <View style={styles.inputContainer}>
                    <TextInput
                        value={description}
                        onChangeText={handleDescriptionChange}
                        maxLength={(descriptionMaxLength+1)}
                        multiline={true}
                        style={[styles.input, {maxHeight: 200}]}
                    />
                    </View>

                    <Text>Tittel: </Text>
                    <View style={styles.inputContainer}>
                    <TextInput
                        value={title}
                        onChangeText={handleTitleChange}
                    />
                    </View>

                    <Text>Hvor mange kan maks melde seg på: </Text>
                    <View style={styles.inputContainer}>
                    <TextInput
                        value={max_participants}
                        onChangeText={setMax_participants}
                    />
                    </View>
                    
                    <View></View>
                    {error && <Text style={{color: 'red'}}>{error}</Text>}
                    </>

                    <TouchableOpacity style={styles.button} onPress={handleEditActivity} >
                        <Text style={styles.buttonText}>Endre aktivitet</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#DEE7E6',
        flex: 1,
    },
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        margin: 20,
        flex: 1,
        paddingBottom: 50,

    },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        marginTop: 15,
        height: '12%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    inputContainer: {
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 0,
        borderWidth: 1,
        borderColor: 'grey'
      },
      input: {
        fontSize: 16,
        color: 'grey'
      },
      label: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
      },
      scroll: {
        marginBottom: 100,
    }
})

export default EditActivity;
