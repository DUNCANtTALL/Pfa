import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const RatingComponent = ({ booking }) => {
  const [rating, setRating] = useState(0);

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
      const response = await axios.post('http://192.168.100.17:5003/api/ratings/Add', {
        ratedUser: booking.serviceProvider,
        rating: rating,
      });
      console.log('Rating submitted successfully:', response.data);
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
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RatingComponent;
