import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../helpers/formatDate';

export interface ActivityProps {
    title: string;
    id: number;
    time: string;
    county : string;
    address : string;
    category: string;
    description: string;
    number_of_participants: number;
    max_participants: number;
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
const Title = require('../assets/title1.png');

const Activity = (props: ActivityProps) => {
    const activityDate = new Date(props.time);
    const currentDate = new Date();

    const backgroundColor = activityDate < currentDate ? 'lightgray' : 'white';

    return (
        <TouchableOpacity key={props.id} style={[styles.activityBox, { backgroundColor }]} onPress={() => props.navigation.navigate('DetailsActivity', 
            {
                activity: {
                    title: props.title,
                    time: props.time,
                    id: props.id,
                    address: props.address,
                    category: props.category,
                    county: props.county,
                    created_by: { user_id: props.created_by.user_id, first_name: props.created_by.first_name },
                    onPress: props.onPress,
                    description: props.description,
                    hideCreatedBy: props.hideCreatedBy,
                    isUpcoming: props.isUpcoming,
                    max_participants: props.max_participants,
                    navigation: props.navigation,
                    number_of_participants: props.number_of_participants,
                    activities: props.activities
                    
                }
            }
        )}>
            <View style={styles.iconText}>
                <Image source={Title} style={styles.icons}/>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={TimeActivity} style={styles.icons}/>
                <Text>{formatDate(props.time)}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={County} style={styles.icons}/>
                <Text>{props.county}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={Address} style={styles.icons}/>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.descriptionText}>{props.address}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={Category} style={styles.icons}/>
                <Text>{props.category}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={Description} style={styles.icons}/>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.descriptionText}>{props.description}</Text>
            </View>
            <View style={styles.iconText}>
                <Image source={PersonAttending} style={styles.icons}/>
                <Text>{props.number_of_participants} påmeldt</Text>
            </View>
        </TouchableOpacity>
    );
}

interface ActivityListProps {
    activities: ActivityProps[];
    navigation: any;
    hideCreatedBy: boolean;
    isUpcoming: boolean;
    showPast: boolean;
}

const ActivityList = (props: ActivityListProps) => {
    const currentDate = new Date();
    const sortedActivities = props.activities.sort((a, b) => a.time.localeCompare(b.time));
    const pastActivities = sortedActivities.filter(activity => new Date(activity.time) < currentDate);
    const upcomingActivities = sortedActivities.filter(activity => new Date(activity.time) >= currentDate);
    const sortedPastUpcomingActivities = [...upcomingActivities, ...pastActivities];

    return (
        <ScrollView style={styles.scroll}>
            {sortedPastUpcomingActivities.map(activity => (
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
        marginRight: 10
    },
    scroll: {
        marginBottom: 100,
    },
    descriptionText: {
        flex: 1,
        flexWrap: 'wrap',
    },
   
})

export default ActivityList;
