import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import Login from './component/Login';

export default function App() {
  return (
    <View style = {styles.container}>
      <Login />
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ed9d9',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
