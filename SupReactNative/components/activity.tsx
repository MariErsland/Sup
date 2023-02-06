import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    navigation: any;
    activities: ActivityProps[];
}

const PersonAttending = require('../assets/person-solid.png');
const TimeActivity = require('../assets/clock.png');
const Address = require('../assets/map.png');
const MadeBy = require('../assets/user.png');
const Category = require('../assets/tree-solid.png');
const County = require('../assets/globeIcon.png');
const Description = require('../assets/descriptionIcon.png');

const Activity = (props: ActivityProps) => {
    return (
        <TouchableOpacity key={props.id} style={styles.activityBox} onPress={() => props.navigation.navigate('DetailsActivity', {activity: props})}>
            <View style={styles.iconText}>
                <Image source={TimeActivity} style={styles.icons}/>
                <Text>{props.time}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={County} style={styles.icons}/>
                <Text>{props.county}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={Address} style={styles.icons}/>
                <Text>{props.address}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={Category} style={styles.icons}/>
                <Text>{props.category}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={Description} style={styles.icons}/>
                <Text>{props.description}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={PersonAttending} style={styles.icons}/>
                <Text>{props.number_of_participants} påmeldt</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={MadeBy} style={styles.icons}/>
                <Text>{props.created_by}</Text>
            </View>
        </TouchableOpacity>
    );
}

interface ActivityListProps {
    activities: ActivityProps[];
    navigation: any;
}

const ActivityList = (props: ActivityListProps) => {
    return (
        <ScrollView style={styles.scroll}>
            {props.activities.map(activity => (
                <Activity key={activity.id} {...activity} navigation={props.navigation} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activityBox: {
        padding: 10,
        margin: 12,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    icons: {
        width: 20,
        height: 18,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scroll: {
        marginBottom: 100,
    }
})

export default ActivityList;