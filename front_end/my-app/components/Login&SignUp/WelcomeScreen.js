import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../Utils/Colors';


const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    const handlePress = () => {
        navigation.navigate('Login'); // Navigue vers l'écran "Login" lorsqu'on appuie sur le bouton
    };

    return (
        // Utilisez ImageBackground pour définir le GIF comme arrière-plan
        <ImageBackground
            source={require('../assets/login.png')} // Chemin de votre GIF
            style={styles.backgroundImage}
            resizeMode="cover" // Le GIF couvrira tout l'écran
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.titleText}>
                        Let's Find
                        <Text style={styles.boldText}> Professional Service</Text>
                    </Text>
                    <Text style={styles.descriptionText}>
                        Best app to find services near you which deliver professional service.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Let's Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Légère superposition pour lisser les éléments
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 25,
        borderBottomRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: Colors.WHITE,
        width: isDesktop ? width * 0.4 : width * 0.8,
        //opacity: 0.5, // Ajustez l'opacité si nécessaire
    },
    titleText: {
        fontSize: isDesktop ? 30 : 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    boldText: {
        color: Colors.PRIMARY,
    },
    descriptionText: {
        fontSize: isDesktop ? 22 : 18,
        color: '#333',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 30,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 50,
        width: isDesktop ? '60%' : '90%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: isDesktop ? 24 : 20,
        color: Colors.WHITE,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});


