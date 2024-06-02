import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import AppBar from './appbar';
import { Divider } from 'react-native-elements';
import BottomTabs from './bottom_tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingPage from '../Rating/Rating';

import Colors from '../Utils/Colors';
import { StatusBar } from 'expo-status-bar';

export default function BookingPage({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [client, setClient] = useState(null);
    const [providers, setProviders] = useState({});

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
                            await axios.delete(`http://192.168.100.17:5003/api/bookings/Delete/${id}`);
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

    const handleCompleteBooking = async (booking) => {
        try {
            await axios.put(`http://192.168.100.17:5003/api/bookings/Complete/${booking._id}`);
            setBookings(bookings.map((b) =>
                b._id === booking._id ? { ...b, status: 'Completed' } : b
            ));
            setSelectedBooking({ ...booking, status: 'Completed' });
            setModalVisible(true);
        } catch (error) {
            console.error('Error completing booking:', error);
        }
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
            if (client) {
                try {
                    const response = await axios.get(`http://192.168.100.17:5003/api/bookings/bookings/user/${client}`);
                    setBookings(response.data);
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                }
            }
        };

        fetchBookings();
    }, [client]);

    useEffect(() => {
        const fetchProviders = async () => {
            const providerIds = bookings.map(booking => booking.serviceProvider);
            const uniqueProviderIds = [...new Set(providerIds)];

            const fetchedProviders = {};
            for (const id of uniqueProviderIds) {
                try {
                    const response = await axios.get(`http://192.168.100.17:5003/api/users/getByID/${id}`);
                    fetchedProviders[id] = response.data;
                } catch (error) {
                    console.error('Error fetching provider:', error);
                }
            }

            setProviders(fetchedProviders);
        };

        if (bookings.length > 0) {
            fetchProviders();
        }
    }, [bookings]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const groupBookingsInPairs = (bookings) => {
        const groupedBookings = [];
        for (let i = 0; i < bookings.length; i += 2) {
            groupedBookings.push(bookings.slice(i, i + 2));
        }
        return groupedBookings;
    };

    const getStatusStyle = (status) => {
        return {
            ...styles.statusBox,
            backgroundColor: status === 'confirmed' ? 'green' : status === 'pending' ? 'gray' : 'gray'
        };
    };

    const toggleModal = (booking) => {
        setSelectedBooking(booking);
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.content}>
                <AppBar />
                <Text style={styles.title}>Your Bookings</Text>
                <Divider width={1} />
                {bookings.length === 0 ? (
                    <Text style={styles.noBookingText}>No bookings found.</Text>
                ) : (
                    <FlatList
                        style={styles.FlatList}
                        data={groupBookingsInPairs(bookings)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.bookingRow}>
                                {item.map((booking) => (
                                    <View style={styles.booking} key={booking._id}>

                                        <View style={getStatusStyle(booking.status)}>
                                            <Text style={styles.statusText}>{booking.status}</Text>
                                        </View>
                                        
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBooking(booking._id)}>
                                            <Icon name="trash" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <View style={styles.Details}>
                                            <Text style={styles.bookingTitle}>{booking.service}</Text>
                                            <Text style={styles.bookingDetails}>Category: {booking.category}</Text>
                                            <Text style={styles.bookingDetails}>Date: {formatDate(booking.date)}</Text>
                                            <Text style={styles.bookingDetails}>City: {booking.city}</Text>
                                            <Text style={styles.bookingDetails}>Price: {booking.price}</Text>
                                            <Text style={styles.bookingDetails}>Provider: {providers[booking.serviceProvider]?.name || 'N/A'}</Text>
                                        </View>
                                        {booking.status === 'confirmed' && (
                                            <TouchableOpacity
                                                style={styles.completeButton}
                                                onPress={() => toggleModal(booking)}
                                            >
                                                <Text style={styles.completeButtonText}>Complete</Text>
                                            </TouchableOpacity>
                                        )}
                                       
                                    </View>
                                ))}
                            </View>
                        )}
                    />
                )}
            </View>
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={{ color: 'blue', marginBottom: 10 }}>Close</Text>
                        </TouchableOpacity>
                        {selectedBooking && (
                            <RatingPage booking={selectedBooking} />
                        )}
                    </View>
                </View>
            </Modal>
            <Divider width={2} />
            <BottomTabs />
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
        backgroundColor: Colors.PRIMARY,
        paddingTop:30
        
    },
    FlatList: {
        display: 'flex',
        flexDirection: 'column',
        marginTop:10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY,
        marginLeft: 12,
        marginRight:12,
        marginBottom:5
    },

    noBookingText: {
        fontSize: 19,
        textAlign: 'center',
        color: '#888',
    },
    bookingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    booking: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        borderRadius: 25,
        padding: 0,
        backgroundColor: Colors.GREY,
        justifyContent: 'space-between',
    },

    Details:{
        paddingTop: 22,
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 5,

    },

    bookingTitle: {
        fontSize: 19,
        textTransform: 'uppercase',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBlockColor: Colors.PRIMARY,
        fontWeight: 'bold',
        marginBottom: 9,
        marginTop: 20,
        color: Colors.BLACK,
    },
    bookingDetails: {
        fontSize: 13,
        marginBottom: 5,
        color: '#555',
    },
    deleteButton: {
        position: 'absolute',
        top: 15,
        right: 12,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statusBox: {
        position:'absolute',
        top:20,
        
        margin:'auto',
        width:'100%',
        alignItems: 'center',
    },

    statusText: {
        color: Colors.WHITE,
        textTransform: 'uppercase',
        fontSize:12
    },
    completeButton: {
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        borderColor:Colors.BLACK,
        borderWidth:1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 15,

    },
    
    completeButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },

    ratingButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
    },

    ratingButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 20,


    },
});
