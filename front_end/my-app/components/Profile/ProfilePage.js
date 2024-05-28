import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity ,Dimensions} from 'react-native';
import { Divider } from 'react-native-elements';
import AppBar from './appbar';
import BottomTabs from './bottom_tabs';
import Details from './details';
import Colors from '../../components/Utils/Colors';

export default function ProfilePage({ navigation }) {
    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        // Ajoutez votre logique de déconnexion ici
        // Par exemple, naviguer vers l'écran de connexion ou nettoyer l'état d'utilisateur
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <ScrollView>
                  <AppBar />
                  <Details />
                  {/* Ajout des boutons */}
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking')}>
                      <Text style={styles.buttonText}>My Booking</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactUs')}>
                      <Text style={styles.buttonText}>Contact Us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleLogout}>
                      <Text style={styles.buttonText}>Log Out</Text>
                  </TouchableOpacity>
                  {/* Fin des boutons */}                
                </ScrollView>
              <BottomTabs />
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
    profileContainer: {
        flex: 1,
        paddingTop:15,

    },
    button: {
    width: isDesktop ? '20%' : "45%",
    padding: 12,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 99,
      alignItems: 'center',
      alignSelf:'center',
      marginTop: 25,
    },
    buttonText: {
        fontSize: 17,
        color: Colors.WHITE,
    },
});
