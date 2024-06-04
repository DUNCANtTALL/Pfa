import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ImageBackground } from 'react-native';
import Colors from '../Utils/Colors';  // Ensure this path is correct
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 700 || height >= 1000;

export default function LoginScreen() {
    // Gestion des états des entrées utilisateur
    const [email, setUsername] = useState('');  // Consider renaming setUsername to setEmail for clarity
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Initialize navigation using the useNavigation hook


    // Fonction de gestion de l'appui sur le bouton de connexion
    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://192.168.17.230:5003/api/users/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                const { userId, role } = response.data;
                await AsyncStorage.setItem('userId', userId); 

                if (response.data.role === 'provider') {
                    navigation.navigate('homeUser'); // Replace with the appropriate screen name
                } else {
                    navigation.navigate('homeClient'); // Replace with the appropriate screen name
                }
            } else {
                console.error('Failed to log in:', response.data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    // Fonction de gestion de l'appui sur le lien d'inscription
    const handleSignUp = () => {
        // Navigue vers RoleSelectionScreen
        navigation.navigate('RoleSelection');
    };

    return (
        <ImageBackground
            source={require('../assets/login.png')}  // Ensure this path is correct
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.titleText}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setUsername}  // Consider renaming setUsername to setEmail for clarity
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signUpText}>
                            Don't have an account? Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    formContainer: {
        width: isDesktop ? '40%' : '80%',
        padding: 20,
        borderBottomRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: Colors.WHITE,
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
    signUpText: {
        color: Colors.PRIMARY,
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
    },
});
