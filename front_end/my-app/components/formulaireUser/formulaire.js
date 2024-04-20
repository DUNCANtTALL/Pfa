
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Form({ navigation }) {
  const [service, setService] = useState('');
  const [categorie, setCategorie] = useState('');
  const [prix, setprix] = useState('');
  const [ville, setVille] = useState('');
  const handleSubmit = () => {
    
    // You can submit the form data to a server, perform validation, etc.
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Servive</Text>
      <TextInput
        style={styles.input}
        value={service}
        onChangeText={setService}
        placeholder="Enter votre serice"
      />

      <Text style={styles.label}>Categorie</Text>
      <TextInput
        style={styles.input}
        value={categorie}
        onChangeText={setCategorie}
        placeholder="Enter la Categorie"
      />

      <Text style={styles.label}>Prix</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={prix}
        onChangeText={setprix}
        placeholder="Enter votre prix"
        multiline
      />
      <Text style={styles.label}>ville</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={ville}
        onChangeText={setVille}
        placeholder="Enter votre ville"
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
