// BottomTabs.js
import React from 'react';
import { StyleSheet,View, Text, TouchableOpacity ,Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import HomeUser from './homeUser';
import Form from '../formulaireUser/formulaire';
import ProfilePage from '../Profile/ProfilePage';
import Colors from '../../components/Utils/Colors';

const { width, height } = Dimensions.get('window');

const isDesktop = width >= 700 || height >= 1000;

export default function BottomTabs() {
  const navigation = useNavigation(); // Initialize navigation using the useNavigation hook

  const icons = [
    {
      icon: 'home',
      text: 'Home',
      color: Colors.PRIMARY,
      screen: 'homeClient', // Specify the screen to navigate to when this icon is pressed
    },
    {
      icon: 'search',
      text: 'Trouver service',
      color: 'grey',
      screen: 'form', // Specify the screen to navigate to when this icon is pressed
    },
    {
      icon: 'bookmark-outline',
      text: 'Travaux',
      color: 'grey',
      screen: 'BookingUser', // Specify the screen to navigate to when this icon is pressed
    },
    {
        icon: 'person-outline',
        text: 'Profile',
        color: 'grey',
        screen: 'ServiceProfile', // Specify the screen to navigate to when this icon is pressed
    },
  ];

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.tab}>
      {icons.map((icon, i) => (
        <Icons key={i} {...icon} onPress={() => handleIconPress(icon.screen)} />
      ))}
    </View>
  );
}

const Icons = ({ icon, text, color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Icon type={'ionicons'} color={color} name={icon} size={25} style={{ marginBottom: 3, alignSelf: 'center' }} />
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
   tab:{
    flexDirection: 'row', 
    margin: 10, 
    marginHorizontal: 30, 
    justifyContent: 'space-between',
   

   }
  });
