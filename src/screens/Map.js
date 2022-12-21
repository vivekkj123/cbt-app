import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

const Map = () => {
  let Markers = [
    {
      key: 0,
      title: 'Collection Center 1 (Main Block)',
      description: 'Contact No: +91 9400457856',
      latlng: {
        latitude: 10.3595,
        longitude: 76.2859,
      },
    },
    {
      key: 1,
      title: 'Collection Center 2 (Decennial Block)',
      description: 'Contact No: +91 7907184843',
      latlng: {
        latitude: 10.3580842,
        longitude: 76.2858239,
      },
    },
  ];
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.3595,
          longitude: 76.2859,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
        }}>
        {Markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
