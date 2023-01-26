import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import ActivityList from '../components/activity';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';


interface FeedProps {
    navigation: NavigationProp<RootStackParamList, 'Feed'>;
}

const Feed: React.FC<FeedProps> = ({ navigation }) => {
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        fetch(`http://152.94.160.72:3000/activity/`)
            .then((response) => response.json())
            .then((data) => {
                setActivity(data);
            })
            .catch((error) => {
                console.log('Error fetching activity', error);
            });
    }, []);

    return (
        <View>
            <Text>DETTE ER FEED - VELKOMMEN SKAL DU VÆRE</Text>
            <Button title="Min profil" onPress={() => navigation.navigate("Profile")}/>
            <Button title="Ny aktivitet" onPress={() => navigation.navigate("NewActivity")} />
            {activity ? <ActivityList activities={activity} /> : <Text>Her var det ingen aktiviteter....</Text>}
        </View>
    );
};

export default Feed;