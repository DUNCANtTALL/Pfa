import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function Details({ job }) {
    return (
        <View style={styles.container}>
            <Text style={styles.jobTitle}>{job}</Text>
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
    },
});
