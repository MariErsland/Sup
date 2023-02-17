import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useActivityState, categories, counties } from '../state/ActivityState';
import { retrieveToken } from '../security/token_handling';

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

    const [number_of_participants] = useState('1');
    const [created_by] = useState('');
    
    const navigation = useNavigation();

    const handleCreateActivity = async () => {
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
    
    return (
        <View style={{flex: 1}}>
            <ScrollView style= {styles.background}>
            <View style={styles.container}>
            
            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                <Text style={{fontSize: 16}}>Dato og tidspunkt</Text>
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
                 setSelected={setSelectedCounty}
                 data={categories}
                 save="value"
                 placeholder='Kategori'
            />
            <Text></Text>

            <SelectList
                setSelected={setSelectedCategory}
                data={counties}
                save="value"
                placeholder='Fylke'
            />
            <TextInput
                placeholder="Møtested"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                placeholder="Beskrivelse"
                value={description}
                onChangeText={setDescription}
            />
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
})

export default NewActivity;