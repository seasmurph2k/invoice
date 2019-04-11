/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./Screens/Home";

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <PaperProvider>
        <Home />
      </PaperProvider>
    );
  }
}
