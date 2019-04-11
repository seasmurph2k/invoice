import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Dialog,
  Paragraph
} from "react-native-paper";
import Mailer from "react-native-mail";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caddress: "",
      description: "",
      price: "",
      visible: false,
      filePath: ""
    };
    this.generateHTML = this.generateHTML.bind(this);
    this.generatePDF = this.generatePDF.bind(this);
  }
  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  async generateHTML() {
    //very rough around the edges
    let header = `<header style="width:100%; display:flex; align-items:center; justify-content:space-between";>
      <div>
        <img src="https://i.postimg.cc/KjxzywMZ/logo.jpg" height="125px" width="125px" style="margin-left:1em">
      </div>
      <div style="display:'flex'; flex-direction:'column'; margin-right:1em">
        <h1>LG Waste</h1>
        <ul style="display:flex; list-style:none; flex-direction:column;">
          <li>070 4703 4400 </li>
          <li>The Lodge </li>
          <li>Perwell Avenure </li>
          <li>HA5 9LR </li>
        </ul>
      </div>
    </header>`;

    let caddress = this.state.caddress.split("\n");
    let customerAddress = `<div id="customer-address" style="margin-left:1em;">
  <b style="border-bottom:1px solid grey">Billed to:</b>
  <ul style="list-style:none; margin-right:1em">
    <li>${caddress[0]}</li>
    <li>${caddress[1]}</li>
    <li>${caddress[2]}</li>
    <li>${caddress[3]}</li>
  </ul>
</div>`;
    let description = `<div id="desc" style="background-color:#f2f2f2; height:400px">
    <h4 style="margin:.5em">Description</h4>
    <p style="margin:.5em; padding:1em;">${this.state.description}.</p>
  </div>`;
    let price = `<div style="margin-left:85%; font-size:18px; font-weight:bold; padding:.2em;">
    Total: ${this.state.price}
  </div>`;

    const html = `${header} ${customerAddress} ${description} ${price}`;
    return html;
  }
  async generatePDF() {
    try {
      let html = await this.generateHTML();
      let fileName = `Invoice generated ${new Date(Date.now())}`;

      let options = {
        html: html,
        fileName: fileName,
        directory: "Documents/invoices"
      };

      let file = await RNHTMLtoPDF.convert(options);
      this.setState({ filePath: file.filePath });
      this._showDialog();
      // this.handleEmail(file.filePath);
    } catch (error) {
      console.error(error);
    }
  }
  async handleEmail() {
    await this.generatePDF();
    //test if file Path != ""
    Mailer.mail(
      {
        subject: "Invoice",
        recipients: [""],
        body: "<p>See attached. Invoice as requested for work done: </p>",
        isHTML: true,
        attachment: {
          path: this.state.filePath, // The absolute path of the file from which to read data.
          type: "pdf", // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: "" // Optional: Custom filename for attachment
        }
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response")
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response")
            }
          ],
          { cancelable: true }
        );
      }
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*Possibly split this into 4 textinputs */}
        <TextInput
          label="Customer Address"
          mode="outlined"
          onChangeText={caddress => this.setState({ caddress })}
          numberOfLines={5}
          multiline={true}
          value={this.state.caddress}
          style={{ margin: 5, textAlignVertical: "top" }}
          theme={{
            colors: {
              placeholder: "#000",
              background: "#f5f6f5",
              text: "#000",
              primary: "#5d5d5d"
            }
          }}
          underlineColor="#000"
          selectionColor="#000"
        />
        <TextInput
          label="Description"
          mode="outlined"
          onChangeText={description => this.setState({ description })}
          numberOfLines={5}
          multiline={true}
          value={this.state.description}
          style={{ margin: 5, textAlignVertical: "top" }}
          theme={{
            colors: {
              placeholder: "#000",
              background: "#f5f6f5",
              text: "#000",
              primary: "#5d5d5d"
            }
          }}
          underlineColor="#000"
          selectionColor="#000"
        />

        <TextInput
          label="Price"
          mode="outlined"
          inlineImageLeft="mail"
          placeholder="00.00"
          keyboardType="numeric"
          onChangeText={price => this.setState({ price })}
          value={this.state.price}
          style={{ margin: 5, textAlignVertical: "top" }}
          theme={{
            colors: {
              placeholder: "#000",
              background: "#f5f6f5",
              text: "#000",
              primary: "#5d5d5d"
            }
          }}
          underlineColor="#000"
          selectionColor="#000"
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            position: "absolute",
            width: "100%",
            bottom: 0
          }}
        >
          <Button
            mode="outlined"
            icon="picture-as-pdf"
            onPress={() => {
              this.generatePDF();
            }}
          >
            Export PDF
          </Button>
          <Button
            mode="outlined"
            icon="mail"
            onPress={() => {
              this.handleEmail();
            }}
          >
            Mail
          </Button>
        </View>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>PDF saved in {`${this.state.filePath}`}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
