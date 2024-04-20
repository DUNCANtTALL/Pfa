import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button , TextInput,FlatList , TouchableOpacity } from 'react-native';
import React , {useState} from 'react';


export default function TodoItem({ item , pressHnadler}) {

        return (
            <TouchableOpacity  onPress={()=>pressHnadler(item.key)}>
                <Text style={styles.items}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        )

}


const styles = StyleSheet.create({
   items: {
    padding : 16 
    ,marginTop : 15 
    ,borderWidth:1 
     , borderStyle : 'dashed'
     ,borderRadius : 1 ,
   }
   
    
  } );