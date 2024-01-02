import React from 'react';
import { View } from 'react-native';
import { Box, Text, CheckBox } from '@src/components';
import { formatCurrency } from '@src/utils';

export const SideDishes = ({ cartItems, basketItems, removeItemFromBasket }) => {
  const onCheckBoxPress = (selectedDish) => {
    return (isChecked) => {
      removeItemFromBasket(selectedDish, isChecked);
    };
  };

  // useEffect(() => {
  //   console.log('SideDishes');
  // });

  return (
    <View>
      {basketItems.map((dish, dishIndex) => (
        <Box
          key={dishIndex}
          backgroundColor="card"
          borderBottomWidth={dishIndex < dish.length - 1 ? 1 : 0}
          borderBottomColor="border">
          <CheckBox
            label={dish.dish.amount + ' ' + dish.dish.title}
            onChange={onCheckBoxPress(dishIndex)}
            rightElement={
              <Text color="primary">
                {formatCurrency(parseFloat(dish.dish.price * dish.dish.amount))}
              </Text>
            }
          />
        </Box>
      ))}
    </View>
  );
};
