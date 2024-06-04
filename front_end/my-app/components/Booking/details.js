import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import Colors from '../Utils/Colors';

export default function Details({ booking }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://192.168.17.230:5003/api/users/getByID/${booking.client}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUser();
    }, [booking.client]);

    const groupDetailsInPairs = (details) => {
        const groupedDetails = [];
        for (let i = 0; i < details.length; i += 2) {
            groupedDetails.push(details.slice(i, i + 2));
        }
        return groupedDetails;
    };

    const bookingDetails = [
        { label: 'Service', value: booking.service },
        { label: 'City', value: booking.city },
        { label: 'Category', value: booking.category },
        { label: 'Price', value: booking.price },
        { label: 'Status', value: booking.status },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {user && <Text style={styles.jobTitle}>{user.name}</Text>}
                {groupDetailsInPairs(bookingDetails).map((pair, index) => (
                    <View key={index} style={styles.row}>
                        {pair.map((detail, idx) => (
                            <View key={idx} style={styles.infoBox}>
                                <Text style={styles.infoLabel}>{detail.label}:</Text>
                                <Text style={styles.infoText}>{detail.value}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:5,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:10,
        paddingRight:10,
        
    },

    jobTitle: {
        fontSize: 19,
        textTransform: 'uppercase',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBlockColor: Colors.PRIMARY,
        fontWeight: 'bold',
        marginBottom: 9,
        color: Colors.BLACK,
    },

    infoContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.BLACK,
        borderRadius: 25,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 8,
        borderRadius: 25,
        borderWidth:2,
        
    },

    infoBox: {
        flex: 1,
        
    },

    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.BLACK,
        textTransform: 'uppercase',

    },

    infoText: {
        fontSize: 14,
        marginBottom: 5,
        color: Colors.DARKGREY,
        backgroundColor:Colors.LIGHT_GREY
        
    },
});