import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import { useEditActivityLogic } from '../screens-logic/EditActivityLogic'
import { categories, counties } from '../state/ActivityState';
import { formatDate } from '../components/formatDate';

interface EditActivityProps {
    route: {
        params: {
            activity: any;
        };
    };
}

const descriptionMaxLength = 500;
const addressMaxLength = 100;

const EditActivity: React.FC<EditActivityProps> = ({ route }) => {
    const { activity } = route.params;
    const {
        selectedDate,
        setSelectedDate,
        setSelectedCounty,
        setSelectedCategory,
        showDatePicker,
        setShowDatePicker,
        address,
        setAddress,
        handleAddressChange,
        description,
        setDescription,
        handleDescriptionChange,
        title,
        setTitle,
        handleTitleChange,
        max_participants,
        setMax_participants,
        error,
        setError,
        handleEditActivity,
    } = useEditActivityLogic({
        activity,
        onActivityUpdated: () => {
            console.log('Activity updated successfully');
        },
    });

    useEffect(() => {
        setSelectedDate(formatDate(selectedDate));
        setSelectedCounty(activity.county);
        setSelectedCategory(activity.category);
    }, []);



    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.background, styles.scroll]}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text style={styles.label}>Dato og tidspunkt</Text>
                        <Text>
                            {selectedDate}
                        </Text>
                        {showDatePicker && (
                            <DatePicker
                                selected={selectedDate}
                                onSelectedChange={setSelectedDate}
                            />
                        )}
                    </TouchableOpacity>

                    <Text></Text>

                    <SelectList
                        setSelected={setSelectedCategory}
                        data={categories}
                        save="value"
                        placeholder={activity.category}
                        defaultOption={activity.category ? activity.category : ''}
                    />
                    <Text></Text>

                    <SelectList
                        setSelected={setSelectedCounty}
                        data={counties}
                        save="value"
                        placeholder={activity.county}
                        defaultOption={activity.county}
                    />

                    <>
                        <Text style={styles.label}>Møtested: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={address}
                                onChangeText={handleAddressChange}
                                maxLength={(addressMaxLength + 1)}
                                style={[styles.input, { maxHeight: 200 }]}
                                multiline={true}
                            />
                        </View>
                    </>
                    <>
                        <Text style={styles.label}>Beskrivelse: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={description}
                                onChangeText={handleDescriptionChange}
                                maxLength={(descriptionMaxLength + 1)}
                                multiline={true}
                                style={[styles.input, { maxHeight: 200 }]}
                            />
                        </View>

                        <Text>Tittel: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={title}
                                onChangeText={handleTitleChange}
                            />
                        </View>

                        <Text>Hvor mange kan maks melde seg på: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={max_participants.toString()}
                                onChangeText={(text) => setMax_participants(Number(text))}
                            />
                        </View>

                        <View></View>
                        {error && <Text style={{ color: 'red' }}>{error}</Text>}
                    </>

                    <TouchableOpacity style={styles.button} onPress={handleEditActivity} >
                        <Text style={styles.buttonText}>Endre aktivitet</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#DEE7E6',
        flex: 1,
    },
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        margin: 20,
        flex: 1,
        paddingBottom: 50,

    },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        marginTop: 15,
        height: '12%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    inputContainer: {
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 0,
        borderWidth: 1,
        borderColor: 'grey'
    },
    input: {
        fontSize: 16,
        color: 'grey'
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    scroll: {
        marginBottom: 100,
    }
})

export default EditActivity;
