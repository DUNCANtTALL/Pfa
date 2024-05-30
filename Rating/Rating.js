import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // Import Axios for making HTTP requests

const RatingComponent = ({ provider }) => {
  const [rating, setRating] = useState(0);

  const handleRating = async (rate) => {
    setRating(rate);

    try {
      // Send rating to the backend
      const response = await axios.post('http://your-backend-url/ratings', {
        providerId: providerId,
        rating: rate,
      });
      console.log('Rating submitted successfully:', response.data);
      // You can handle success or show a message to the user
    } catch (error) {
      console.error('Error submitting rating:', error);
      // Handle error, such as showing an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the Service of </Text>
      <Text style={styles.title}>JOE</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default RatingComponent;
