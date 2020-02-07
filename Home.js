import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';



export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Aujourd'hui vous vous sentez plutôt : </Text>

        <View>
          <Button onPress={() => this.props.navigation.navigate('Workplace')} title="Piéton" />
        </View>
        <View>
          <Button onPress={() => this.props.navigation.navigate('Workplace')} title="Conducteur" />
        </View>

        <View>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Workplace')}>
            <Icon name='directions_car' />
          </TouchableOpacity>
        </View>



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
  buttonStyle: {
    marginBottom: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10
  },
  titleStyle: {
    marginBottom: 10
  }
});
