import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

export default function Details({ booking }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://192.168.100.17:5003/api/users/getByID/${booking.client}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUser();
    }, [booking.userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.jobTitle}>{booking.title}</Text>
            <View style={styles.infoContainer}>
                {user && <Text style={styles.infoText}>Client Name: {user.name}</Text>}
                <Text style={styles.infoText}>Service: {booking.service}</Text>
                <Text style={styles.infoText}>City: {booking.city}</Text>
                <Text style={styles.infoText}>Category: {booking.category}</Text>
                <Text style={styles.infoText}>Price: {booking.price}</Text>
                <Text style={styles.infoText}>Status: {booking.status}</Text>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eaeaea',
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    
});
