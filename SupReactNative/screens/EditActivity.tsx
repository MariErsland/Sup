import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { useActivityState, categories, counties } from '../state/ActivityState';
import { retrieveToken } from '../security/token_handling';

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
    const [created_by] = useState(activity.created_by)
    const [description, setDescription] = useState(activity.description);
    const [address, setAddress] = useState(activity.address);

    //This needs to be edited to a fixed number when we get the "Meld på aktivitet" button
    const [number_of_participants] = useState(activity.number_of_participants);
    
    
    const navigation = useNavigation();
    console.log("ID="+activity.id);
    console.log("selectedCategory:" +selectedCategory);


    const handleEditActivity = async () => {
        try {
          const myToken = await retrieveToken();
      
          const response = await fetch(`http://152.94.160.72:3000/activity/${activity.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify({ time: selectedDate, category: selectedCategory, county: selectedCounty, address,  description, number_of_participants, created_by  }),
          });
      
          if (!response.ok) {
            throw new Error(`Failed to update activity. Server responded with ${response.status}.`);
          }
      
          const data = await response.json();
          console.log('Activity updated successfully', data);
          
        } catch (error) {
          console.error('Error updating activity:', error);
        }
      };

    
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
