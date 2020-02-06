import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import MapView from 'react-native-maps'

export class Map extends Component {

    state = {
      latitude: null,
      longitude: null,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      //coordinate: new AnimatedRegion({
       //latitude: null,
       //longitude: null
      //})
    };
  
  render() {
    return (
        <MapView        style={{flex: 1}}        region={{          latitude: 42.882004,          longitude: 74.582748        }}        showsUserLocation={true}      />
    );
  }
};

export default Map;
