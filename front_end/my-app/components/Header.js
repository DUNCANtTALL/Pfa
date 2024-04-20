import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button , TextInput,FlatList , TouchableOpacity } from 'react-native';
import React , {useState} from 'react';


export default function Header()
{
    return (
        <View style = {styles.Header}>
            <Text style = {styles.title}>
                My TODOS
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Header : 
    {
    height: 80 , 
     paddingTop:50 ,
     width:'100%',
     backgroundColor : 'coral',
    }
    ,title :{
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
  });