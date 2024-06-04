import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function AppBar() {
  const navigation = useNavigation();
  const [client, setClient] = useState(null);
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getClientId = async () => {
      try {
        const storedClientId = await AsyncStorage.getItem('userId');
        if (storedClientId) {
          setClient(storedClientId);
        } else {
          console.error('Client ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching client ID from AsyncStorage:', error);
      }
    };
    getClientId();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!client) return;

      try {
        const response = await axios.get(`http://192.168.17.230:5003/api/users/getByID/${client}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserData();
  }, [client]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!client) return;

      try {
        const response = await axios.get(`http://192.168.17.230:5003/api/notifications/recipient/${client}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [client]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.appbar}>
      <View style={styles.containerappbar}>
        <View>
          <Text style={{ fontSize: 12, color: Colors.GREY }}>Bonjour</Text>
          <Text style={{ fontSize: 16, color: Colors.WHITE, fontWeight: 'bold' }}>{user.name}</Text>
        </View>
        <View>
          <Ionicons
            style={{ padding: 5 }}
            name='notifications-outline'
            size={24}
            color={Colors.WHITE}
            onPress={() => navigation.navigate('notification')} // Ensure this matches the stack navigator name
          />
          {unreadNotificationsCount > 0 && (
            <Badge status="error" value={unreadNotificationsCount} containerStyle={{ position: 'absolute', top: -5, right: -6 }} />
          )}
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;
const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Colors.PRIMARY,
  },
  containerappbar: {
    width: isDesktop ? '40%' : "90%",
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
