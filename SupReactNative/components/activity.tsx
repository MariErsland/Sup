import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export interface ActivityProps {
    id: number;
    time: string;
    county : string;
    address : string;
    category: string;
    description: string;
    number_of_participants: number;
    created_by: {
        user_id: number;
        first_name: string;
    };
    onPress: () => void;
    navigation: any;
    activities: ActivityProps[];
    hideCreatedBy?: boolean;
    isUpcoming: boolean;
}

const PersonAttending = require('../assets/person-solid.png');
const TimeActivity = require('../assets/clock.png');
const Address = require('../assets/map.png');
const MadeBy = require('../assets/user.png');
const Category = require('../assets/tree-solid.png');
const County = require('../assets/globeIcon.png');
const Description = require('../assets/descriptionIcon.png');

const Activity = (props: ActivityProps) => {
    const activityDate = new Date(props.time);
    const currentDate = new Date();

    const backgroundColor = activityDate < currentDate ? 'lightgray' : 'white';

    return (
        <TouchableOpacity key={props.id} style={[styles.activityBox, { backgroundColor }]} onPress={() => props.navigation.navigate('DetailsActivity', {activity: props})}>
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
            {!props.hideCreatedBy && (
              <View style={styles.iconText}>
                  <Image source={MadeBy} style={styles.icons}/>
                  <Text>{props.created_by.first_name}</Text>
              </View>
            )}
        </TouchableOpacity>
    );
}

interface ActivityListProps {
    activities: ActivityProps[];
    navigation: any;
    hideCreatedBy: boolean;
    isUpcoming: boolean;
}

const ActivityList = (props: ActivityListProps) => {
    const currentDate = new Date();
    const sortedActivities = props.activities.sort((a, b) => a.time.localeCompare(b.time));

    // filter past activities and add to the end of the sorted activities array
    const pastActivities = sortedActivities.filter(activity => new Date(activity.time) < currentDate);
    const upcomingActivities = sortedActivities.filter(activity => new Date(activity.time) >= currentDate);
    const sortedUpcomingActivities = [...upcomingActivities, ...pastActivities];

    return (
        <ScrollView style={styles.scroll}>
            {sortedUpcomingActivities.map(activity => (
                <Activity key={activity.id} {...activity} navigation={props.navigation} hideCreatedBy={props.hideCreatedBy} isUpcoming={new Date(activity.time) >= currentDate} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activityBox: {
        padding: 10,
        margin: 12,
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