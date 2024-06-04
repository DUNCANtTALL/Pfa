import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditImageButton from './EditButton';
import Colors from '../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBar from './appbar';


export default function Details() {
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

  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.img}>
        <Image source={require('../assets/painter.jpg')} style={styles.photo} />
        <EditImageButton />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>Name: {user.name}</Text>
        <Text style={styles.email}>Email: {user.email}</Text>
        <View style={styles.rating}>
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
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 0,
    borderBottomWidth:1,
    borderColor:Colors.BLACK
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
    backgroundColor: Colors.GREY,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    borderWidth:2,
    borderColor:Colors.BLACK
  },
  star: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color:Colors.YELLOW
  },
  ratText: {
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
});
