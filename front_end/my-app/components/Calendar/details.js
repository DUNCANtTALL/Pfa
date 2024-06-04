import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../Utils/Colors';

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

export default function Details({ events, handleEventPress }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Evenements</Text>
            {Object.entries(events).map(([date, event], index) => (
                <TouchableOpacity key={index} onPress={() => handleEventPress(date)}>
                    <View style={styles.eventItem}>
                        <Text style={styles.date}>{date}</Text>
                        <Text style={styles.time}>{event.time}</Text>
                        <Text style={styles.description}>{event.description}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: isDesktop ? 30 : 20,
    },
    title: {
        fontSize: isDesktop ? 24 : 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',

        width : isDesktop ? '80%' : '100%',
        alignSelf:'center',

    },
    eventItem: {
        marginBottom: 20,
        padding: isDesktop ? 20 : 10,
        borderRadius: 10,
        backgroundColor: Colors.GREY,
        elevation: 8,

        width : isDesktop ? '80%' : '100%',
        alignSelf:'center',
    },
    
    date: {
        fontSize: isDesktop ? 20 : 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    time: {
        fontSize: isDesktop ? 18 : 14,
        marginBottom: 5,
        color: Colors.DARKGREY,
        backgroundColor:Colors.LIGHT_GREY
    },
    description: {
        fontSize: isDesktop ? 18 : 14,
        color: 'grey',
        color: Colors.DARKGREY,
        backgroundColor:Colors.LIGHT_GREY
    },
});
