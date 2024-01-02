import React from 'react';
import { ScrollView } from 'react-native';
import { RadioButton, Icon, Box } from '@src/components';
import { useDispatch } from 'react-redux';
import { setSelectedPaymentMethod } from '@src/redux/actions/session';
import { useSelector } from 'react-redux';

function findObjectById(array, id) {
  return array.find(item => item.id === id);
}

export const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { all_payments_methods } = useSelector((state) => state.userReducer);
  const { selected_payment_method } = useSelector((state) => state.sessionReducer);
  
  const data = all_payments_methods.map((item) => {
    const { id, name, icon } = item;
    return {
      label: name,
      value: id,
      rightElement: <Icon name={icon} />,
    };
  });

  const onItemPress = (item) => {
    dispatch(setSelectedPaymentMethod(findObjectById(all_payments_methods, item.value)));
  };

  return (
    <Box flex={1} backgroundColor="card">
      <ScrollView>
        <RadioButton
          data={data}
          defaultValue={selected_payment_method.id}
          onItemPress={onItemPress}
          containerProps={{
            paddingHorizontal: 'm',
          }}
        />
      </ScrollView>
    </Box>
  );
};
