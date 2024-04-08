import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles'; // Importer les styles depuis HomeStyles.js

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home!</Text>
    </View>
  );
}
