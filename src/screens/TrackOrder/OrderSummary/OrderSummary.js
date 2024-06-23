import React from 'react';
import { Box, Text, Section, Divider } from '@src/components';
import { formatCurrency } from '@src/utils';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { myConnGet } from '@src/utils';

import { DEV_API_BASE, PROD_API_BASE } from '@env';

const API_BASE_URL = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
const GET_ADDRESS_URL = API_BASE_URL + '/empresa/get_address_by_id';

const findProductById = (productsArray, productId, amount) => {
  let foundProduct = null;
  for (const organization of productsArray) {
    for (const category of organization.categories) {
      foundProduct = category.products.find(
        (product) => product.id === productId,
      );
      if (foundProduct) {
        return {
          amount: amount,
          title: foundProduct.title,
          price: foundProduct.price,
          product_id: foundProduct.id,
        };
      }
    }
  }
  return null;
};

function findDeliveryFeeById(data, idToFind) {
  for (const category in data) {
    if (data.hasOwnProperty(category)) {
      for (const item of data[category]) {
        if (item.id === idToFind) {
          return item.delivery_fee;
        }
      }
    }
  }
  return null;
}

export const OrderSummary = ({ cartItem }) => {
  const { all_organizations, categories_and_products } = useSelector(
    (state) => state.userReducer,
  );
  const [address, setAddress] = useState({});
  let orders = [];

  cartItem.map((item) => {
    const order = findProductById(
      categories_and_products,
      item.product_id,
      item.amount,
    );
    orders.push(order);
  });

  useEffect(() => {
    const fetchData = async () => {
      getAddressById();
    };
    fetchData();
  }, []);

  const getAddressById = async () => {
    const transaction = await myConnGet(
      GET_ADDRESS_URL + '/' + cartItem[0].address,
    );
    if (transaction.state == true) {
      console.log(transaction);
      const address = transaction.json.data;
      setAddress(address);
    }
  };

  const getItemTotalPrice = (item) => {
    return formatCurrency(item.price * item.amount);
  };

  const getItemAmount = (item) => {
    switch (item.amount > 0 && item.amount < 10) {
      case true:
        return `0${item.amount}`;
      case false:
        return `${item.amount}`;
      default:
        return `${item.amount}`;
    }
  };

  const getSubtotal = () => {
    let total = 0;
    orders.forEach((item) => {
      total += item.price * item.amount;
    });
    return total;
  };

  const getShippingFee = () => {
    const organizationShippingFee = findDeliveryFeeById(
      all_organizations,
      cartItem[0].organization_id,
    );
    return formatCurrency(organizationShippingFee);
  };

  const TitleWithInfo = () => {
    return (
      <Box>
        <Text style={{ fontSize: 12 }}>
          {'Data: ' + cartItem[0].data}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {'Cliente: ' + cartItem[0].consumer_name}
        </Text>
        <Text style={{ fontSize: 12 }}>{'Endereço: ' + address.address}</Text>
        <Text style={{ fontSize: 12 }}>{'Celular: ' + address.cel }</Text>
      </Box>
    );
  };

  return (
    <Section style={{ marginTop: -20 }} title={TitleWithInfo()}>
      <Section style={{ marginTop: -50 }}>
        <Box backgroundColor="card">
          <Box padding="m">
            {orders.map((item, i) => (
              <Box key={i} flexDirection="row" justifyContent="space-between">
                <Text marginRight="m">{getItemAmount(item)}</Text>
                <Text marginBottom="xs" fontWeight="bold">
                  {item.title}
                </Text>
                <Text fontWeight="bold"> {getItemTotalPrice(item)}</Text>
              </Box>
            ))}
          </Box>
          <Divider />
          <Box padding="m">
            <Box flexDirection="row" justifyContent="space-between">
              <Text>Total</Text>
              <Text>{formatCurrency(getSubtotal())}</Text>
            </Box>
            <Box
              marginTop="s"
              flexDirection="row"
              justifyContent="space-between">
              <Text>Entregador</Text>
              <Text>{getShippingFee()}</Text>
            </Box>
          </Box>
        </Box>
      </Section>
      {
        <Box backgroundColor="card" paddingVertical="s">
          <Box
            paddingHorizontal="m"
            flexDirection="row"
            justifyContent="space-between">
          </Box>
          <Divider marginVertical="s" />
          <Box paddingHorizontal="m">
            <Box flexDirection="row" justifyContent="space-between"></Box>
            <Box
              marginTop="s"
              flexDirection="row"
              justifyContent="space-between"></Box>
          </Box>
        </Box>
      }
    </Section>
  );
};
