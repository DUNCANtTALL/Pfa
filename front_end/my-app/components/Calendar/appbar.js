
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import React, { useState, useEffect } from 'react';

import {Ionicons} from 'react-native-vector-icons'
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


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
        const response = await axios.get(`http://192.168.100.17:5003/api/users/getByID/${client}`);
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
              <Text style={{color:'grey'}}>Bonjour</Text>
              <Text style={{fontSize:18,fontWeight:'bold'}}>{user.name} </Text>
            </View>
            {/* ratings and notification */}
       <View style={{
                flexDirection:'row', 
                alignItems:'center',
                paddingHorizontal:10,
                }}>    
         </View>
      <View>
           <Ionicons
              style={{backgroundColor:'white',padding:6,}} 
              name = 'notifications-outline' 
              size={22}/>
           <Badge status="error" value={3} containerStyle={{ position: 'absolute', top: -4, right: -4, }} />
      </View>
            </View>
      );
}

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;
const styles = StyleSheet.create({
    appbar:{
      width: isDesktop ? '40%' : "95%",
      alignItems: 'center',
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10,
      paddingTop:10
    },
    rating:{
      backgroundColor: 'white', 
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      paddingHorizontal:20,
      paddingVertical:10,
      margin:7
      },
  });