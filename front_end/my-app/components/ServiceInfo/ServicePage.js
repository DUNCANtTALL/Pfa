import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, StyleSheet, Dimensions, ScrollView ,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Utils/Colors';
import AppBar from './appbar'; // Assurez-vous d'importer AppBar s'il n'est pas déjà importé
import { Divider } from 'react-native-elements';
import BottomTabs from './bottom_tabs';
import { useNavigation } from '@react-navigation/native';

export default function ServiceProfile({ route }) {
    const { provider, rating, bookings } = route.params;
    const [, setBookings] = useState([]);
    const navigation = useNavigation();


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleAccept = async (providerId, bookingId) => {
        try {
            const response = await fetch(`http://192.168.17.230:5003/api/bookings/assignProvider`, {
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <AppBar />
            <ScrollView style={styles.Infocontainer}>
                <View style={styles.Details}>
                    <View style={styles.img}>
                        <Image source={require('../assets/painter.jpg')} style={styles.photo} />
                    </View>
                    
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>Name: {provider.name}</Text>
                        <Text style={styles.email}>Email: {provider.email}</Text>
                        <View style={styles.rating}>
                            <View style={styles.star}>
                                <Ionicons name="star" color={'#F99A0E'} size={20} />
                                <Text style={styles.ratText}>{rating}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bookingsContainer}>
                    <Text style={styles.bookingsTitle}>Services:</Text>
                    {bookings.map((booking) => (
                        <View key={booking._id} style={styles.booking}>
                            <View style={styles.Infobooking}> 
                                <Text style={styles.bookingDetail}>Date: {formatDate(booking.date)}</Text>
                                <Text style={styles.bookingDetail}>Category: {booking.category}</Text>
                                <Text style={styles.bookingDetail}>Name: {booking.name}</Text>
                            </View>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(provider._id, booking._id)} >
                                <Text style={styles.acceptButtonText}>Accepter</Text>
                            </TouchableOpacity>
                        </View>
                        
                    ))}
                </View>
            </ScrollView>
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
        paddingTop:30
    },
    Infocontainer: {
        flex: 1,

    },
    Details:{
        backgroundColor:Colors.DARKPRIMARY,
        elevation:15,
        borderBottomWidth:1
    },
    img: {
        alignItems: 'center',
        marginTop: 16,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 75,
    },
    userInfo: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        margin: 10,
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 6,
        color: Colors.WHITE,
        marginHorizontal:25
    },
    email: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 6,
        color: Colors.WHITE,
        marginHorizontal:25

    },
    rating: {
        backgroundColor:Colors.GREY,
        padding: 8,
        paddingRight:25,
        borderRadius: 50,
        borderColor: Colors.BLACK,
        marginHorizontal:25
    },
    star: {
        flexDirection:'row',
        alignItems: 'center',
    },
    ratText: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    bookingsContainer: {
        marginTop: 0,
        backgroundColor:Colors.PRIMARY,

    },
    bookingsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        color: Colors.WHITE,
        textTransform: 'uppercase',
    },
    booking: {
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal:5,
        elevation:15
    },
    Infobooking:{
        padding:15
    },
    bookingDetail: {
        fontSize: 16,
        color: Colors.BLACK,
    },
    acceptButton: {
        backgroundColor: Colors.DARKPRIMARY,
        position:'absolute',
        top:'0%',
        right: '10%',
        height:'100%',
        justifyContent: 'center',
        elevation:10
    },
    acceptButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
        paddingHorizontal:5
    },
});
