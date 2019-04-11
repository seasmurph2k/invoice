import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Image
          source={require("../assets/imgs/logo.jpg")}
          style={styles.logo}
        />

        <View>
          <Text style={styles.companyName}>LG Waste Disposal </Text>
          <Text>070 4703 7733</Text>
          <View style={styles.addressContainer}>
            <Text>The Lodge - Perwell Avenue - </Text>
            <Text> HA5 9LR</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black"
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 20
  },
  addressContainer: {
    display: "flex",
    flexDirection: "row"
  }
});
