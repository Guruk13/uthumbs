import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';



export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logoStyle}
              source={require('./logoFullWhite.png')} />

        <View style={styles.imagesContainer}>
          <Text style={styles.titleStyle}>Vous avez un imprévu ? </Text>
          <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('Workplace')}>
            <Image style={styles.imageStyle}
              source={require('./pieton.png')} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>Vous souhaitez aider ? </Text>
          <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('Workplace')}>
            <Image style={styles.imageStyle}
              source={require('./conducteur.png')} />
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
    alignItems:'center',
  },
  logoStyle: {
    width: 250,
    height: 60,
    marginBottom: 40
  }
});
