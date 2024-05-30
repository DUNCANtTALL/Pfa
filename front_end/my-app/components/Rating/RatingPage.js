import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import Colors from '../Utils/Colors';
import RatingComponent from './Rating';

export default function RatingPage({ booking, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <AppBar />
                            <Details booking={booking} />
                            <RatingComponent booking={booking} />
                        </ScrollView>
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: Colors.WHITE,
    },
});
