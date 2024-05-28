import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Utils/Colors';

export default function JobDetail({ booking, onApply }) {
  const [client, setClient] = useState(null);

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

  const handleApply = async () => {
    if (!client) {
      Alert.alert('Error', 'Client ID not found.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.3:5003/api/bookings/apply', {
        bookingId: booking._id,
        providerId: client,
      });

      if (onApply && typeof onApply === 'function') {
        onApply(response.data);
      }

      Alert.alert('Success', 'You have applied for the booking.');
    } catch (error) {
      console.error('Error applying for booking:', error);
      Alert.alert('Error', 'Failed to apply for the booking.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/img.jpeg')} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.serviceName}>{booking.service}</Text>
          <View style={styles.details}>
            <Text>{booking.clientName}</Text>
            <Text>{booking.city}</Text>
          </View>
        </View>
      </View>
      <Divider width={1} color='#CACACA' />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <View>
          <Text style={styles.category}>Category</Text>
          <Text style={styles.categoryText}>{booking.category}</Text>
        </View>
        <View>
          <Text style={styles.price}>Proposed Price</Text>
          <Text style={styles.priceText}>{booking.price} DH</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    borderTopWidth:2,
    marginTop:2,
    borderBlockColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 2,
    marginTop:10,
    borderRadius: 10,

  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 7,
  },
  content: {
    marginLeft: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  category: {
    color: 'grey',
    padding: 5,
  },
  categoryText: {
    backgroundColor: '#FEEAE6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    color: Colors.Red,
  },
  price: {
    color: 'grey',
    padding: 5,
  },
  priceText: {
    backgroundColor: '#D2F8E7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    color: Colors.Green,
  },
  applyButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
  },
  applyButtonText: {
    color: 'white',
  },
});