import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions, FlatList,TouchableOpacity,Alert } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function BookingPage({ route, navigation }) {
    const [bookings, setBookings] = useState([]);
    const [client, setClient] = useState(null);
    const handleDeleteBooking = async (id) => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this booking?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.1.3:5003/api/bookings/Delete/${id}`);
                            setBookings(bookings.filter((booking) => booking._id !== id));
                        } catch (error) {
                            console.error('Error deleting booking:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };


    useEffect(() => {
        const getClientId = async () => {
            try {
                const storedClientId = await AsyncStorage.getItem('userId');
                setClient(storedClientId);
            } catch (error) {
                console.error('Error fetching client ID from AsyncStorage:', error);
            }
        };

        getClientId();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://192.168.100.17:5003/api/bookings/bookings/user/${client}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [client]);

    return (
        <SafeAreaView style={styles.container}>
            <AppBar />
            <View style={styles.content}>
                <Text style={styles.title}>Your Bookings</Text>
                {bookings.length === 0 ? (
                    <Text style={styles.noBookingText}>No bookings found.</Text>
                ) : (
                    <FlatList
                data={bookings}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.booking}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBooking(item._id)}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.bookingTitle}>{item.service}</Text>
                <Text style={styles.bookingDetails}>Category: {item.category}</Text>
                <Text style={styles.bookingDetails}>Date: {item.date}</Text>
                <Text style={styles.bookingDetails}>City: {item.city}</Text>
                <Text style={styles.bookingDetails}>Price: {item.price}</Text>
                <Text style={styles.bookingDetails}>Provider: {item.serviceProvider}</Text>
                <Text style={styles.bookingDetails}>Status: {item.status}</Text>
        </View>
    )}
/>
                )}
            </View>
            <BottomTabs/>
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noBookingText: {
        fontSize: 18,
        textAlign: 'center',
    },
    booking: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#fff',
        elevation: 3,
    },
    bookingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bookingDetails: {
        fontSize: 16,
        marginBottom: 3,
    },deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    
});
