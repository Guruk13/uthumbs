import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';



export class Waiting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>En attente d'un conducteur ...</Text>
        <ActivityIndicator size="large" color="#0000ff" />

      </View>
    )
  }
};

export default Waiting;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a64253',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
    height: 180,
    width: 180
  },
  titleStyle: {
    // marginBottom: 10,
    color: "white",
    fontSize: 17
  },
  touchableStyle: {
    //backgroundColor: 'white',
    padding: 28,
    borderRadius: 100
  },
  imagesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoStyle: {
    width: 250,
    height: 60,
    marginBottom: 40
  }
});
