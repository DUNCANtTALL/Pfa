import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Dimensions, ImageBackground} from 'react-native';
import Colors from '../Utils/Colors';

const { width, height } = Dimensions.get('window');

export default function RoleSelectionScreen({ navigation }) {
    // Fonction de gestion de l'appui pour chaque rôle
    const handleRoleSelection = (role) => {
        // Naviguer vers SignUpScreen avec le rôle sélectionné
        navigation.navigate('SignUp', { role });
    };

    return (
        <ImageBackground
            source={require('../assets/login.png')} // Remplacez par le chemin de votre GIF
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Your Role</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('client')}>
                    <Text style={styles.buttonText}>Client</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('provider')}>
                    <Text style={styles.buttonText}>Service Provider</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const isDesktop = width >= 700 || height >= 1000;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: isDesktop ? '100%': '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Utilisez une couleur de fond pour la lisser
    },
    title: {
        padding: 12,
        fontSize: isDesktop ? 24 : 20,
        backgroundColor: Colors.WHITE,
        //opacity: 0.5, // Ajustez l'opacité si nécessaire
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        width: isDesktop ? '20%' : '40%', // Si ordinateur,
        color: Colors.BLACK,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 60,
        margin: 10,
        width: isDesktop ? '30%' : '80%', // Si ordinateur,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: isDesktop ? 22 : 18,
        color: Colors.PRIMARY,
    },
});