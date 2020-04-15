import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import Image from 'react-native-remote-svg';
import { Container, Content, Text, Item, Card, CardItem, Button, Icon, Thumbnail, Body, Spinner } from 'native-base';

export default class CountryDetailsScreen extends Component {
  state = {
    weatherInfo: {},
    showCapWeatherDetails: false,
    showLoading: false
  };

  getCapitalWeather = (_capital) => {
    this.setState({ showLoading: true });
    const cap_weather_BASE_URL = "http://api.weatherstack.com/current?access_key=055aa5bee3369656feb1b5017905c864&query=";
    console.log("get capital weather button pressed");
    let full_URL = cap_weather_BASE_URL + _capital;
    console.log("full_URL->" + full_URL)
    fetch(full_URL, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ showLoading: false });
        if (responseJson.current) {
          this.setState({
            weatherInfo: responseJson.current
          }, () => {
            this.setState({
              showCapWeatherDetails: true
            })
          })
        } else {
          Alert.alert('Something went wrong! try again');
        }
      })
      .catch((error) => {
        this.setState({ showLoading: false });
        Alert.alert('Something went wrong! try again');
        console.error(error);
      });

  };
  render() {
    let { route, navigation } = this.props
    const { countryList } = route.params
    const { name, capital, population, latlng, flag } = countryList[0]

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered header button>
              <Text>{name}</Text>
            </CardItem>
            <CardItem bordered button>
              <Body>
                <Text>
                  Capital: {capital}
                </Text>
                <Text>
                  Population: {population}
                </Text>
                <Text>
                  Latitude and Longitude: {latlng.toString()}
                </Text>
                <Text>
                  Capital: {capital}
                </Text>

                <Image padder
                  source={{ uri: flag }}
                  style={{ width: 200, height: 80 }}
                />
                <Text>
                  Flag source: {flag}
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered footer button onPress={() => this.getCapitalWeather(capital)}>
              <Button small primary style={styles.buttonStyle}
                onPress={() => this.getCapitalWeather(capital)}>
                <Text style={styles.buttonText}> Capital Weather </Text>
              </Button>
              {this.state.showLoading ? (<Spinner color='green' />) : null}
            </CardItem>
          </Card>
          {this.state.showCapWeatherDetails ? (
            <Card>
              <CardItem bordered header button>
                <Text>Current Weather: {capital}</Text>
              </CardItem>
              <CardItem bordered small button>
                <Body>
                  <Text>
                    Temperature: {this.state.weatherInfo.temperature}
                  </Text>
                  <Thumbnail source={{ uri: this.state.weatherInfo.weather_icons[0] }} />
                  <Text>
                    Wind Speed: {this.state.weatherInfo.wind_speed}
                  </Text>
                  <Text>
                    Precipitation: {this.state.weatherInfo.precip}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          ) : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})