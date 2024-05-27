// BottomTabs.js
import React from 'react';
import { View, Text, TouchableOpacity ,Dimensions} from 'react-native';
import { Icon, colors } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

import Colors from '../Utils/Colors';

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

export default function BottomTabs() {
  const navigation = useNavigation(); // Initialize navigation using the useNavigation hook

 
  const icons = [
    {
      icon: 'home',
      text: 'Home',
      color: 'grey',
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
        color: Colors.PRIMARY,
        screen: 'Profile', // Specify the screen to navigate to when this icon is pressed
    },
  ];

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flexDirection: 'row', margin: 10, marginHorizontal: 30, justifyContent: 'space-between' ,width: isDesktop ? '40%' : "90%", alignItems: 'center', alignSelf:'center',}}>
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
