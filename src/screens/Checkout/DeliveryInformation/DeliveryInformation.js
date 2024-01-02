import React, { useState } from 'react';
import {
  Box,
  Text,
  Section,
  Divider,
} from '@src/components';
import { useSelector } from 'react-redux';
import { useExploreStackNavigation } from '@src/hooks';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

export const DeliveryInformation = ({ localization }) => {
  const navigation = useExploreStackNavigation();
  const { selected_address } = useSelector((state) => state.sessionReducer);
  const [ address, setAddress ] = useState([]);

  useEffect(() => {
    if (selected_address && Object.keys(selected_address).length > 0) {
      setAddress(selected_address);
    }
  }, []);

  const onChangeAddressButtonPress = () => {
    navigation.navigate('SavedAddresses');
  };

  const newAddress = () => {
    navigation.navigate('AddAddress');
    return null;
  };

  return (
    <Section
      title="Entregar em"
      actionButtonText="Trocar endereço"
      hasDivider={false}
      onButtonActionPress={onChangeAddressButtonPress}>
      <Box backgroundColor="card">
        <Box flexDirection="row" padding="m">
          {localization && Object.keys(localization).length > 0 ? (
            <Box>
              <Text fontWeight="bold" marginBottom="s">
                {localization.title.toUpperCase()}
              </Text>
              <Text variant="secondary">Entregar para: {localization.name}</Text>
              <Text variant="secondary">Telefone: {localization.cel}</Text>
              <Text
                variant="secondary"
                accessibilityRole="link">
                Endereço: {localization.address}
              </Text>
            </Box>
          ) : address && Object.keys(selected_address).length > 0 ? (
            <Box>
              <Text fontWeight="bold" marginBottom="s">
                {address.title?.toUpperCase()}
              </Text>
              <Text variant="secondary">Entregar para: {address.name}</Text>
              <Text variant="secondary">Telefone: {address.cel}</Text>
              <Text
                variant="secondary"
                accessibilityRole="link">
                Endereço: {address.address}
              </Text>
            </Box>
          ) : (
            <Box>
              <TouchableOpacity onPress={newAddress}>
                <View style={styles.view}>
                  <Text style={styles.text}>Nenhum endereço cadastrado</Text>
                  <Ionicons
                    name="ios-add-circle"
                    size={24}
                    color="red"
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </Box>
          )}
        </Box>
        <Divider />
      </Box>
    </Section>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});

