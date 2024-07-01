import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Dimensions, Platform, StatusBar as RNStatusBar } from 'react-native';
import SearchComponent from './components/SearchComponent';
import WeatherApp from './components/WeatherComponent';
import { useState } from 'react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('jaipur');
  const [backgroundimg, setBackground] = useState('');

  function searchQueryFun(newQuery) {
    setSearchQuery(newQuery);
  }

  function backgroundFun(image) {
    setBackground(image);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundimg} resizeMode='cover' style={styles.BackImage}>
        <View style={styles.overlay} />
        <StatusBar style="auto" />
        <SearchComponent searchQueryFun={searchQueryFun} value={searchQuery} />
        <WeatherApp searchQuery={searchQuery} backgroundprop={backgroundFun} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    backgroundColor: '#f0f8ff',
    width: Dimensions.get('screen').width,
  },
  BackImage: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    width: Dimensions.get('screen').width,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    paddingHorizontal: 10
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
