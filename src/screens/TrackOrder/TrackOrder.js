import React from 'react';
import { DeliveryTime } from './DeliveryTime';
import { Divider, Box, Button } from '@src/components/elements';
import { DeliveryDetail } from './DeliveryDetail';
import { useSelector } from 'react-redux';
// import { DeliveryStep } from './DeliveryStep';

export const TrackOrder = ({ route }) => {
  const { orders } = useSelector((state) => state.sessionReducer);
  const { category, orderId, organizationName } = route.params;
  const [isStepsVisible, setIsStepsVisible] = React.useState(false);
  
  const onDetailButtonPress = () => {
    setIsStepsVisible(!isStepsVisible);
  };

  return (
    <Box flex={1}>
      <Box flex={1}>
        <Box>
          <DeliveryTime organization={organizationName}/>
          <Divider />
        </Box>
        {/* {isStepsVisible && (
          <DeliveryStep orderId={orderId} category={category} />
        ) || <DeliveryDetail orders={orders} orderId={orderId} />} */}
        <DeliveryDetail orders={orders} orderId={orderId} />
      </Box>
      {/* <Box width="100%" paddingHorizontal="m" backgroundColor="card">
        <Button
          label={ isStepsVisible && ('Detalhes do Pedido') || 'Rastrear Pedido'}
          isFullWidth
          paddingVertical="m"
          onPress={onDetailButtonPress}
        />
      </Box> */}
    </Box>
  );
};
