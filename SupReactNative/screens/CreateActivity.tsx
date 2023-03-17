import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useActivityState, categories, counties } from '../state/ActivityState';
import { retrieveToken } from '../security/token_handling';
import { validateInputCharacters, validateInputLength } from '../components/inputValiation';

interface NewActivity {
    }

const NewActivity = () => {


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
    } = useActivityState();

    const [number_of_participants] = useState('0');
    const [created_by] = useState('');
    const [error, setError] = useState('');
    const descriptionMaxLength = 500;
    const addressMaxLength = 100;
    const descriptionMinLength = 20;
    const addressMinLength = 10;
    
    const navigation = useNavigation();

    const handleCreateActivity = async () => {
        if ((!selectedDate) || (!counties) || (!address.trim()) || (!selectedCategory) || (!description.trim())){
            console.log("selected date: ", selectedDate);
            console.log("selected county: ", selectedCounty);
            console.log("selected address: ", address);
            console.log("selected categories: ", selectedCategory);
            console.log("selected description: ", description);
            console.log("All input field must be filled out");
            return;
        }
        if ((address.length < addressMinLength)){
            setError("Address cant be less that " + addressMinLength + "characters.")
            return;
        }
        if ((description.length < descriptionMinLength)){
            setError("Description cant be less that " + descriptionMinLength + "characters.")
            return;
        }
        const myToken = await retrieveToken();
        console.log(selectedDate, counties, categories);
        console.log(JSON.stringify({ selectedDate, counties, address, categories, description, number_of_participants, created_by }));
        const response = await fetch('http://152.94.160.72:3000/create-activity', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: selectedDate, county: selectedCounty, address, category: selectedCategory, description, number_of_participants, created_by }),
        });
    
        if (!response.ok) {
            console.error('Error creating activity:', response);
            return;
        }
        const data = await response.json();
        console.log('Success:', data);
        navigation.navigate('MyCreatedActivities');
    }

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
        
        <View style={{flex: 1}}>
            <ScrollView style= {styles.background, styles.scroll}>
            <View style={styles.container}>
            
            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                <Text style={styles.label}> - Velg dato og tidspunkt her - </Text>
                <Text>
                    {selectedDate}
                </Text>
                {showDatePicker && (
                    <DatePicker
                        selected={selectedDate}
                        onSelectedChange={setSelectedDate}
                        minimumDate={new Date().toISOString().slice(0, 10)}
                    />
                )}
            </TouchableOpacity>
            
            <Text></Text>
            
            <SelectList
                 setSelected={setSelectedCategory}
                 data={categories}
                 save="value"
                 placeholder='Kategori'
            />
            <Text></Text>

            <SelectList
                setSelected={setSelectedCounty}
                data={counties}
                save="value"
                placeholder='Fylke'
            />
            <>
            <Text style={styles.label}>Møtested: </Text>
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Møtested"
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
                placeholder="Beskrivelse"
                value={description}
                onChangeText={handleDescriptionChange}
                maxLength={(descriptionMaxLength+1)}
                multiline={true}
                style={[styles.input, {maxHeight: 200}]}
                
            />
            </View>
            {error && <Text style={{color: 'red'}}>{error}</Text>}
            </>
            <TouchableOpacity style={styles.button} onPress={handleCreateActivity} >
                    <Text style={styles.buttonText}>Opprett ny aktivitet</Text>
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
        height: '10%',
        width: '85%',
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

export default NewActivity;