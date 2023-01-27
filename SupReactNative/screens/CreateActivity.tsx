import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
        <View>
            <Text>Add new activity</Text>
            <TextInput
                placeholder="Time"
                value={time}
                onChangeText={setTime}
            />
            <TextInput
                placeholder="County"
                value={county}
                onChangeText={setCounty}
            />
            <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="Number of participants"
                value={number_of_participants}
                onChangeText={setNumberOfParticipants}
            />
            <TextInput
                placeholder="Created by"
                value={created_by}
                onChangeText={setCreatedBy}
            />
            <Button title="Create activity" onPress={handleCreateActivity} />
        </View>
    );
}

export default NewActivity;
