import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { services, cities } from './data'; // Importez les données depuis donnees.js
import Colors from '../Utils/Colors'; // Importez les couleurs depuis votre fichier de couleurs
import AppBar from './appbar';
import Marking from 'react-native-calendars/src/calendar/day/marking';

export default function Formulaire({ navigation }) {
  const [service, setService] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [client, setClient] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);

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

  useEffect(() => {
    // Générer les options de date à partir d'aujourd'hui
    const today = new Date();
    const options = [];
    for (let i = 0; i < 60; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      options.push(nextDate.toISOString().split('T')[0]);
    }
    setDateOptions(options);
  }, []);

  const handleSubmit = async () => {
    if (!service || !category || !price || !city || !date || !client) {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return;
    }

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
        navigation.navigate('Booking');
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
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={service}
        onChangeText={setService}
        placeholder="Enter the Service"
      />
      </View>

      <Text style={styles.label}>Category</Text>
      <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a Category" value="" />
          {services.map((service, index) => (
            <Picker.Item key={index} label={service} value={service} />
          ))}
        </Picker>
     

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter your price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>City</Text>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a city" value="" />
          {cities.map((city, index) => (
            <Picker.Item key={index} label={city} value={city} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <View style={styles.inputContainer}>
      <Picker 
        selectedValue={date}
        onValueChange={(itemValue) => setDate(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select a date" value="" />
        {dateOptions.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
      </View>
      <View style={styles.Submit}>
        <Button title="Submit" onPress={handleSubmit} color={Colors.PRIMARY} /> 
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 22,
    paddingRight: 22,
    
  },
  Submit: {
    marginTop :30,
    alignItems:'end',
  },
  label: {
    fontSize: 18,
    marginBottom: 3,
    color: Colors.PRIMARY,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    padding: 11,
    marginBottom: 18,
    backgroundColor: Colors.Grey,
  },
  inputContainer: {
    height:'10%',
    padding:5,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 20,
    marginBottom: 18,
    backgroundColor: Colors.Grey,
  },
});
