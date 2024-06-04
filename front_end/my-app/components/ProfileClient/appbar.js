
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import React, { useState, useEffect } from 'react';

import {Ionicons} from 'react-native-vector-icons'
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from '../Utils/Colors';


export default function AppBar(){

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
          <View style={styles.appbar}>
            {/* Greetings and name */}
            <View>
              <Text style={{fontSize:0,color:Colors.GREY}}>Bonjour</Text>
              <Text style={{fontSize:0,fontWeight:'bold'}}>{user.name} </Text>
            </View>
            {/* ratings and notification */}
      <View>
           <Ionicons
              style={{padding:5}} 
              name = 'notifications-outline' 
              size={24}
              color={Colors.GREY}/>
           <Badge status="error" value={99} containerStyle={{ position: 'absolute', top: -5, right: -6 }} />
      </View>
            </View>
      );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;
const styles = StyleSheet.create({
    appbar:{
      width: isDesktop ? '40%' : "90%",
      alignItems: 'center',
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
      paddingBottom:4,
    },
  });