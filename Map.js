import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class Map extends Component {
  render() {
    return (
      <View>
        <Text>This is the Map screen</Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Go home"/>
      </View>
    )
  }
};

export default Map;
