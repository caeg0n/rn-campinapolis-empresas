import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './SelectLocation.style';
import { googleMapDarkModeStyles } from '@src/utils';
import { Box } from '@src/components';
import { useAppTheme } from '@src/theme';

export const SelectLocation = () => {
  const { colors, colorScheme } = useAppTheme();
  const [currentLocation, setCurrentLocation] = React.useState({
    longitude: 0,
    latitude: 0,
    longitudeDelta: 0.0022,
    latitudeDelta: 0.0031,
  });
  const [markerLocation, setMarkerLocation] = React.useState();

  const initUserLocation = async () => {
    try {
      let position = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = position.coords;
      setCurrentLocation((location) => {
        setMarkerLocation({
          longitude,
          latitude,
        });
        return {
          ...location,
          longitude,
          latitude,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const requestPermission = async () => {
      const permission = await Location.getForegroundPermissionsAsync();

      if (permission.status !== Location.PermissionStatus.GRANTED) {
        const res = await Location.requestForegroundPermissionsAsync();
        if (!res.granted) {
          console.log('Location permission is not granted');
          return;
        }
      }

      initUserLocation();
    };

    requestPermission();
    initUserLocation();
  }, []);

  const onMapViewPressed = (event) => {
    const {
      nativeEvent: {
        coordinate: { latitude, longitude },
      },
    } = event;

    setMarkerLocation({
      latitude,
      longitude,
    });
  };

  const onRegionChangeComplete = (region) => {
    setCurrentLocation(region);
  };

  const onMarkerDragEd = (event) => {
    setMarkerLocation(event.nativeEvent.coordinate);
  };

  return (
    <Box flex={1}>
      <MapView
        loadingEnabled
        cacheEnabled
        loadingIndicatorColor={colors.primary}
        loadingBackgroundColor={colors.background}
        provider={PROVIDER_GOOGLE}
        toolbarEnabled
        showsUserLocation
        showsMyLocationButton
        style={styles.mapView}
        customMapStyle={
          colorScheme === 'dark' ? googleMapDarkModeStyles : undefined
        }
        zoomControlEnabled
        onRegionChangeComplete={onRegionChangeComplete}
        region={currentLocation}
        onPress={onMapViewPressed}>
        {markerLocation && (
          <Marker
            draggable
            coordinate={markerLocation}
            onDragEnd={onMarkerDragEd}
          />
        )}
      </MapView>
    </Box>
  );
};
