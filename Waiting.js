import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator, AppRegistry, BackHandler, Alert } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton, PopupDialog } from 'react-native-popup-dialog';
import { connect } from 'react-redux'


import * as Font from 'expo-font';



class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      fontLoaded: false
    };
  }

  componentWillMount() {
    console.log('add waiting');
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    console.log("Remove waiting");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.onButtonQuitClick();
    return true;
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }



  render() {
    return (
      <View style={styles.container}>

        {
          this.state.fontLoaded ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>En attente d'un conducteur à destination de {this.props.destination.nom}
              </Text>
              <AnimatedEllipsis numberOfDots={3}
                animationDelay={150}
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              />
            </View>
          ) : null
        }

        <Image style={styles.image}
          source={require('./public/imgs/waitingImage.png')} />

        {
          this.state.fontLoaded ? (
            <View style={styles.touchableCancelButton}>
              <TouchableOpacity onPress={() => { this.onButtonQuitClick() }}>
                <Text
                  style={styles.buttonCancel}>Annuler</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }

        <Dialog
          style={styles.popUp}
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
                  this.setState({ dialogOpen: false })
                  this.props.navigation.push('Home');
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text style={styles.dialogContent}>Voulez-vous vraiment arrêter la recherche ?</Text>
          </DialogContent>
        </Dialog>

      </View >
    )
  }
  onButtonQuitClick() {
    this.setState({ dialogOpen: true });
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: "black",
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',

  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '15%',
    justifyContent: 'center'
  },
  dialogContent: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  popUp: {
    width: 150,
    height: 400,
  },
  buttonCancel: {
    fontFamily: 'Montserrat-Bold',
    borderRadius: 10,
    fontSize: 19,
    padding: '5%',
    color: 'white'

  },
  touchableCancelButton: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    bottom: '4%',
    backgroundColor: '#a64253',
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  image: {
    width: '100%',
    height: '40%',
  }

});

const mapStateToProps = (state) => {
  return {
    destination: state.destination.destination
  };
}
export default connect(mapStateToProps)(Waiting);
