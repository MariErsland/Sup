import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { useActivityState, categories, counties } from '../state/ActivityState';
import { retrieveToken } from '../token_handling';

interface EditActivityProps {
    route: {
        params: {
            activity: EditActivityProps; 
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
    const {activity} = route.params;
    const {
        selectedCategory,
        setSelectedCategory,
        selectedCounty,
        setSelectedCounty,
        selectedDate,
        setSelectedDate,
        showDatePicker,
        setShowDatePicker,
    } = useActivityState();

    // To get this value prefilled I set the value locally here
    const [description, setDescription] = useState(activity.description);
    const [address, setAddress] = useState(activity.address);
    
    
    const navigation = useNavigation();
    console.log(activity.id);

    const handleEditActivity = async () => {
        //const response = await fetch(`http://152.94.160.72:3000/activity/${activity.id}
        const myToken = await retrieveToken();
        const response = await fetch(`http://152.94.160.72:3000/activity/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify({ time: selectedDate, county: selectedCounty, address, category: selectedCategory, description }),
        });
        if (!response.ok) {
            console.error('Error updating activity:', response);
            return;
        }
        const data = await response.json();
        console.log('Success:', data);
        console.log('User updated successfully', data);
        navigation.navigate('DetailsActivity', {params: {activity: data}});
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
