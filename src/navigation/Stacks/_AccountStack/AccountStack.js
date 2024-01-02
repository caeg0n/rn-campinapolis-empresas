import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@src/components';
import {
  Account,
  AddAddress,
  EditProfile,
  SavedAddresses,
  SelectLocation,
  Settings,
  SupportCenter,
} from '@src/screens';

const Stack = createNativeStackNavigator();

export const AccountStack = (props) => {
  const { navigation } = props;
  const renderAddAddressHeaderRight = () => {
    return (
      <Icon
        name="map"
        size={18}
        isPrimary
        onPress={() => navigation.navigate('SelectLocation')}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        options={() => {
          return {
            title: 'Account',
          };
        }}
        name="Account"
        component={Account}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Edit Profile',
          };
        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        name="SavedAddresses"
        options={{
          headerTitle: 'Saved Address',
        }}
        component={SavedAddresses}
      />
      <Stack.Screen
        name="AddAddress"
        options={{
          headerTitle: 'Add An Address',
          headerRight: renderAddAddressHeaderRight,
        }}
        component={AddAddress}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerTitle: 'Settings',
        }}
        component={Settings}
      />
      <Stack.Screen
        name="SupportCenter"
        options={{
          headerTitle: 'Support Center',
        }}
        component={SupportCenter}
      />
      <Stack.Screen
        name="SelectLocation"
        options={{
          headerTitle: 'Select location',
        }}
        component={SelectLocation}
      />
    </Stack.Navigator>
  );
};
