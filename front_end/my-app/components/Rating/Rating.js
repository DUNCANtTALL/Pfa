import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Utils/Colors';

const RatingComponent = ({ booking }) => {
  const [rating, setRating] = useState(0);
  const [client, setClient] = useState(null);
  const [user, setUser] = useState({});

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

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitRating = async () => {
    if (rating === 0) {
      Alert.alert('Please select a rating before submitting.');
      return;
    }

    try {


      // Send rating to the backend
      const response = await axios.post('http://192.168.17.230:5003/api/ratings/Add', {
        ratedUser: booking.serviceProvider,
        rating: rating,
      });

      // Create a notification for the provider
      await axios.post('http://192.168.17.230:5003/api/notifications/Add', {
        recipient: booking.serviceProvider,
        type: 'rating',
        content: `You have received a new rating of ${rating} stars from ${user.name}`,
        read: false,
      });

      console.log('Rating and notification submitted successfully:', response.data);
      Alert.alert('Rating submitted successfully.');
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error submitting rating. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the Service of</Text>
      <Text style={styles.title}>{booking.providerName || 'Provider'}</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Icon
              name="star"
              size={40}
              color={star <= rating ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
        <Text style={styles.submitButtonText}>Submit Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: Colors.DARKPRIMARY,
    padding: 10,
    borderRadius: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RatingComponent;
