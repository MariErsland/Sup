import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeedButton = require('../assets/HouseHome.png');
const MakeNewActivityButton = require('../assets/+.png');
const UserButton = require('../assets/user.png');
const MyCreatedActivitiesButton = require('../assets/myactivities_icon.png')

const Footer = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                <Image source={FeedButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NewActivity')}>
                <Image source={MakeNewActivityButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyCreatedActivities')}>
                <Image source={MyCreatedActivitiesButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={UserButton} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 80,
    }
});

export default Footer;
