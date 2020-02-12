import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton, PopupDialog } from 'react-native-popup-dialog';



export class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>En attente d'un conducteur ...</Text>
        <ActivityIndicator size="large" color="white" />
        <View>
          <TouchableOpacity onPress={() => { this.onButtonQuitClick() }}>
            <Image style={styles.imageStyle}
              source={require('./stopIcon.png')} />
          </TouchableOpacity>
        </View>

        <Dialog
          visible={this.state.dialogOpen}
          onTouchOutside={() => {
            this.setState({ dialogOpen: false });
          }}
          footer={
            <DialogFooter>
              <DialogButton
                text="Annuler"
                onPress={() => { this.setState({ dialogOpen: false }) }}
              />
              <DialogButton
                text="OK"
                onPress={() => {
                  this.props.navigation.navigate('Home')
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>Voulez-vous vraiment arrêter la recherche ?</Text>
          </DialogContent>
        </Dialog>


      </View>
    )
  }
  onButtonQuitClick() {
    this.setState({ dialogOpen: true });
  }
};

export default Waiting;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a64253',
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
  },
  imageStyle: {
    alignSelf: "flex-end",
    width: 60,
    height: 60,
    marginBottom: 10
  }

});
