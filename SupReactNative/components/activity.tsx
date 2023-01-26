import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

export interface ActivityProps {
    id: number;
    time: number;
    county : string;
    address : string;
    category: string;
    description: string;
    number_of_participants: number;
    created_by: number;
    onPress: () => void;
}

const Activity = (props: ActivityProps) => {
    return (
        <View key={props.id}>
            <Text>Opprettet: {props.time}</Text>
            <Text>Fylke: {props.county}</Text>
            <Text>Addresse: {props.address}</Text>
            <Text>Kategori: {props.category}</Text>
            <Text>Beskrivelse: {props.description}</Text>
            <Text>Antall påmeldte: {props.number_of_participants}</Text>
            <Text>Laget av: {props.created_by}</Text>
            <Button title="Se detaljer..test" onPress={props.onPress} />
        </View>
    );
}

interface ActivityListProps {
    activities: ActivityProps[];
}

const ActivityList = (props: ActivityListProps) => {
    return (
        <ScrollView>
            {props.activities.map(activity => (
                <Activity key={activity.id} {...activity} />
            ))}
        </ScrollView>
    );
}

export default ActivityList;