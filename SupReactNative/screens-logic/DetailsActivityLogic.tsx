import { useState, useEffect } from 'react';
import { ActivityProps } from '../components/activity';
import { getUser } from '../services/getUser'
import { retrieveToken } from '../security/token_handling';
import { Alert} from 'react-native';


export function useDetailsActivityLogic(activity: ActivityProps, navigation) {
    const [currentUserId, setCurrentUserId] = useState('');
    const [activityParticipants, setActivityParticipants] = useState([{}]);
    const [participantsInQueue, setParticipantsInQueue] = useState([{}]);
    let [number_of_participants, setNumberOfParticipants] = useState(activity.number_of_participants);
    let now = new Date();
    const actDate = new Date(activity.time);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const user = await getUser();
                setCurrentUserId(user.user.id);
                console.log('user user id', user.user.id);
                await updateStatusOfActivityParticipants();
                await updateStatusOfParticipantsInQueue();
                console.log("Current user id: ", currentUserId);
                console.log("Current user id: ", user.user.id);
                console.log("Participants in queue in effect: ", participantsInQueue)
                setIsLoading(false);
            }
            catch (err) {
                console.log("Error", err)
            }
        };
        fetchData();
    }, [currentUserId]);

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
                throw new Error(`Failed to get status of activity participants. Response from server is ${response.status}.`);
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
                throw new Error(`Failed to sign up for activity. Reponse from server was ${response.status}.`);
            }
            const data = await response.json();
            await updateStatusOfActivityParticipants();
            console.log("Signon")
            console.log("current user: ", currentUserId)
            console.log("Number of participants + 1: ", (number_of_participants + 1))
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
            if (data.length < activity.max_participants) {
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

    async function handlePutInQueue() {
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

    async function handleRemoveFromQueue() {
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
            data.sort((a, b) => a.time - b.time);
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

    return {
        currentUserId,
        activityParticipants,
        participantsInQueue,
        number_of_participants,
        isLoading,
        now,
        actDate,
        handleSignUpForActivity,
        handleSignOffActivity,
        handleDeleteActivity,
        handlePutInQueue,
        handleRemoveFromQueue
    };

    }