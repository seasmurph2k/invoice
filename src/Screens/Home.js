import React, { Component } from "react";
import { View } from "react-native";
import Invoice from "./Invoice";
export default class Home extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Invoice />
      </View>
    );
  }
}
