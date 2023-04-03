import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Footer from '../shared/Footer';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import { useCreateActivityLogic } from '../screens-logic/CreateActivityLogic'
import { categories, counties } from '../state/ActivityState';
interface NewActivity {
}

const NewActivity = () => {

    const descriptionMaxLength = 500;
    const addressMaxLength = 100;

    const {
        selectedCategory,
        setSelectedCategory,
        selectedCounty,
        setSelectedCounty,
        selectedDate,
        setSelectedDate,
        address,
        setAddress,
        description,
        setDescription,
        showDatePicker,
        setShowDatePicker,
        title,
        setTitle,
        max_participants,
        setMax_participants,
        number_of_participants,
        created_by,
        error,
        setError,
        handleCreateActivity,
        handleDescriptionChange,
        handletTitleChange,
        handleAddressChange,
        handleMaxParticipantChange,
    } = useCreateActivityLogic();


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.background, styles.scroll}>
                <View style={styles.container}>

                    <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text style={styles.label}> - Velg dato og tidspunkt her - </Text>
                        <Text>
                            {selectedDate}
                        </Text>
                        {showDatePicker && (
                            <DatePicker
                                selected={selectedDate}
                                onSelectedChange={setSelectedDate}
                                minimumDate={new Date().toISOString().slice(0, 10)}
                            />
                        )}
                    </TouchableOpacity>

                    <Text style={styles.label}>Tittel: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Tittel"
                            value={title}
                            onChangeText={handletTitleChange}
                            style={[styles.input, { maxHeight: 200 }]}
                            multiline={true}
                        />
                    </View>



                    <Text></Text>

                    <SelectList
                        setSelected={setSelectedCategory}
                        data={categories}
                        save="value"
                        placeholder='Kategori'
                    />
                    <Text></Text>

                    <SelectList
                        setSelected={setSelectedCounty}
                        data={counties}
                        save="value"
                        placeholder='Fylke'
                    />
                    <>
                        <Text style={styles.label}>Møtested: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Møtested"
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
                                placeholder="Beskrivelse"
                                value={description}
                                onChangeText={handleDescriptionChange}
                                maxLength={(descriptionMaxLength + 1)}
                                multiline={true}
                                style={[styles.input, { maxHeight: 200 }]}

                            />
                        </View>

                        <>
                            <Text style={styles.label}>Maks antall deltakere: </Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Max antall deltakere"
                                    value={max_participants}
                                    onChangeText={handleMaxParticipantChange}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </>
                        <>

                        </>
                        {error && <Text style={{ color: 'red' }}>{error}</Text>}
                    </>
                    <TouchableOpacity style={styles.button} onPress={handleCreateActivity} >
                        <Text style={styles.buttonText}>Opprett ny aktivitet</Text>
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
        height: '10%',
        width: '85%',
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

export default NewActivity;