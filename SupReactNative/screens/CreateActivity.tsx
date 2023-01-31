import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../shared/Footer';

const NewActivity = () => {
    const [time, setTime] = useState('');
    const [county, setCounty] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [number_of_participants, setNumberOfParticipants] = useState('');
    const [created_by, setCreatedBy] = useState('');

    const handleCreateActivity = async () => {
        console.log(time, county, category);
        console.log(JSON.stringify({ time, county, address, category, description, number_of_participants, created_by }));
        const response = await fetch('http://152.94.160.72:3000/create-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time, county, address, category, description, number_of_participants, created_by }),
        });
    
        if (!response.ok) {
            console.error('Error creating activity:', response);
            return;
        }
    
        const data = await response.json();
        console.log('Success:', data);
    }
    

    return (
        <View style= {styles.background}>
            <View style={styles.container}>
            
            <TextInput
                placeholder="Tidspunkt"
                value={time}
                onChangeText={setTime}
            />
            <TextInput
                placeholder="Fylke (dropdown)"
                value={county}
                onChangeText={setCounty}
            />
            <TextInput
                placeholder="Møtested"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                placeholder="Kategori (skal være dropdown)"
                value={category}
                onChangeText={setCategory}
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
