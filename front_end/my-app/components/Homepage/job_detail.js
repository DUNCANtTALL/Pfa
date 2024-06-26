import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingPage from '../Rating/Rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function JobDetail() {
    const [modalVisible, setModalVisible] = useState(false);
    const [client, setClient] = useState(null);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({});

    const [bookings, setBookings] = useState([]);
    const navigation = useNavigation();

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
        const fetchProviders = async () => {
            if (!client) return;

            try {
                const response = await fetch(`http://192.168.100.17:5003/api/bookings/user/${client}/providers`);
                const data = await response.json();

                setProviders(data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, [client]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        const fetchAppliedBookings = async (providerId) => {
            try {
                const response = await fetch(`http://192.168.100.17:5003/api/bookings/GetProviderByID/${providerId}`);
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching applied bookings:', error);
            }
        };

        providers.forEach(provider => fetchAppliedBookings(provider._id));
    }, [providers]);

    useEffect(() => {
        const fetchRatings = async (providerId) => {
            try {
                const response = await fetch(`http://192.168.100.17:5003/api/ratings/Avg/${providerId}`);
                const data = await response.json();
                setRatings(prevState => ({ ...prevState, [providerId]: data.averageRating }));
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        providers.forEach(provider => fetchRatings(provider._id));
    }, [providers]);

    const handleAccept = async (providerId, bookingId) => {
        try {
            const response = await fetch(`http://192.168.100.17:5003/api/bookings/assignProvider`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    providerId,
                    bookingId,
                }),
            });

            if (response.ok) {
                const updatedBookings = bookings.map(booking =>
                    booking._id === bookingId ? { ...booking, providerId, status: 'Assigned' } : booking
                );
                setBookings(updatedBookings);
                navigation.navigate('BookingUser');
            } else {
                console.error('Failed to assign provider');
            }
        } catch (error) {
            console.error('Error assigning provider:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ borderWidth: 1, borderColor: '#CACACA', margin: 12, borderRadius: 10 }}>
            {providers.map(provider => (
                <View key={provider._id}>
                    <TouchableOpacity onPress={toggleModal}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Image source={require('../assets/painter.jpg')} style={{ width: 50, height: 50, borderRadius: 7 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold' }}>{provider.name}</Text>
                                <View style={{ paddingLeft: 200 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Ionicons name='star' color='#F99A0E' size={20} />
                                        <View style={{ width: 5 }} />
                                        <Text>{ratings[provider._id]}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 7 }}>
                                    <Text>{provider.email}</Text>
                                </View>

                                {bookings.map(booking => (
                                    <View key={booking._id}>
                                        <View style={styles.bookingInfo}>
                                            <Text>Date: {booking.date}</Text>
                                        </View>
                                        <View style={styles.bookingInfo}>
                                            <Text>Category: {booking.category}</Text>
                                        </View>
                                        <View style={styles.bookingInfo}>
                                            <Text>Name: {booking.name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#529A69', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 4 }}
                                            onPress={() => handleAccept(provider._id, booking._id)}
                                        >
                                            <Text style={{ color: 'white' }}>Accepter</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider width={1} color='#CACACA' />
                </View>
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleModal}>
                            <RatingPage />
                            <Text style={{ color: 'blue', marginTop: 10 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    bookingInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
    },
});
