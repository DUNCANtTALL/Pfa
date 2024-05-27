import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import AppBar from './appbar';
import { Divider, Input, Icon, Button } from 'react-native-elements';
import BottomTabs from './bottom_tabs';
import axios from 'axios';
import JobDetail from './job_detail';

export default function Home({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://192.168.100.17:5003/api/bookings/GetAll');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleSearch = async () => {
    try {
      let response;
      if (searchInput.trim() && categoryInput.trim()) {
        response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCityAndCategory/${searchInput}/${categoryInput}`);
      } else if (searchInput.trim()) {
        response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCity/${searchInput}`);
      } else if (categoryInput.trim()) {
        response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCategory/${categoryInput}`);
      } else {
        response = await axios.get('http://192.168.100.17:5003/api/bookings/GetAll');
      }
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleApply = (updatedBooking) => {
    setBookings(bookings.map(booking => booking._id === updatedBooking._id ? updatedBooking : booking));
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#F4F6FA', flex: 1, marginTop: 0 }}>
      <AppBar />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 10 }}>
        <Input
          containerStyle={{ flex: 1, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'grey' }}
          leftIcon={<Icon name='location-outline' type='ionicon' color="grey" size={20} />}
          placeholder='Enter city name...'
          placeholderTextColor='grey'
          value={searchInput}
          onChangeText={setSearchInput}
        />
        <Input
          containerStyle={{ flex: 1, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'grey' }}
          leftIcon={<Icon name='list-outline' type='ionicon' color="grey" size={20} />}
          placeholder='Enter category...'
          placeholderTextColor='grey'
          value={categoryInput}
          onChangeText={setCategoryInput}
        />
        <Button
          title='Search'
          buttonStyle={{
            width: 100,
            paddingVertical: 10,
            backgroundColor: '#529A69',
            borderRadius: 5,
          }}
          onPress={handleSearch}
        />
      </View>
      <View style={{ margin: 10, backgroundColor: 'white', flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 17 }}>
          <Text style={{ color: 'grey', fontSize: 18 }}>Recherche par ville ou catégorie</Text>
          <Text style={{ color: '#85D6B3', fontSize: 17 }}>Résultat</Text>
        </View>
        <ScrollView>
          {bookings.map((booking) => (
            <JobDetail key={booking._id} booking={booking} onApply={handleApply} />
          ))}
        </ScrollView>
        <Divider width={1} />
        <BottomTabs />
      </View>
    </SafeAreaView>
  );
}
