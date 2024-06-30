import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import SearchComponent from './components/SearchComponent';
import WeatherApp from './components/WeatherComponent';
import { useState } from 'react';

export default function App() {

  const [searchQuery, setSearchQuery] = useState('jaipur');
  console.log(searchQuery);

  function searchQueryFun(newQuery){
    setSearchQuery(newQuery)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SearchComponent searchQueryFun={searchQueryFun} value={searchQuery}/>
      <WeatherApp searchQuery={searchQuery}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f0f8ff',
  },
});
