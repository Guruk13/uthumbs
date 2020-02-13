import { Dimensions, StyleSheet, Text, View, AppRegistry, Image, TouchableOpacity, TextInput } from 'react-native'
import Swiper from 'react-native-page-swiper'
import React, { Component } from 'react';



export default class SwiperPage extends Component {
  render() {
    return (
      <Swiper
        activeDotColor="black"
        style={styles.wrapper}>
        <View style={styles.slide1}>
          <Image style={styles.logoStyle}
            source={require('./public/imgs/logoFullWhite.png')} />
          <Image style={styles.image}
            source={require('./public/imgs/tutoImage1.png')} />
          <Text style={styles.text}>Tu as besoin d'aide ? Ou alors, tu souhaites dépanner quelqu'un ? Fais ton choix !</Text>
        </View>

        <View style={styles.slide2}>
          <Image style={styles.logoStyle}
            source={require('./public/imgs/logoFullWhite.png')} />
          <Image style={styles.image}
            source={require('./public/imgs/tutoImage2.png')}></Image>
          <Text style={styles.text}>Choisis ta destination afin d'être mis en relation avec les Thumbers autour de toi.</Text>
        </View>

        <View style={styles.slide3}>
          <Image style={styles.logoStyle}
            source={require('./public/imgs/logoFullWhite.png')} />
          
          <Text style={styles.text}>Se connecter</Text>
          <TextInput
            style={styles.inputStyle}
            returnKeyType={"next"}
            // autoFocus={true}
            placeholder="Email" />
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry={true}
            style={styles.inputStyle} />
          <TouchableOpacity>
            <Text style={styles.textConnection}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonConnection}>
            <Text style={styles.textConnection}>Connexion</Text>
          </TouchableOpacity>

        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {

  },
  logoStyle: {
    width: '70%',
    height: '10%',
  },
  slide1: {
    //justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a64253',
  },

  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a64253',
  },

  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a64253',
  },

  text: {
    color: '#fff',
    fontSize: 20,
    //fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '4%',
    width: '90%',
  },

  image: {
    width: '70%',
    height: '37%',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
  },

  buttonConnection: {
    borderWidth: 2,
    borderColor: 'white',
    padding: '4%',

  },
  textConnection: {
    color: 'white',
    fontSize: 10
  },

  inputStyle: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white'
  }

})