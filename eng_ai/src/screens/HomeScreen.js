import React, { Component } from "react";
import {
  StyleSheet, Alert
} from "react-native";
import { Container, Text, Content, Item, Input, Button, Icon, Spinner, Toast } from 'native-base';
const country_info_BASE_URL = "https://restcountries.eu/rest/v2/name/";

export default class HomeScreen extends Component {
  state = {
    country_name: "",
    shouldBtnEnable: false,
    showLoading: false
  };

  handleInputValueChange = inputTxt => {
    this.setState({ country_name: inputTxt }, () => {
      console.log(this.state.country_name)
    });
  };

  getCountryDetails = () => {

    this.setState({ showLoading: true });
    let full_URL = country_info_BASE_URL + this.state.country_name;
    console.log("full_URL->" + full_URL)
    fetch(full_URL, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let countryList = responseJson;
        this.setState({ showLoading: false });
        console.log("countryList->" + JSON.stringify(countryList));

        if (countryList.length > 0) {
          this.setState({ country_name: "" })
          this.props.navigation.navigate("Details", { countryList: countryList });
        }else{
          Alert.alert('Something went wrong! try again');
        }
      })
      .catch((error) => {
        Alert.alert('Something went wrong! try again');
        this.setState({ showLoading: false });
        console.error(error);
      });
  };

  render() {
    const { country_name } = this.state;
    const isEnabled = country_name.length > 0;
    return (
      <Container>
        <Content>
          <Text style={styles.titleLabel}>
            Search Country Details
          </Text>
          <Item style={styles.searchbar}>
            <Icon name="ios-search" />
            <Input
              placeholder="Enter country"
              value={this.state.country_name}
              onChangeText={value => this.handleInputValueChange(value)} />
          </Item>
          <Button large primary style={styles.buttonStyle} disabled={!isEnabled}
            onPress={() => this.getCountryDetails()}>
            <Text style={styles.buttonText}> Submit </Text>
          </Button>
          {this.state.showLoading ? (<Spinner color='green' />) : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  form: {
    top: 50,
    flex: 1,
    justifyContent: "flex-start",
    width: "80%"
    // backgroundColor:'red'
  },
  titleLabel: {
    paddingTop: 60,
    left: "25%",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Verdana",
    marginBottom: 10,
    color: "#595856",
    // flex: 1,
    width: "100%"
  },
  searchbar: {
    left: 40,
    width: 300,
    borderColor: "red",
    borderWidth: 2,
    // paddingLeft:10,
    // paddingRight:30,
  },
  buttonStyle: {
    // title:"Submit",
    top: 10,
    alignSelf: 'flex-start',
    width: 120,
    left: 40
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
});