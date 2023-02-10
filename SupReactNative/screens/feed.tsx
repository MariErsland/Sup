import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ActivityList from '../components/activity';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import Footer from '../shared/Footer';
import { retrieveToken } from '../security/token_handling';

interface FeedProps {
    navigation: NavigationProp<RootStackParamList, 'Feed'>;
}

const Feed: React.FC<FeedProps> = ({ navigation }) => {
    const {isLoggedIn} = useContext(LoginContext);
    console.log('Is logged in: ', isLoggedIn);
    useAuth({isLoggedIn, navigation: navigation});
    
    const [activity, setActivity] = useState(null);
    
    const handleFetchActivities = async () => {
        const myToken = await retrieveToken();
        await fetch(`http://152.94.160.72:3000/activity/`, {
            headers: {
                Authorization: `Bearer ${myToken}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setActivity(data);
        })
        .catch((error) => {
            console.log('Error fetching activity', error);
        });
    }

    useEffect(() => {
        const getData = async () => {
            await handleFetchActivities();
          };
          getData();
    }, []);

    const dummyData = [
        {
            id: 1,
            time: "2022-01-01 11:00",
            county: 'Rogaland',
            address: 'Dalsnuten',
            category: 'tur',
            description: 'Det blir kjekt',
            number_of_participants: 10,
            created_by: 123,
        },
        {
            id: 2,
            time: "2022-01-01 11:00",
            county: 'Rogaland',
            address: 'Dalsnuten',
            category: 'tur',
            description: 'Det blir kjekt',
            number_of_participants: 10,
            created_by: 123,
        },{
            id: 3,
            time: "2022-01-01 11:00",
            county: 'Rogaland',
            address: 'Dalsnuten',
            category: 'tur',
            description: 'Det blir kjekt',
            number_of_participants: 10,
            created_by: 123,
        },
    ];

    return (
        <View style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {activity ? <ActivityList activities={activity} navigation={navigation}/> : <ActivityList activities={dummyData} navigation={navigation} />}
            </ScrollView>
            <View style={{flex: 0}}>
                <Footer  />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#DEE7E6',
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    }
})

export default Feed;
