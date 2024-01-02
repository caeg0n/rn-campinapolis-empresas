import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { DeliveryInformation } from './DeliveryInformation';
import { OrderSummary } from './OrderSummary';
import { PaymentMethod } from './PaymentMethod';
import { PlaceOrder } from './PlaceOrder';
import { CartContext } from '@src/cart';
import { Box, Image } from '@src/components';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Text } from '@src/components';

function getUniqueOrganizationIds(dataArray) {
  const uniqueIds = new Set();

  dataArray.forEach((item) => {
    uniqueIds.add(item.dish.organization_id);
  });
  return Array.from(uniqueIds);
}

function filterAndCalculateDeliveryFee(dataObject, idArray) {
  const filteredObjects = [];
  for (const key in dataObject) {
    if (dataObject.hasOwnProperty(key)) {
      const objects = dataObject[key].filter((obj) => idArray.includes(obj.id));
      if (objects.length > 0) {
        filteredObjects.push(...objects);
      }
    }
  }
  const sumDeliveryFee = filteredObjects.reduce((total, obj) => {
    return total + parseFloat(obj.delivery_fee);
  }, 0);
  return sumDeliveryFee;
}

function groupAndSumById(arr) {
  const groupedItems = {};
  arr.forEach((item) => {
    const id = item.dish.id;
    if (!groupedItems[id]) {
      groupedItems[id] = { ...item };
    } else {
      groupedItems[id].dish.amount += item.dish.amount;
    }
  });
  const resultArray = Object.values(groupedItems);
  return resultArray;
}

function groupByOrganizationId(items) {
  const grouped = {};
  items.forEach((item) => {
    const { organization_id } = item.dish;
    if (!grouped[organization_id]) {
      grouped[organization_id] = [];
    }
    grouped[organization_id].push(item);
  });
  return Object.values(grouped);
}

export const Checkout = ({ route }) => {
  const localization = route.params;
  const [refresh, setRefresh] = useState(false);
  const { cartItems, totalBasketPrice } = React.useContext(CartContext);
  const { all_organizations } = useSelector((state) => state.userReducer);
  const { addresses } = useSelector((state) => state.sessionReducer);

  useFocusEffect(
    React.useCallback(() => {
      setRefresh(!refresh);
    }, []),
  );

  const renderOrders = () => {
    const myCartItems = JSON.parse(JSON.stringify(cartItems));
    return groupByOrganizationId(groupAndSumById(myCartItems)).map(
      (cartItem, index) => (
        <OrderSummary
          cartItem={cartItem}
          cartItemIndex={index}
          key={index}
          totalPrice={totalBasketPrice}
        />
      ),
    );
  };

  const getShippingFeeSum = () => {
    return filterAndCalculateDeliveryFee(
      all_organizations,
      getUniqueOrganizationIds(cartItems),
    );
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <Box flex={1}>
          <ScrollView>
            <DeliveryInformation
              addresses={addresses}
              localization={localization}
            />
            {renderOrders()}
            <PaymentMethod />
          </ScrollView>
          <PlaceOrder
            totalPrice={totalBasketPrice}
            shippingFeeSum={getShippingFeeSum()}
          />
          {/*<PlaceOrder totalPrice={totalBasketPrice} /> */}
        </Box>
      ) : (
        <Box flex={1}>
          <Box
            flex={1}
            style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                color: 'red',
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              Carrinho Vazio
            </Text>
            <Image
              source={require('@src/assets/animations/empty-cart.gif')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 150,
              }}
            />
          </Box>
          <Box width="100%" paddingHorizontal="m" backgroundColor="card">
            <Button label={'Comprar'} isFullWidth paddingVertical="m" />
          </Box>
        </Box>
      )}
    </>
  );
};
