import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EditImageButton from './EditButton';
import Colors from '../Utils/Colors';



export default function Details({ user })
 {
  return (
    <View style={styles.container}>
        <View style = {styles.img}>
      <Image source={require('../assets/painter.jpg')} style={styles.photo} />
      <EditImageButton/>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>Name : John Doe</Text>
        <Text style={styles.email}>email : google@gmail.com</Text>
        {/* Autres informations */}
        <View style={styles.rating}>
            <Text>Rating : </Text>
                  <View style={styles.star}>
                     <Ionicons name='star' color='#F99A0E' size={20} />
                  <View style={{width:5}}/>
                <Text style={styles.ratText}>4.89</Text>
             </View>
             </View>
        {/* <Text style={styles.otherInfo}>Autre information</Text> */}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 600 || height >= 1024;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: isDesktop ? '30%' : "90%",
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor:Colors.PRIMARY,
    padding:20,
    borderRadius:50,
    marginTop:10
  },

  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },

  img:{
    flexDirection : 'row',
  },
  
  userInfo: {
    alignItems: 'center',
    
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color:Colors.WHITE
  },
  email: {
    fontSize: 16,
    marginBottom: 6,
    color:Colors.WHITE
  },
  rating: {
    flexDirection : 'row',
    backgroundColor:Colors.WHITE,
    padding:8,
    borderRadius:10,
    marginTop:6
  },
  star :{
    flexDirection : 'row',
        fontWeight : 'bold'
      }
  // Ajoutez des styles supplémentaires au besoin pour d'autres informations
});

