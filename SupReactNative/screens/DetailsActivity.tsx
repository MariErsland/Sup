import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { ActivityProps } from '../components/activity';
import Footer from '../shared/Footer';
import { getUser } from '../components/getUser'
import { act } from 'react-test-renderer';
import { retrieveToken } from '../security/token_handling';
import { Moment } from 'moment';
import { formatDate } from '../components/formatDate';
import Comment from '../components/Comments';
import Feed from './feed';
import Filter from '../components/Filter';

interface DetailsProps {
    route: {
        params: {
            activity: ActivityProps;
        };
    };
    activityParticipants: any;
}

const Category = require('../assets/tree-solid.png');
const MadeBy = require('../assets/user.png');
const greenMan = require('../assets/darkGreenMan.png')
const orangeMan = require('../assets/orangeMan.png')
const PersonAttending = require('../assets/person-solid.png');
const TimeActivity = require('../assets/clock.png');
const Address = require('../assets/map.png');
const County = require('../assets/globeIcon.png');
const Description = require('../assets/descriptionIcon.png');

const DetailsActivity: React.FC<DetailsProps> = ({ route }) => {
    const { activity } = route.params;
    const navigation = useNavigation();
    const [currentUserId, setCurrentUserId] = useState(String);
    const [activityParticipants, setActivityParticipants] = useState([{}]);
    const [participantsInQueue, setParticipantsInQueue] = useState([{}]);
    let [number_of_participants, setNumberOfParticipants] = useState(activity.number_of_participants);
    const now = new Date();
    const actDate = new Date(activity.time);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser();
                setCurrentUserId(user.user.id);
                await updateStatusOfActivityParticipants();
                await updateStatusOfParticipantsInQueue();
                console.log("Current user id: ", currentUserId);
                console.log("Current user id: ", user.user.id);
                console.log("Participants in queue in effect: ", participantsInQueue)
            }
            catch(err){
                console.log("Error", err)
            }
        };
        fetchData();
    }, []);

    async function updateStatusOfActivityParticipants() {
        try {
            const myToken = retrieveToken();
            let response = await fetch(`http://152.94.160.72:3000/getActivityParticipants/${activity.id}`, {
                headers:
                {
                    Authorization: `Bearer ${myToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to get activity participants. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity participants collected successfully', data);
            setActivityParticipants(data);
            setNumberOfParticipants(data.length)
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    }

    async function handleSignUpForActivity() {
        try {
            console.log("Inni sign up for activity");
            const myToken = await retrieveToken();
            const response = await fetch(`http://152.94.160.72:3000/addParticipantToActivity/${activity.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to update activity. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity updated successfully', data);
            await updateStatusOfActivityParticipants();
            console.log("Signon")
            console.log("current user: ", currentUserId)
            console.log("Number of participants + 1: ",(number_of_participants + 1))
            console.log("Length from db: ", data.length)
            setNumberOfParticipants(data.length); 
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    async function handleSignOffActivity() {
        try {
            console.log("Inni sign off activity");
            const myToken = await retrieveToken();
            const response = await fetch(`http://152.94.160.72:3000/removeParticipantFromActivity/${activity.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to update activity. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity updated successfully', data);
            await updateStatusOfActivityParticipants();
            setNumberOfParticipants(data.length); 

            //Vis maks antall deltakere > antall deltakere, kjør metode som melder opp neste deltaker
            if (data.length < activity.max_participants){
                //Finn neste deltaker
                console.log("Inne her fordi ein frå køen må over")
                participantsInQueue.sort((a, b) => a.time - b.time);
                const firstInQueue = participantsInQueue.shift();
                await handleAddFirstUserToActivityParticipants(firstInQueue)
            }

        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    async function handleDeleteActivity() {
        console.log('activity id:' + activity.id);
        try {
            const myToken = await retrieveToken();
            Alert.alert(
                'Er du sikker på at du vil slette aktiviteten?',
                'Denne handlingen kan ikke angres.',
                [
                    { text: 'Avbryt', style: 'cancel' },
                    {
                        text: 'Slett',
                        onPress: async () => {
                            console.log('inni onPress' + activity.id);
                            const response = await fetch(`http://152.94.160.72:3000/activity/${activity.id}`, {
                                method: 'DELETE',
                                headers: {
                                    Authorization: `Bearer ${myToken}`,
                                },
                            });
                            if (!response.ok) {
                                throw new Error(`Failed to delete activity. Server responded with ${response.status}.`);
                            }
                            navigation.navigate('MyCreatedActivities');
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
      }

      async function handlePutInQueue(){
        try {
            console.log("Inni put in queue in activity");
            const myToken = await retrieveToken();
            const response = await fetch(`http://152.94.160.72:3000/putInQueue/${activity.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to put user in queue. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity updated successfully, user put in queue', data);
            await updateStatusOfParticipantsInQueue();
        } catch (error) {
            console.error('Error updating activity:', error);
        }
      }

      async function handleRemoveFromQueue(){
        try {
            console.log("Inni remove from queue in activity");
            const myToken = await retrieveToken();
            const response = await fetch(`http://152.94.160.72:3000/removeFromQueue/${activity.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to remove user from queue. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity updated successfully', data);
            await updateStatusOfParticipantsInQueue();
        } catch (error) {
            console.error('Error updating activity:', error);
        }
      }

      async function updateStatusOfParticipantsInQueue() {
        try {
            const myToken = retrieveToken();
            let response = await fetch(`http://152.94.160.72:3000/getParticipantsInQueue/${activity.id}`, {
                headers:
                {
                    Authorization: `Bearer ${myToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to get activity participants  in queue. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity participants in queue collected successfully', data);
            setParticipantsInQueue(data);
        } catch (error) {
            console.error('Error updating activity participants in queue:', error);
        }
    }

    async function handleAddFirstUserToActivityParticipants(user: any) {
        try {
            let response = await fetch(`http://152.94.160.72:3000/addUserFromQueueToActivityParticipants/${activity.id}`, {
                method: 'POST',
                body: JSON.stringify({ user_id: user.user_id }),
                headers: {
                'Content-Type': 'application/json'
                 }
            });
            if (!response.ok) {
                throw new Error(`Failed to add first user to activity participants. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            console.log('Activity participants in queue collected successfully', data);
            updateStatusOfParticipantsInQueue();
            updateStatusOfActivityParticipants();
        } catch (error) {
            console.error('Error updating activity participants in queue:', error);
        }
    }
    

    return (
        <View style={styles.background}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <Text style={styles.title}> {activity.title}</Text>
            <Text style={styles.madeby}><Image source={MadeBy} style={styles.iconMadeBy} /> Laget av: {activity.created_by.first_name}</Text>
            
            <View>
                {(actDate < now) ? (<Text> Aktiviteten er utløpt </Text> ): null}
            </View>

            <View style={styles.participateButtonContainer}>
            {
                (currentUserId === String(activity.created_by.user_id) || actDate < now) ? (
                    <View style={[styles.button, {backgroundColor: '#DDB08C'}]} >
                    <Text style={styles.buttonText}>Jeg vil være med!</Text>
                    </View>
                ) : (
                    <>
                    {currentUserId && activityParticipants.some(participant => participant.user_id === currentUserId) ? (
                        <TouchableOpacity style={styles.button} onPress={handleSignOffActivity}>
                        <Text style={styles.buttonText}>Meld meg av!</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                        {participantsInQueue.some(participant => participant.user_id === currentUserId) ? (
                            <TouchableOpacity style={styles.button} onPress={handleRemoveFromQueue}>
                            <Text style={styles.buttonText}>Fjern meg fra køen</Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                            {activity.max_participants === number_of_participants && currentUserId !== String(activity.created_by.user_id) && !activityParticipants.some(participant => participant.user_id === currentUserId) ? (
                                <TouchableOpacity style={styles.button} onPress={handlePutInQueue}>
                                <Text style={styles.buttonText}>Sett meg i kø</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.button} onPress={handleSignUpForActivity}>
                                <Text style={styles.buttonText}>Jeg vil være med!</Text>
                                </TouchableOpacity>
                            )}
                            </>
                        )}
                        </>
                    )}
                    </>
                )
            }
            </View>
            <View>
                {participantsInQueue.some(participant => participant.user_id === currentUserId) ? (<Text> Du er nummer x på venteliste </Text> ): null}
            </View>
            <View style={styles.container}>
                <ScrollView>
                    
                <Text ><Image source={Description} style={styles.icons}/> {activity.description}</Text>
                    <Text><Image source={TimeActivity} style={styles.icons}/> {formatDate(activity.time)}</Text>
                    <Text><Image source={County} style={styles.icons}/> {activity.county}</Text>
                    <Text><Image source={Address} style={styles.icons}/> {activity.address}</Text>
                    <Text><Image source={PersonAttending} style={styles.icons}/> {number_of_participants} påmeldt </Text>
                    <View>
                    { (( activity.max_participants-number_of_participants ) !== 0) ? (<Text><Image source={greenMan} style={styles.icons}/> {activity.max_participants-number_of_participants} ledig </Text>) : null}
                    </View>
                    <View>
                    {((participantsInQueue.length !== 0) || ((participantsInQueue.length === 0) && (( activity.max_participants-number_of_participants ) === 0)) ) ? (<Text><Image source={orangeMan} style={styles.icons}/> {participantsInQueue.length} på venteliste </Text> ): null}
                    </View>
                  
                    
                </ScrollView>
                </View>

                {currentUserId === String(activity.created_by.user_id) && (
                    <View style={styles.editButtonContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditActivity', { activity })}>
                                <Text style={styles.buttonText}>Rediger</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleDeleteActivity}>
                                <Text style={styles.buttonText}>Slett aktivitet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}


            

            <ScrollView style={styles.chatcontainer}>

            <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Lurer du på noe?</Text>
                <ScrollView style={styles.chatcontainer}>
                    <Comment activityId={activity.id} 
/>
                </ScrollView>
            </View>

            </ScrollView>
            </ScrollView>

        <Footer />

        </View>
    
    );
},

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
        width: '98%',
        height: 'auto',
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 10,
    },
    participateButtonContainer: {
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        width: '98%',
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
        marginBottom: 10,
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
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontSize: 25,
        marginBottom: 10,
        marginRight: 90,
    },
    madeby: {
        fontSize: 20,
        marginBottom: 20,
        marginRight: 70,
    },
    icons: {
        width: 20,
        height: 20,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',
    },
    iconMadeBy: {
        width: 15,
        height: 20,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',
    },
    iconTitle: {
        width: 25,
        height: 20,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3,
        resizeMode: 'contain',
    },

    buttonContainer: {
        marginBottom: 10,
    },
    description: {
        maxHeight: 100,
        overflow: 'scroll',

    },
    commentsSection: {
        width: '120%',
        marginBottom: 120,
    },
    commentsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 10,
    },
    chatcontainer: {
        backgroundColor: 'white',
        padding: 10,
        width: '98%',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 15,
    },

});


export default DetailsActivity;
