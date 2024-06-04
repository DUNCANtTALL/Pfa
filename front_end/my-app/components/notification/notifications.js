import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from '../Utils/Colors';

export default function Notifications({ navigation }) {
  const [client, setClient] = useState(null);
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
    const fetchNotifications = async () => {
      if (!client) return;

      try {
        const response = await axios.get(`http://192.168.17.230:5003/api/notifications/recipient/${client}`);
        const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [client]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://192.168.17.230:5003/api/notifications/${id}`, { read: true });
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem, 
        item.read ? styles.read : styles.unread,
        index === 0 && { marginTop: 20 } // Add margin to the first item
      ]}
      onPress={() => markAsRead(item._id)}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationType}>{item.type}</Text>
        <Text style={styles.notificationDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.notificationContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 20 }} // Add padding to the top of the FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  notificationItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  read: {
    backgroundColor: Colors.LIGHT_GREY,
  },
  unread: {
    backgroundColor: Colors.LIGHT_BLUE,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationContent: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  notificationType: {
    fontSize: 14, // Increase font size for better visibility
    color: Colors.BLACK,
    fontWeight: 'bold', // Make the type bold for better visibility
  },
  notificationDate: {
    fontSize: 12,
    color: Colors.DARK_GREY,
  },
});
