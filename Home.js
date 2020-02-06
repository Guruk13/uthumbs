import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';



export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Aujourd'hui vous vous sentez plutôt : </Text>
        <Button onPress={() => this.props.navigation.navigate('Map')} title="Piéton" />
        
        <Button onPress={() => this.props.navigation.navigate('Map')} title="Conducteur" />

      </View>
    )
  }
};

export default Home;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '200'

  }
});
