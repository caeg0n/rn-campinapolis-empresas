import React from 'react';
import { Box, Text, Section, Divider } from '@src/components';
import { formatCurrency } from '@src/utils';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';

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

function getOrganization(data, idToFind) {
  for (const category in data) {
    const foundElement = data[category].find((item) => item.id === idToFind);
    if (foundElement) {
      return foundElement;
    }
  }
  return {};
}

export const OrderSummary = ({ cartItem }) => {
  const { all_organizations, categories_and_products } = useSelector(
    (state) => state.userReducer,
  );
  let orders = [];

  cartItem.map((item) => {
    const order = findProductById(
      categories_and_products,
      item.product_id,
      item.amount,
    );
    orders.push(order);
  });

  const getOrganizationTitle = () => {
    const organizationName = findNameById(
      all_organizations,
      cartItem[0].organization_id,
    );
    return organizationName;
  };

  const findNameById = (data, idToFind) => {
    for (const category in data) {
      const foundElement = data[category].find((item) => item.id === idToFind);
      if (foundElement) {
        return foundElement.name;
      }
    }
    return null;
  };

  const TitleWithImage = () => (
    <Box flexDirection="row" alignItems="center">
      <Image
        source={{
          uri: getOrganization(all_organizations, cartItem[0].organization_id)
            .logo,
        }}
        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
      />
      <Text>{getOrganizationTitle()}</Text>
    </Box>
  );

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

  return (
    <Section style={{ marginTop: -20 }} title="Resumo do Pedido">
      <Section style={{ marginTop: -30 }} title={<TitleWithImage />}>
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
      {/* <Box backgroundColor="card" paddingVertical="s">
        <Box
          paddingHorizontal="m"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box flexDirection="row">
            <Box>
              <Text marginBottom="s" fontWeight="bold">
                {name}
              </Text>
            </Box>
          </Box>
          <Text fontWeight="bold">{formatCurrency(totalPrice)}</Text>
        </Box>
        <Divider marginVertical="s" />
        <Box paddingHorizontal="m">
          <Box flexDirection="row" justifyContent="space-between">
            <Text>Subtotal</Text>
            <Text>{formatCurrency(totalPrice)}</Text>
          </Box>
          <Box marginTop="s" flexDirection="row" justifyContent="space-between">
            <Text>Delivery: 6.1km</Text>
            <Text>{formatCurrency(shippingFee)}</Text>
          </Box>
          <Box marginTop="s" flexDirection="row" justifyContent="space-between">
            <Text>Total</Text>
            <Text>{formatCurrency(totalPrice + shippingFee)}</Text>
          </Box>
        </Box>
      </Box> */}
    </Section>
  );
};
