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
    const descriptionMaxLength = 300;
    const addressMaxLength = 100;

    useEffect(() => {
        setSelectedDate(formatDate(selectedDate));
        setSelectedCounty(activity.county)
        setSelectedCategory(activity.category)
    }, []);

    // To get this value prefilled I set the value locally here
    const [description, setDescription] = useState(activity.description);
    const [address, setAddress] = useState(activity.address);

    const navigation = useNavigation();

    console.log("ID=" + activity.id);
    console.log("selectedCategory:" + selectedCategory);

    const handleEditActivity = async () => {
        try {
            const myToken = await retrieveToken();
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
                    description: description
                }),
            });
            if (!response.ok) {
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
