import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';

interface EditActivity {
  id: string,
  time: string,
  county: string,
  address: string,
  category: string,
  description: string,
  number_of_participants: string,
  created_by: string,
}

const EditActivity = ({ id }: EditActivity) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [address, setAddress] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [category] = useState([
        { label: 'Friluft', value: 'Tur'},
        { label: 'Trening', value: 'Jogging'},
        { label: 'Matlaging', value: 'Matlaging'}, 
        { label: 'Annet', value: 'Annet'}, 
    ]);
  
    const [county] = useState([
        { label: 'Rogaland', value: 'Rogaland'},
        { label: 'Agder', value: 'Agder'},
    ]);
  
    const [description, setDescription] = useState('');
    const [number_of_participants, setNumberOfParticipants] = useState('');
    const [created_by, setCreatedBy] = useState('');

    const handleEditActivity = async () => {
        const response = await fetch(`http://152.94.160.72:3000/activity/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: selectedDate, county: selectedCounty, address, category: selectedCategory, description, number_of_participants, created_by }),
        });
        
    
        if (!response.ok) {
            console.error('Error updating activity:', response);
            return;
        }
    
        const data = await response.json();
        console.log('Success:', data);
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

export default EditActivity;
