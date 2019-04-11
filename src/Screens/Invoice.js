import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../Components/Header";
import Input from "../Components/Input";
export default class Invoice extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Header />
        <Input />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
