import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';

export default function BookingPage({ route, navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <AppBar />
            <View style={styles.content}>
                <Text style={styles.title}>Saved Jobs</Text>
                <ScrollView>
                    {savedJobs.length > 0 ? (
                        savedJobs.map((job, index) => (
                            <Details key={index} job={job} />
                        ))
                    ) : (
                        <Text>No saved jobs.</Text>
                    )}
                </ScrollView>
            </View>
            <BottomTabs savedJobs={savedJobs} />
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
