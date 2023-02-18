import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ActivityProps } from '../components/activity';
import Footer from '../shared/Footer';
import {getUser} from '../components/getUser'
import { act } from 'react-test-renderer';

interface DetailsProps {
    route: {
        params: {
            activity: ActivityProps;
        };
    };    
}


const Category = require('../assets/tree-solid.png');
const MadeBy = require('../assets/user.png');

const DetailsActivity: React.FC<DetailsProps> = ({ route }) => {
    const { activity } = route.params;
    const navigation = useNavigation();
    const [currentUserId, setCurrentUserId] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();
            setCurrentUserId(user.user.id);
        };
        fetchData();
    }, []);
    console.log(activity.category);
    
    return (
        <View style={styles.background}>
            <Text style={styles.title}><Image source={Category} style={styles.iconTitle}/>Test for tittel {activity.category}</Text>
            <Text style={styles.madeby}><Image source={MadeBy} style={styles.iconMadeBy}/> Laget av: {activity.created_by.first_name}</Text>
            <View style={styles.participateButtonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Jeg vil være med!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text>Når: {activity.time}</Text>
                <Text>Fylke: {activity.county}</Text>
                <Text>Addresse: {activity.address}</Text>
                <Text>Beskrivelse: {activity.description}</Text>
                <Text>Antall påmeldte: {activity.number_of_participants}</Text>
                {currentUserId === activity.created_by.user_id && (
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.button}
                         onPress={() => navigation.navigate('EditActivity', {activity})}>
                        <Text style={styles.buttonText}>Rediger</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#DEE7E6',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 90,
        borderRadius: 10,
        margin: 10,
        width: '90%',
        alignSelf: 'center',
        height: '40%',
    },
    participateButtonContainer: {
        alignSelf: 'center',
        marginVertical: 30,
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    editButtonContainer: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: '30%',
        backgroundColor: '#EB7B31',
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    title: {
        fontFamily:'Inter',
        fontStyle: 'normal',
        fontSize: 25,
        marginBottom: 20,
        marginRight: 90,
    },
    madeby: {
        fontSize: 20,
        marginBottom: 70,
        marginRight: 70,
    },
    icons: {
        width: 35,
        height: 35,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',
    },
    iconMadeBy: {
        width: 20,
        height: 25,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',
    },
    iconTitle: {
        width: 40,
        height: 30,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',

    }
});

export default DetailsActivity;
