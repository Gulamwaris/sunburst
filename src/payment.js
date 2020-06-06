import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CreditCardInput } from "react-native-payment-card";

export default class AddCard extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { useLiteCreditCardInput: false, formData: 0 };

  _onChange = (formData) => {
    this.setState({
      formData: formData,
    });
  };
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) =>
    this.setState({ useLiteCreditCardInput });

  render() {
    return (
      <View>
        <ScrollView style={s.container}>
          <View>
            <View style={s.conntainer}></View>
            <CreditCardInput
              testID="card"
              autoFocus
              requiresName
              requiresCVC
              // requiresPostalCode
              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onChange={this._onChange}
            />
          </View>
          <View style={{}}></View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Text style={s.buttonStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
  },

  buttonStyle: {
    textAlign: "center",
    padding: 12,
    backgroundColor: "#058584",
    borderRadius: 8,
    color: "#fff",
    width: Dimensions.get("window").width - 80,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    shadowColor: "#AEAEAE",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4,
    elevation: 4,
  },

  container: {
    width: Dimensions.get("window").width,

    marginTop: 30,
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#333333",
    fontWeight: "100",
    fontStyle: "normal",
  },
  input: {
    fontSize: 14,
    color: "black",
    fontFamily: "Montserrat-Regular",
  },
});
