import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function BookingPage({ route, navigation }) {
    const [bookings, setBookings] = useState([]);
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

    // Simulating the retrieval of bookings from AsyncStorage or other storage
    useEffect(() => {
        const fetchAppliedBookings = async () => {
          try {
            const response = await axios.get(`http://192.168.1.3:5003/api/bookings/applied/${client}`);
            setBookings(response.data);
          } catch (error) {
            console.error('Error fetching applied bookings:', error);
          }
        };
      
        fetchAppliedBookings();
      }, []);

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
