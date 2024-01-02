import React from 'react';
import { Box, Text, Section, Divider } from '@src/components';
import { formatCurrency } from '@src/utils';

export const OrderSummary = ({
  orderDetail: { name, price, shippingFee, totalItems },
}) => {
  const totalPrice = price * totalItems;

  return (
    <Section title="Order Summary">
      <Box backgroundColor="card" paddingVertical="m">
        <Box
          paddingHorizontal="m"
          flexDirection="row"
          justifyContent="space-between">
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
      </Box>
    </Section>
  );
};
