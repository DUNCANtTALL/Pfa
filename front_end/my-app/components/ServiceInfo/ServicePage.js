// ServicePage.js
import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import Colors from '../Utils/Colors';

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

export default function ServicePage({ navigation }) {
    const [savedJobs, setSavedJobs] = useState([]);

    const handleSaveJob = (job) => {
        if (savedJobs.includes(job)) {
            setSavedJobs(savedJobs.filter(savedJob => savedJob !== job));
        } else {
            setSavedJobs([...savedJobs, job]);
        }
    };

    const handleApply = () => {
        // Implémentez la logique d'application ici
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <AppBar />
                <ScrollView>
                    {/* Passez les fonctions handleSaveJob et handleApply en tant que props */}
                    <Details job="Paindre une maison" handleSaveJob={handleSaveJob} handleApply={handleApply} savedJobs={savedJobs} />
                </ScrollView>
                <BottomTabs />
            </View>
            </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: Colors.WHITE,
},
profileContainer: {
flex: 1,
paddingTop: 15,
},
});