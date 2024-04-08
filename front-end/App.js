import React from 'react';
import { View } from 'react-native';
import Login from './component/Login/Login'; // Importer le composant Login sans les accolades
import Home from './component/Home/Home'; // Importer le composant Home sans les accolades

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* Utiliser le composant Login */}
      <Login />
      {/* <Home /> Utiliser le composant Home */}
    </View>
  );
}
