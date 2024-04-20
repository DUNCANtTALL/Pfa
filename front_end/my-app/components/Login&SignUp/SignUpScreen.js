import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions,ImageBackground } from 'react-native';
import Colors from '../Utils/Colors';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation, route }) {
    // Obtenez le rôle sélectionné de la route
    const { role } = route.params;

    // States pour gérer les entrées utilisateur
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Fonction de gestion de l'appui sur le bouton d'inscription
    const handleSignUp = () => {
        // Implémentez votre logique d'inscription ici
        console.log(`Sign up as ${role}:`, { username, password, email });
        // Naviguez vers l'écran principal après l'inscription réussie
        navigation.navigate('MainScreen');
    };

    return (
        <ImageBackground
        source={require('../assets/login.png')} // Remplacez par le chemin de votre GIF
        style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.formContainer}>
                    <Text style={styles.titleText}>Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const isDesktop = width >= 700 || height >= 1000;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    formContainer: {
        width: isDesktop ? '35%' : '80%', // Si ordinateur
        padding: 20,
        borderBottomRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: Colors.WHITE,
        //opacity: 0.5, // Ajustez l'opacité si nécessaire
    },
    titleText: {
        fontSize: 24,
        color: Colors.PRIMARY,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: Colors.WHITE,
    },
});
