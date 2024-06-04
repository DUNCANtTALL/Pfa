import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingPage from '../Rating/Rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Utils/Colors';

export default function JobDetail() {
    const [modalVisible, setModalVisible] = useState(false);
    const [client, setClient] = useState(null);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({});
    const [bookings, setBookings] = useState({});
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
                const uniqueProviders = Array.from(new Set(data.map(provider => provider._id)))
                    .map(id => {
                        return data.find(provider => provider._id === id);
                    });
                setProviders(uniqueProviders);
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
        const fetchAppliedBookings = async (providerBookings) => {
            const bookingDetails = [];
            for (const bookingId of providerBookings) {
                try {
                    const response = await fetch(`http://192.168.100.17:5003/api/bookings/bookings/${bookingId}`);
                    const data = await response.json();
                    bookingDetails.push(data);
                } catch (error) {
                    console.error('Error fetching applied bookings:', error);
                }
            }
            return bookingDetails;
        };

        const fetchAllBookings = async () => {
            const allBookings = {};
            for (const provider of providers) {
                const bookingDetails = await fetchAppliedBookings(provider.bookings);
                allBookings[provider._id] = bookingDetails;
            }
            setBookings(allBookings);
        };

        fetchAllBookings();
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
                const updatedBookings = { ...bookings };
                updatedBookings[providerId] = updatedBookings[providerId].map(booking =>
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleProviderInfoPress = (provider) => {
        navigation.navigate('ServiceProfile', { provider });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {providers.map(provider => (
                <View key={provider._id}>
                    <View onPress={toggleModal}>
                        <View style={styles.providerContainer}>
                            <TouchableOpacity style={styles.providerInfo} onPress={() => handleProviderInfoPress(provider)}>
                                <Image source={require('../assets/painter.jpg')} style={styles.providerImage} />

                                <View>
                                    <Text style={styles.providerName}>{provider.name}</Text>
                                    <Text style={styles.providerEmail}>{provider.email}</Text>
                                </View>

                                <View style={styles.ratingContainer}>
                                    <Ionicons name='star' color='#F99A0E' size={20} padding={5} backgroundColor={Colors.LIGHT_GREY} />
                                    <View style={styles.ratingSpacer}></View>
                                    <Text backgroundColor={Colors.LIGHT_GREY} padding={5}>{ratings[provider._id]} </Text>
                                </View>
                            </TouchableOpacity>

                            <ScrollView style={styles.bookingRow} horizontal>
                                {bookings[provider._id] && bookings[provider._id].map(booking => (
                                    <View key={booking._id} style={styles.bookingContainer}>
                                        <View style={styles.ContainerInfo}>
                                            <Text style={styles.titleContainer}>Date</Text>
                                            <Text style={styles.bookingInfo}>{formatDate(booking.date)}</Text>
                                        </View>

                                        <View style={styles.ContainerInfo}>
                                            <Text style={styles.titleContainer}>Category</Text>
                                            <Text style={styles.bookingInfo}>{booking.category}</Text>
                                        </View>

                                        <View style={styles.ContainerInfo}>
                                            <Text style={styles.titleContainer}>Name</Text>
                                            <Text style={styles.bookingInfo}>{booking.name}</Text>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.acceptButton}
                                            onPress={() => handleAccept(provider._id, booking._id)}
                                        >
                                            <Text style={styles.acceptButtonText}>Accepter</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
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
                            <Text style={styles.closeText}>Close</Text>
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
    container: {
        marginTop: 2,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        height: 'auto',
        maxWidth: '100%',
    },
    providerContainer: {
        flexDirection: 'column',
        padding: 5,
    },
    providerImage: {
        width: 52,
        height: 52,
        borderRadius: 7,
    },
    providerInfo: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    providerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 5,
    },
    providerEmail: {
        fontSize: 15,
        marginLeft: 15,
        padding: 5,
        backgroundColor: Colors.LIGHT_GREY,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
        width: '75%',
    },
    ratingSpacer: {
        width: 5,
        backgroundColor: Colors.LIGHT_GREY,
    },
    bookingRow: {
        borderRadius: 2,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        padding: 0,
        height: 'auto',
    },
    bookingContainer: {
        marginTop: 2,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        height: 'auto',
        width: 200, // Fixed width for horizontal scroll
    },
    ContainerInfo: {},
    titleContainer: {
        flexDirection: 'column',
        textTransform: 'uppercase',
        marginTop: 10,
        marginLeft: 10,
    },
    bookingInfo: {
        backgroundColor: Colors.LIGHT_GREY,
        color: Colors.DARKGREY,
        marginLeft: 10,
        marginBottom: 5,
    },
    acceptButton: {
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,
    },
    acceptButtonText: {
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    closeText: {
        color: 'blue',
        marginTop: 10,
    },
});
