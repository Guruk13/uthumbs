import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from 'react-native-maps';
import { AppRegistry, View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux'
import PubNubReact from "pubnub-react";
import * as Font from 'expo-font';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const GOOGLE_MAPS_APIKEY = 'AIzaSyB2sGMhio_-YehtPloM5a2qjFnojLzil2k';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      fontLoaded: false,
      courseStarted: false,
      ready : false
    };

    this.pubnub = new PubNubReact({
      publishKey: "pub-c-4e1007f6-a370-4538-8465-630ea4cc6ab6",
      subscribeKey: "sub-c-b6c24fd6-4ce6-11ea-80a4-42690e175160"
    });
    this.pubnub.init(this);
  }

  async componentDidMount() {
    Location.requestPermissionsAsync();

    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });

    this.watchLocation();
  }

  watchLocation = () => {
    const { coordinate } = this.state;

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        if (this.marker) {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1,
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      this.pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        channel: 'location',
      });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  focusLoc = () => {
    if(this.state.ready){
      if(this.state.courseStarted){
    region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    this.map.animateToRegion(region, 2000);
  }
}
  }

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => (this.map = ref)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onMapReady={this.onMapReady}
          region={{ latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
          followsUserLocation={true}
          onRegionChangeComplete={this.focusLoc}>
          <MapView.Marker
            coordinate={
              this.props.destination
            }
            title={"title"}
            description={"description"}
          />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
          <MapViewDirections
            origin={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            destination={this.props.destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#a64253"
          />
        </MapView>
        <View style={styles.buttonArea}>
          {
            this.state.fontLoaded ? (
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { this.setState({ courseStarted: !this.state.courseStarted }) }}>
                <Text style={{ fontSize: 21, fontFamily: 'Montserrat-Bold', paddingTop: '7%', paddingBottom: '7%' }}>{this.state.courseStarted ? 'Terminé' : 'Départ'}</Text>
              </TouchableOpacity>
            ) : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonArea: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: "10%",
    backgroundColor: "#FAFAFA",
    width: 280,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
});

const mapStateToProps = (state) => {
  return {
    destination: state.destination.destination
  };
}
export default connect(mapStateToProps)(Map);
