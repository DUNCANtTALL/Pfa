import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../components/Utils/Colors';

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

export default function BottomTabs({ savedJobs }) {
    const navigation = useNavigation();

    const icons = [
        {
            icon: 'home',
            text: 'Home',
            color: 'grey',
            screen: 'homeUser', 
        },
        {
            icon: 'today',
            text: 'Calendar',
            color: 'grey',
            screen: 'Calendar',
        },
        {
            icon: 'bookmark-outline',
            text: 'Booking',
            color: Colors.PRIMARY,
            screen: 'Booking', 
        },
        {
            icon: 'person-outline',
            text: 'Profile',
            color: 'grey',
            screen: 'Profile',
        },
    ];

    const handleIconPress = (screenName) => {
        if (screenName === 'Booking') {
            navigation.navigate(screenName, { savedJobs });
        } else {
            navigation.navigate(screenName);
        }
    };

    return (
        <View style={{ flexDirection: 'row', margin: 10, marginHorizontal: 30, justifyContent: 'space-between', width: isDesktop ? '40%' : "90%", alignItems: 'center', alignSelf: 'center', }}>
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
