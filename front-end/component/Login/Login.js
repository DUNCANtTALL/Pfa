import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import des icônes FontAwesome

import styles from './LoginStyles'; // Import des styles depuis LoginStyles.js

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implémentez ici la logique de connexion
    console.log('Email:', email);
    console.log('Mot de passe:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connectez-vous</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OU</Text>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={20} color="#fff" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Se connecter avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="phone" size={20} color="#fff" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Se connecter avec Numéro</Text>
      </TouchableOpacity>
    </View>
  );
}
