import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import Login from './component/Login';
import FlatlistBasic from './component/FlatlistBasic';

export default function App() {
  return (
    <View style = {styles.container}>
      <Login />
      {/* <FlatlistBasic /> */}
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: '#7ed9d9',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
