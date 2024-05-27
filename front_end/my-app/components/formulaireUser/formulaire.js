import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Form({ navigation }) {
  const [service, setService] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const getClientId = async () => {
      try {
        const storedClientId = await AsyncStorage.getItem('userId');
        setClient(storedClientId);
      } catch (error) {
        console.error('Error fetching client ID from AsyncStorage:', error);
      }
    };

    getClientId();
  }, []);

  const handleSubmit = async () => {
    if (!service || !category || !price || !city || !date || !client) {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return;
    }

    // Validate date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      Alert.alert('Validation Error', 'Please enter a valid date in the format YYYY-MM-DD');
      return;
    }

    const formData = {
      service,
      category,
      price,
      city,
      date,
      client,
    };

    try {
      const response = await axios.post('http://192.168.100.17:5003/api/bookings/Add', formData);

      if (response.status === 201) {
        Alert.alert('Success', 'Form submitted successfully');
        navigation.navigate('Travaux');
      } else {
        Alert.alert('Error', 'Failed to submit the form');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      Alert.alert('Error', 'An error occurred while submitting the form');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service</Text>
      <TextInput
        style={styles.input}
        value={service}
        onChangeText={setService}
        placeholder="Enter your service"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter the category"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter your price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter your city"
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter the date (YYYY-MM-DD)"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
