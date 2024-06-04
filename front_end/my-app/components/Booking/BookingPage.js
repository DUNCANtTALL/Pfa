import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from '../Utils/Colors';
import { Divider } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

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

    useEffect(() => {
        const fetchAppliedBookings = async () => {
          try {
            const response = await axios.get(`http://192.168.17.230:5003/api/bookings/applied/${client}`);
            setBookings(response.data);
          } catch (error) {
            console.error('Error fetching applied bookings:', error);
          }
        };
        fetchAppliedBookings();
    }, [client]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.content}>
            {<AppBar/>}
                <Text style={styles.title}>Saved Jobs </Text>
                <Divider width={1} />
                <ScrollView>
                    {bookings.map((booking, index) => (
                        <Details key={index} booking={booking} />
                    ))}
                </ScrollView>
            </View>
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
        backgroundColor:Colors.PRIMARY,
        paddingTop:30,
    },
    
    title: {
        fontSize: 22,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY,
        paddingLeft: 12,
        paddingBottom: 5,

    },
});
