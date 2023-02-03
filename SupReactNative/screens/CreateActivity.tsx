import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';

interface NewActivity {
    }

const NewActivity = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);

    const [selectedDate, setSelectedDate] = useState('');
    console.log(selectedDate);

    const [address, setAddress] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    console.log(showDatePicker)


    const [category] = useState([
        { label: 'Friluft', value: 'Tur'},
        { label: 'Trening', value: 'Jogging'},
        { label: 'Matlaging', value: 'Matlaging'}, 
        { label: 'Annet', value: 'Annet'}, 

        ])

  
     const [county] = useState([
        { label: 'Rogaland', value: 'Rogaland'},
        { label: 'Agder', value: 'Agder'},
        ])
         

    const [description, setDescription] = useState('');
    const [number_of_participants, setNumberOfParticipants] = useState('');
    const [created_by, setCreatedBy] = useState('');

    const handleCreateActivity = async () => {
        console.log(selectedDate, county, category);
        console.log(JSON.stringify({ selectedDate, county, address, category, description, number_of_participants, created_by }));
        const response = await fetch('http://152.94.160.72:3000/create-activity', {
            method: 'POST',
            headers: {
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
    }
    



    //{'Rogaland','Agder', 'Innland', 'Møre og Romsdal', 'Nordland', 'Oslo', 'Vestfold og Telemark', 'Troms of Finnmark', 'Trøndelag', 'Vestland', 'Viken'};

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
                        date={selectedDate}
                        onSelectedChange={setSelectedDate}
                    />
                )}
            </TouchableOpacity>
            
            <Text></Text>
            
            <SelectList
                 setSelected={setSelectedCounty}
                 data={category}
                 save="value"
                 placeholder='Kategori'
            />
            <Text></Text>

            <SelectList
                setSelected={setSelectedCategory}
                data={county}
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
            <TextInput
                placeholder="Må være tall(skal bort)"
                value={number_of_participants}
                onChangeText={setNumberOfParticipants}
            />
            <TextInput
                placeholder="Laget av (Denne skal bort)"
                value={created_by}
                onChangeText={setCreatedBy}
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
