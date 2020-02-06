import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navigator from './navigation';


export default class App extends Component {
  render() {
    return (
    <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
