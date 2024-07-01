import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome, Feather, FontAwesome5, Fontisto, Entypo } from '@expo/vector-icons';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from '../assets/backgrounds';

const WeatherApp = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState();
  const [background, setBackground] = useState();
  const [loader, setLoader] = useState(false);
  const { searchQuery, backgroundprop } = props;
  const apikey = `8d6454a89dff871786a0307b0dbebbee`;

  const fetchWeatherData = async (city) => {
    try {
      setLoader(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchInitialWeatherData = async () => {
      await fetchWeatherData('jaipur');
    };

    fetchInitialWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const iconsObj = {
        snow: <FontAwesome name="snowflake-o" size={24} color="black" />,
        clear: <Feather name="sun" size={24} color="black" />,
        rain: <FontAwesome5 name="cloud-rain" size={24} color="black" />,
        haze: <Fontisto name="day-haze" size={24} color="black" />,
        cloud: <Entypo name="cloud" size={24} color="black" />,
      };

      const now = new Date();
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const sunset = new Date(weatherData.sys.sunset * 1000);
      const isDayTime = now > sunrise && now < sunset;

      switch (weatherData.weather[0].main) {
        case "Snow":
          setIcon(iconsObj.snow);
          isDayTime ? setBackground(snow_day) : setBackground(snow_night);
          break;
        case "Clear":
          setIcon(iconsObj.clear);
          isDayTime ? setBackground(clear_day) : setBackground(clear_night);
          break;
        case "Rain":
          setIcon(iconsObj.rain);
          isDayTime ? setBackground(rain_day) : setBackground(rain_night);
          break;
        case "Haze":
          setIcon(iconsObj.haze);
          isDayTime ? setBackground(haze_day) : setBackground(haze_night);
          break;
        case "Clouds":
          setIcon(iconsObj.cloud);
          isDayTime ? setBackground(cloud_day) : setBackground(cloud_night);
          break;
        default:
          setIcon(iconsObj.haze);
          isDayTime ? setBackground(haze_day) : setBackground(haze_night);
          break;
      }
      backgroundprop(background);
    }
  }, [weatherData]);

  useEffect(() => {
    if (searchQuery) {
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
          <View style={styles.weatherBack}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
            <View style={styles.IconView}>
              <Text>{icon}</Text>
              <Text style={styles.weatherDescription}>{weatherData.weather[0].description.toUpperCase()}</Text>
            </View>
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
          </View>
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
    textAlign: "center",
    padding: 20,
  },
  weatherBack:{ 
    backgroundColor: "rgba(256, 256, 256, 0.8)",
    padding: 50
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
    textAlign: "center"
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: "center"
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
    justifyContent: 'flex-start',
    gap: 50
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
    textAlign: "center"
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  IconView: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
});

export default WeatherApp;
