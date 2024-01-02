import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AddAddress,
  ChangeAddress,
  Checkout,
  Explore,
  PaymentMethod,
  PlaceDetails,
  PlaceList,
  //Promotion,
  SavedAddresses,
  SelectLocation,
  TrackOrder,
} from '@src/screens';
import { fontSize } from '@src/theme';
import { Button, ExploreHeaderTitle, Icon } from '@src/components';
//import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export const ExploreStack = ({ navigation }) => {  
  const renderExploreHeaderLeft = () => <ExploreHeaderTitle />;
  const renderPlaceDetailHeaderRight = () => {
    return (
      <Button
        variant="transparent"
        buttonSize="xs"
        onPress={() => navigation.navigate('SearchDishesModal')}>
        <Icon name="search" size={fontSize.l} isPrimary />
      </Button>
    );
  };

  const renderAddressHeaderRight = () => {
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
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen
        options={() => {
          return {
            title: '',
            headerTitleAlign: 'left',
            headerLeft: renderExploreHeaderLeft,
          };
        }}
        name="Explore"
        component={Explore}
      />
      <Stack.Screen
        name="PlaceList"
        component={PlaceList}
        options={({ route: { params } }) => {
          return {
            headerTitle: params?.title
          };
        }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={({ route: { params } }) => {
          return {
            headerTitle: params?.title,
            //headerRight: renderPlaceDetailHeaderRight,
          };
        }}
      />
      <Stack.Screen
        options={{ headerTitle: 'Finalizar Pedido' }}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        name="ChangeAddress"
        options={{
          headerTitle: '587 Blanda Square - Virginia',
          headerRight: renderAddressHeaderRight,
        }}
        component={ChangeAddress}
      />
      <Stack.Screen
        name="SavedAddresses"
        options={{
          headerTitle: 'Endereços Salvos',
        }}
        component={SavedAddresses}
      />
      <Stack.Screen
        name="AddAddress"
        options={{
          headerTitle: 'Novo Endereço',
          //headerRight: renderAddressHeaderRight,
        }}
        component={AddAddress}
      />
      <Stack.Screen
        name="SelectLocation"
        options={{
          headerTitle: '588 Blanda Square - Virginia',
        }}
        component={SelectLocation}
      />
      <Stack.Screen
        name="PaymentMethod"
        options={{
          headerTitle: 'Selecione o Pagamento',
        }}
        component={PaymentMethod}
      />
      {/* <Stack.Screen
        name="Promotion"
        options={{
          headerTitle: 'Add A Promo',
        }}
        component={Promotion}
      /> */}
      <Stack.Screen
        name="TrackOrder"
        options={{
          headerTitle: 'Acompanhe seu Pedido',
        }}
        component={TrackOrder}
      />
    </Stack.Navigator>
  );
};
