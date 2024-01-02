import React, { useState, useEffect } from 'react';
import { Box, Icon, Text } from '../elements';
import { fontSize } from '@src/theme';
import * as Location from 'expo-location';
//import { Platform } from 'react-native';

function formatAddress(addressObj) {
  const parts = [
    addressObj.street,
    addressObj.number,
    addressObj.district,
    addressObj.city,
    addressObj.state,
    addressObj.country,
  ];
  const filteredParts = parts.filter((part) => part != null);
  return filteredParts.join(', ');
}

export const ExploreHeaderTitle = () => {
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let address = {};
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão as localizações negada');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (reverseGeocode && reverseGeocode.length > 0) {
          address.street = reverseGeocode[0].street || null;
          address.number =
          reverseGeocode[0].streetNumber || reverseGeocode[0].name;
          address.district = reverseGeocode[0].district || null;
          address.city = reverseGeocode[0].city || reverseGeocode[0].subregion;
          address.state = reverseGeocode[0].region || null;
          address.country =
            reverseGeocode[0].country || reverseGeocode[0].isoCountryCode;
          const cleanedNullAddress = Object.fromEntries(
            Object.entries(address).filter(([_, value]) => value !== null),
          );
          cleanedUndefinedAddress = Object.fromEntries(
            Object.entries(cleanedNullAddress).filter(
              ([_, value]) => value !== 'undefined',
            ),
          );
          //setAddress(`${cleanedUndefinedAddress?.street}, ${cleanedUndefinedAddress?.number}, ${cleanedUndefinedAddress?.district}, ${cleanedUndefinedAddress?.city}, ${cleanedUndefinedAddress?.state}, ${cleanedUndefinedAddress?.country}`);
          setAddress(formatAddress(cleanedUndefinedAddress));
        }
      } catch (error) {
        console.error(error);
        setErrorMsg('Erro ao obter endereço');
      }
    })();
  }, []);

  let text = 'Aguarde..';
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = address;
  }

  return (
    <Box flexDirection="row" alignItems="center">
      <Icon name="location" size={fontSize.m} isPrimary />
      <Text marginLeft="s"
        style={{
          fontWeight: 'bold',
          flexShrink: 1, // Allows text to shrink and wrap
        }}
        numberOfLines={2} // Optional: you can adjust the number of lines or remove it for unlimited lines
      >
        {text}
      </Text>
    </Box>
  );
};
