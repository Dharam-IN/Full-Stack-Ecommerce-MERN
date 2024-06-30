import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Linking, ActivityIndicator } from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';

const WeatherApp = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [cityName, setCityName] = useState('Jaipur');
  const apikey = `8d6454a89dff871786a0307b0dbebbee`;
  const {searchQuery} = props;

  const fetchWeatherData = async (city) => {
    try {
      setLoader(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if(searchQuery){
      fetchWeatherData(searchQuery);
    }
  }, [searchQuery]);


  if (loader) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.infoText}>Humidity</Text>
              <Text style={styles.infoValue}>{weatherData.main.humidity}%</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>Wind Speed</Text>
              <Text style={styles.infoValue}>{weatherData.wind.speed} km/h</Text>
            </View>
          </View>
          <Text
            style={styles.developer}
            onPress={() => Linking.openURL('https://github.com/Dharam-IN')}
          >
            Developed by Dharam-IN
          </Text>
        </>
      ) : (
        <Text style={styles.errorText}>Failed to load weather data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1e90ff',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  weatherAnimation: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  dividerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    width: '40%',
    height: 1,
    backgroundColor: '#000',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  developer: {
    marginTop: 20,
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 20,
  },
  searchbar: {
    width: '100%',
  },
});

export default WeatherApp;
