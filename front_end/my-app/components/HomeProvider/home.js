import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import { Divider, Input, Icon } from 'react-native-elements';
import AppBar from '../HomeProvider/appbar';
import BottomTabs from '../HomeProvider/bottom_tabs';
import JobDetail from '../HomeProvider/job_detail';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Colors from '../Utils/Colors';
import { services, cities } from '../formulaireUser/data'; // Adjust the import path as needed

export default function Home({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchMethod, setSearchMethod] = useState('city'); // Default search method
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://192.168.100.17:5003/api/bookings/GetAll');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSearch = async () => {
    try {
      let response;
      if (searchInput.trim()) {
        if (searchMethod === 'city') {
          response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCity/${searchInput}`);
        } else if (searchMethod === 'category') {
          response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCategory/${searchInput}`);
          response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCity/${searchInput}`);
        } else if (searchMethod === 'category') {
          response = await axios.get(`http://192.168.100.17:5003/api/bookings/GetByCategory/${searchInput}`);
        }
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
    <SafeAreaView style={styles.safeArea}>
      <AppBar />
      <View style={styles.container}>
        <Divider width={1} />
      <Divider width={1} />
        <View style={styles.searchContainer}>
          <Text style={styles.searchLabel}>Search by:</Text>
          <Picker
            selectedValue={searchMethod}
            style={styles.picker}
            onValueChange={(itemValue) => setSearchMethod(itemValue)}
          >
            <Picker.Item label="City" value="city" />
            <Picker.Item label="Category" value="category" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={searchInput}
            style={styles.pickerInput}
            onValueChange={(itemValue) => setSearchInput(itemValue)}
          >
            <Picker.Item label={`Select ${searchMethod === 'city' ? 'city' : 'category'}`} value="" />
            {(searchMethod === 'city' ? cities : services).map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
          <Icon
            name='search'
            type='ionicon'
            color={Colors.PRIMARY}
            size={24}
            onPress={handleSearch}
            containerStyle={styles.input}
            leftIcon={<Icon name='location-outline' type='ionicon' color={Colors.PRIMARY} size={15} marginRight={5} />}
            placeholder={`Enter ${searchMethod === 'city' ? 'city' : 'category'}...`}
            placeholderTextColor={Colors.BLACK}
            value={searchInput}
            onChangeText={setSearchInput}
            onPressIn={handleSearch}
          />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 0,
  },
  searchLabel: {
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerInput: {
    flex: 1,
    height: 50,
  },
  input: {
    flex: 1,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    height: '72%',
    padding: 0,
  },
});
