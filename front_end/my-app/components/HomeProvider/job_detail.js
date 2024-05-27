import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

export default function JobDetail({ booking }) {
  return (
    <View style={{ borderWidth: 1, borderColor: '#CACACA', margin: 12, borderRadius: 10 }}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Image source={require('../assets/img.jpeg')} style={{ width: 50, height: 50, borderRadius: 7 }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{booking.service}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 }}>
            <Text>{booking.clientName}</Text>
            <Text>{booking.city}</Text>
          </View>
        </View>
      </View>
      <Divider width={1} color='#CACACA' />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <View>
          <Text style={{ color: 'grey', padding: 5 }}>Category</Text>
          <Text style={{ backgroundColor: '#FEEAE6', paddingHorizontal: 12, paddingVertical: 5, color: 'red' }}>{booking.category}</Text>
        </View>
        <View>
          <Text style={{ color: 'grey', padding: 5 }}>Proposed Price</Text>
          <Text style={{ backgroundColor: '#D2F8E7', paddingHorizontal: 12, paddingVertical: 5, color: 'green' }}>{booking.price} DH</Text>
        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: '#529A69', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 4 }}>
            <Text style={{ color: 'white' }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
