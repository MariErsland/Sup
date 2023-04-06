import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { ActivityProps } from '../components/activity';
import Footer from '../components/Footer';
import { formatDate } from '../helpers/formatDate';
import Comment from '../components/Comments';
import { useDetailsActivityLogic } from '../screens-logic/DetailsActivityLogic'


interface DetailsProps {
    route: {
        params: {
            activity: ActivityProps;
        };
    };
    activityParticipants: any;
}


const MadeBy = require('../assets/user.png');
const greenMan = require('../assets/darkGreenMan.png')
const orangeMan = require('../assets/orangeMan.png')
const PersonAttending = require('../assets/person-solid.png');
const TimeActivity = require('../assets/clock.png');
const Address = require('../assets/map.png');
const County = require('../assets/globeIcon.png');
const Description = require('../assets/descriptionIcon.png');


const DetailsActivity: React.FC<DetailsProps> = ({ route, navigation }) => {
    console.log("routeparams activity: ", route.params);
    //const { id, address, category, county, createdBy, desctiption, hideCreatedBy, isUpcoming, maxParticipants, navigation, numberOfParticipants } = route.params;
    const { activity } = route.params;
    const {
        currentUserId,
        activityParticipants,
        participantsInQueue,
        number_of_participants,
        isLoading,
        now,
        actDate,
        handleSignOffActivity,
        handleDeleteActivity,
        handlePutInQueue,
        handleRemoveFromQueue,
        handleSignUpForActivity
    } = useDetailsActivityLogic(activity, navigation);

    return (
        <View style={styles.background}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#EB7B31" />
            ) : (
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    <Text style={styles.title}> {activity.title}</Text>
                    <Text style={styles.madeby}><Image source={MadeBy} style={styles.iconMadeBy} /> Laget av: {activity.created_by.first_name}</Text>
                    <View>
                        {(actDate < now) ? (<Text> Aktiviteten er utløpt </Text>) : null}
                    </View>
                    <View style={styles.participateButtonContainer}>
                        {
                            (currentUserId === String(activity.created_by.user_id) || actDate < now) ? (
                                <View style={[styles.button, { backgroundColor: '#DDB08C' }]} >
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
                                                    {activity.max_participants === activityParticipants.length && currentUserId !== String(activity.created_by.user_id) && !activityParticipants.some(participant => participant.user_id === currentUserId) ? (
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
                        {participantsInQueue.findIndex(participant => participant.user_id === currentUserId) >= 0 ? (<Text>Du er nummer {participantsInQueue.findIndex(participant => participant.user_id === currentUserId) + 1} på ventelisten</Text>) : null}


                    </View>
                    <View style={styles.container}>


                        <ScrollView>
                            <Text ><Image source={Description} style={styles.icons} /> {activity.description}</Text>
                            <Text><Image source={TimeActivity} style={styles.icons} /> {formatDate(activity.time)}</Text>
                            <Text><Image source={County} style={styles.icons} /> {activity.county}</Text>
                            <Text><Image source={Address} style={styles.icons} /> {activity.address}</Text>
                            <Text><Image source={PersonAttending} style={styles.icons} /> {activityParticipants.length} påmeldt </Text>
                            <View>
                                {((activity.max_participants - activityParticipants.length) !== 0) ? (<Text><Image source={greenMan} style={styles.icons} /> {activity.max_participants - activityParticipants.length} ledig </Text>) : null}
                            </View>
                            <View>
                                {((participantsInQueue.length !== 0) || ((participantsInQueue.length === 0) && ((activity.max_participants - activityParticipants.length) === 0))) ? (<Text><Image source={orangeMan} style={styles.icons} /> {participantsInQueue.length} på venteliste </Text>) : null}
                            </View>


                            {currentUserId === String(activity.created_by.user_id) && (
                            <View style={styles.editButtonContainer}>
                                {(actDate < now) ? null : (
                                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditActivity', { activity })}>
                                        <Text style={styles.buttonText}>Rediger</Text>
                                    </TouchableOpacity>
                                )}


                                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteActivity}>
                                    <Text style={styles.buttonText}>Slett</Text>
                                </TouchableOpacity>
                            </View>
                            )}
                        </ScrollView>
                    </View>

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
            )}
            <Footer />
        </View>
    );
}


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
        width: '95%',
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
        marginTop: 40,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        width: '30%',
        right: 10,
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        marginHorizontal: 2,
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        width: '48%',
        height: 40,
    },
    editButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        width: '50%',
        height: 40,


    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 25,
        marginBottom: 10,
        marginRight: 90,
        marginTop: 10,
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
        minWidth: '82%',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 15,
    },
});


export default DetailsActivity;