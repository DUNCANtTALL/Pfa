// Details.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../Utils/Colors';
import { Icon } from 'react-native-elements';

export default function Details({ job, handleSaveJob, handleApply, savedJobs }) {
    const isSaved = savedJobs.includes(job);

    return (
        <View style={styles.container   } >
            <View style={styles.img}>
                <Image source={require('../assets/painter.jpg')} style={styles.photo} />
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{job}</Text>
            </View>
            {/* Grande zone de description */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description:</Text>
                <Text style={styles.descriptionText}>
                    {/* Placeholder pour les informations détaillées sur le service */}
                    Nom Prenom {'\n'}
                    Catégorie: Peinture {'\n'}
                    Prix: 2400DH {'\n'}
                    Autres informations...
                </Text>
            </View>

            {/* Enregistrer le container */}
            <TouchableOpacity
                style={[styles.saveButton, { top: 10, right: 10 }, isSaved && { backgroundColor: 'grey' }]}
                onPress={() => handleSaveJob(job)}
            >
                <Icon name={isSaved ? 'bookmark' : 'bookmark-o'} type='font-awesome' color='white' size={20} />
            </TouchableOpacity>
            
            {/* Appliquer */}
            <TouchableOpacity onPress={handleApply} style={[styles.applyButton, { width: '100%' }]}>
                <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        width: isDesktop ? '50%' : '90%',
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },

    photo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },

    img: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },

    userInfo: {
        alignItems: 'center',
    },

    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.WHITE,
    },

    saveButton: {
        position: 'absolute',
        backgroundColor: '#529A69',
        padding: 15,
        borderRadius: 5,
    },

    applyButton: {
        backgroundColor: '#529A69',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 15,
        alignItems: 'center',
    },

    buttonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
        
    },

    descriptionContainer: {
        marginTop: 10,
    },

    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.WHITE,
    },

    descriptionText: {
        fontSize: 15,
        color: Colors.WHITE,
        alignSelf: 'center',
    },

});
