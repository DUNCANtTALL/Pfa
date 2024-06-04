import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import Colors from '../Utils/Colors';
import { StatusBar } from 'expo-status-bar';


export default function CalendarPage({ navigation }) {
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const onDayPress = (day) => {
        const date = day.dateString;
        if (events[date]) {
            setSelectedDate(date);
            setSelectedEvent(events[date]);
            setTime(events[date].time);
            setDescription(events[date].description);
            setModalVisible(true);
        } else {
            const updatedMarkedDates = { ...markedDates, [date]: { selected: true, marked: true, selectedColor: Colors.PRIMARY } };
            setMarkedDates(updatedMarkedDates);
            setSelectedDate(date);
            setSelectedEvent(null);
            setModalVisible(true);
        }
    };

    const addEvent = () => {
        const updatedEvents = { ...events, [selectedDate]: { time, description } };
        setEvents(updatedEvents);
        setTime('');
        setDescription('');
        setModalVisible(false);
    };

    const removeEvent = () => {
        const updatedEvents = { ...events };
        delete updatedEvents[selectedDate];
        setEvents(updatedEvents);

        const updatedMarkedDates = { ...markedDates };
        delete updatedMarkedDates[selectedDate];
        setMarkedDates(updatedMarkedDates);

        setSelectedDate(null);
        setModalVisible(false);
    };

    const handleEventPress = (date) => {
        setSelectedDate(date);
        setSelectedEvent(events[date]);
        setTime(events[date].time);
        setDescription(events[date].description);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.content} >
                <AppBar />
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <View style={styles.calendarContainer}>
                            <Calendar
                                onDayPress={onDayPress}
                                markedDates={markedDates}
                                theme={{
                                    selectedDayBackgroundColor: Colors.PRIMARY,
                                    todayTextColor: Colors.PRIMARY,
                                }}
                            />
                        </View>
                    </View>
                    <Details events={events} handleEventPress={handleEventPress} />
                </ScrollView>
                <BottomTabs />
            </View>

            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                    {selectedEvent ? (
                        <>
                            <Text style={styles.modalTitle}>Modifier l'événement pour {selectedDate}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Heure"
                                value={time}
                                onChangeText={setTime}
                            />
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                            <TouchableOpacity style={styles.Modifierbutton} onPress={addEvent}>
                                <Text style={styles.buttonText}>Modifier</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={removeEvent}>
                                <Text style={styles.buttonText}>Supprimer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Annuler</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.modalTitle}>Ajouter un événement pour {selectedDate}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Heure"
                                value={time}
                                onChangeText={setTime}
                            />
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                            <TouchableOpacity style={styles.Addbutton} onPress={addEvent}>
                                <Text style={styles.buttonText}>Ajouter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={removeEvent}>
                                <Text style={styles.buttonText}>Annuler</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}


const { width, height } = Dimensions.get('window');

const isDesktop = width >= 600 || height >= 1024;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FA',
        paddingHorizontal: isDesktop ? 20 : 0,
        
    },

    content:{
        flex: 1,
        paddingTop:30,
    },

    contentContainer:{
        margin: isDesktop ? 20 : 5
    },

    calendarContainer: {
        margin: 20,

        borderWidth:2,
        borderColor:Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: isDesktop ? 20 : 10,
        elevation: 5,

        width : isDesktop ? '60%' : '100%',
        alignSelf:'center',

    },
    modalContent: {
        backgroundColor: 'white',
        padding: isDesktop ? 30 : 20,
        borderRadius: 20,

        width : isDesktop ? '40%' : '100%',
        alignSelf:'center',
    },

    modalTitle: {
        fontSize: isDesktop ? 21 : 19,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    input: {
        height: 40,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,

    },

    descriptionInput: {
        height: 100,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
    },

    button: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10

    },
    
    buttonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },

    Addbutton: {
        backgroundColor: Colors.GREEN,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },

    Modifierbutton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },

    deleteButton: {
        backgroundColor: Colors.RED,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },

    cancelButton: {
        backgroundColor: 'grey',
    },
});
