import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';

export default function BookingPage({ route, navigation }) {
    const [bookings, setBookings] = useState([]);

    // Simulating the retrieval of bookings from AsyncStorage or other storage
    useEffect(() => {
        // Fetch bookings for the logged-in provider and update state
        // For now, let's assume bookings are passed through props
        const providerBookings = route.params?.bookings ?? [];
        setBookings(providerBookings);
    }, [route.params?.bookings]);

    return (
        <SafeAreaView style={styles.container}>
            <AppBar />
            <View style={styles.content}>
                <Text style={styles.title}>Saved Jobs</Text>
                <ScrollView>
                    {bookings.map((booking, index) => (
                        <Details key={index} booking={booking} />
                    ))}
                </ScrollView>
            </View>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
