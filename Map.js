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
const LATITUDE_DELTA_HAUT = 0.015;
const LATITUDE_DELTA_BAS = 0.007;
const LONGITUDE_DELTA_HAUT = LATITUDE_DELTA_HAUT * ASPECT_RATIO;
const LONGITUDE_DELTA_BAS = LATITUDE_DELTA_BAS * ASPECT_RATIO;

const SPACE = 0.01;
const GOOGLE_MAPS_APIKEY = 'AIzaSyB2sGMhio_-YehtPloM5a2qjFnojLzil2k';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA_HAUT,
      longitudeDelta: LONGITUDE_DELTA_HAUT,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      markers: [],
      fontLoaded: false,
      courseStarted: false,
      ready: false,
      locations: null,
      locationsReady: false
    };

    this.pubnub = new PubNubReact({
      publishKey: "pub-c-4e1007f6-a370-4538-8465-630ea4cc6ab6",
      subscribeKey: "sub-c-b6c24fd6-4ce6-11ea-80a4-42690e175160"
    });
    this.pubnub.init(this);
  }

  async componentDidMount() {
    await Location.requestPermissionsAsync();

    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });
    await this.getLocations();
    this.setState({ locationsReady: true });
    this.setState({ fontLoaded: true });

    console.log(this.state.locations);


    this.watchLocation();
  }

  checkLatitude = () => {
    if (!this.state.courseStarted) {
      this.setState({ latitudeDelta: LATITUDE_DELTA_BAS, longitudeDelta: LONGITUDE_DELTA_BAS })
    } else {
      this.setState({ latitudeDelta: LATITUDE_DELTA_HAUT, longitudeDelta: LONGITUDE_DELTA_HAUT })
    }
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
        console.log(position.latitude);
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

  UNSAFE_componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  focusLoc = () => {
    if (this.state.ready) {
      if (this.state.courseStarted) {
        let region = {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        };

        this.map.animateToRegion(region, 1000);
      }
    }
  }

  getLocations() {
    return fetch('http://185.212.225.143/api/locations')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          locations: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ ready: true });
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
          region={{ latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: this.state.latitudeDelta, longitudeDelta: this.state.longitudeDelta }}
          followsUserLocation={true}
          onRegionChangeComplete={this.focusLoc}>
          <MapView.Marker
            coordinate={
              this.props.destination
            }
            title={"title"}
            description={"description"}
          />
          {
            this.state.locationsReady ? (
              <MapView.Marker
                coordinate={{
                  latitude: this.state.locations[0].latitude,
                  longitude: this.state.locations[0].longitude
                }}
                title={"title"}
                description={"description"}
              />
            ) : null
          }
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
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { this.checkLatitude(); this.setState({ courseStarted: !this.state.courseStarted }) }}>
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
