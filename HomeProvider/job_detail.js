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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding:5 }}>
        <View style={styles.containerCategory}>
          <Text style={styles.category}>Category</Text>
          <Text style={styles.categoryText}>{booking.category}</Text>
        </View>
        <View style={styles.containerPrice}>
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
    borderTopWidth:3,
    marginTop:2,
    borderBlockColor: Colors.PRIMARY,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop:15,
    paddingBottom:15,
    borderRadius: 10,
    height:'auto',
    width:'auto'
  },

  header: {
    flexDirection: 'row',
    padding: 5,
  },

  image: {
    width: 52,
    height: 52,
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
    padding: 5,
    alignSelf:'flex-start'
  },

  containerCategory:{
    width:'43%',
    height:'auto',
    alignSelf:'flex-start'
  },

  containerPrice:{
    width:'30%',
    height:'auto',
    alignSelf:'flex-start'
  },

  category: {
    color: 'grey',
    padding:2,
    alignSelf:'flex-start'
  },

  categoryText: {
    backgroundColor: '#FEEAE6',
    padding:8,
    color: Colors.Red,
    alignSelf:'flex-start'
  },

  price: {
    color: 'grey',
    padding:2,
    alignSelf:'flex-start'

  },

  priceText: {
    backgroundColor: '#D2F8E7',
    padding:8,
    color: Colors.Green,
    alignSelf:'flex-start'
  },


  applyButton: {
    backgroundColor: Colors.PRIMARY,
    padding:8,
    borderRadius: 20,

  },

  applyButtonText: {
    color: 'white',
  },
  
});