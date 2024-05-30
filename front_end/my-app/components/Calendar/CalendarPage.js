import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import axios from 'axios';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import Colors from '../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CalendarPage({ navigation }) {
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [client, setClient] = useState(null);



    
    useEffect(() => {
        const getClientId = async () => {
            try {
                const storedClientId = await AsyncStorage.getItem('userId');
                if (storedClientId) {
                    setClient(storedClientId);
                } else {
                    console.error('Client ID not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching client ID from AsyncStorage:', error);
            }
        };
        getClientId();
    }, []);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://192.168.100.17:5003/api/events/GetAll/${client}`);
            const eventsData = response.data;
            const newMarkedDates = {};
            const newEvents = {};
            eventsData.forEach(event => {
                newMarkedDates[event.date] = { selected: true, marked: true, selectedColor: Colors.PRIMARY };
                newEvents[event.date] = { time: event.time, description: event.description };
            });
            setMarkedDates(newMarkedDates);
            setEvents(newEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    

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

    const saveEvent = async () => {
        try {
            const eventData = { date: selectedDate, time, description, user:client };
            await axios.post('http://192.168.100.17:5003/api/events/Add', eventData);
            setEvents({ ...events, [selectedDate]: { time, description } });
            setTime('');
            setDescription('');
            setModalVisible(false);
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const deleteEvent = async () => {
        try {
            await axios.delete(`http://192.168.100.17:5003/api/events/delete/${selectedDate}`);
            const updatedEvents = { ...events };
            delete updatedEvents[selectedDate];
            setEvents(updatedEvents);

            const updatedMarkedDates = { ...markedDates };
            delete updatedMarkedDates[selectedDate];
            setMarkedDates(updatedMarkedDates);

            setSelectedDate(null);
            setModalVisible(false);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
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
            <AppBar />
            <ScrollView>
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
                <Details events={events} handleEventPress={handleEventPress} />
            </ScrollView>
            <BottomTabs />

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
                            <TouchableOpacity style={styles.button} onPress={saveEvent}>
                                <Text style={styles.buttonText}>Modifier</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={deleteEvent}>
                                <Text style={styles.buttonText}>Supprimer</Text>
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
                            <TouchableOpacity style={styles.button} onPress={saveEvent}>
                                <Text style={styles.buttonText}>Ajouter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
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
        paddingHorizontal: isDesktop ? 20 : 10,
    },
    calendarContainer: {
        margin: 20,
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: isDesktop ? 20 : 10,
        elevation: 5,
        width: isDesktop ? '60%' : '100%',
        alignSelf: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: isDesktop ? 30 : 20,
        borderRadius: 10,
        width: isDesktop ? '40%' : '100%',
        alignSelf: 'center',
    },
    modalTitle: {
        fontSize: isDesktop ? 24 : 18,
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
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
