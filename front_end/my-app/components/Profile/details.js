import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditImageButton from './EditButton';
import Colors from '../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Details() {
  const [client, setClient] = useState();
  const [user, setUser] = useState({});
  const [rating, setRating] = useState();

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

      try {
        const response = await axios.get(`http://192.168.100.17:5003/api/users/getByID/${client}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserData();
  }, [client]);

  useEffect(() => {
    const fetchRating = async () => {
      if (!client) return;
  
      try {
        const response = await axios.get(`http://192.168.100.17:5003/api/ratings/Avg/${client}`);
        let data = response.data.averageRating;
        setRating(data.toFixed(2));
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };
    fetchRating();
  }, [client]);
  

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image source={require('../assets/painter.jpg')} style={styles.photo} />
        <EditImageButton />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>Name: {user.name}</Text>
        <Text style={styles.email}>Email: {user.email}</Text>
        <View style={styles.rating}>
          <Text>Rating: </Text>
          <View style={styles.star}>
            <Ionicons name="star" color={Colors.YELLOW} size={20} />
            <Text style={styles.ratText}>{rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: isDesktop ? '30%' : '100%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 30,
    marginTop: 10,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  img: {
    flexDirection: 'row',
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Colors.WHITE,
  },
  email: {
    fontSize: 16,
    marginBottom: 6,
    color: Colors.WHITE,
  },
  rating: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 8,
    borderRadius: 10,
    marginTop: 15,
  },
  star: {
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  ratText: {
    fontWeight: 'bold',
  },
});
