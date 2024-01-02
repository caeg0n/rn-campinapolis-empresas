import React from 'react';
import { DeliveryTime } from './DeliveryTime';
import { DeliveryStep } from './DeliveryStep';
import { Divider, Box, Button } from '@src/components/elements';
import { DeliveryDetail } from './DeliveryDetail';
import { useSelector } from 'react-redux';
import { useExploreStackNavigation } from '@src/hooks';
//import { DeliveryMapView } from './DeliveryMapView';
//import { DriverInformation } from './DriverInformation';
//import { CartContext } from '@src/cart';


export const TrackOrder = ({ route }) => {
  //const { cartItems, totalBasketPrice } = React.useContext(CartContext);
  //const navigation = useExploreStackNavigation();
  //const { addresses } = useSelector((state) => state.sessionReducer);
  const { orders } = useSelector((state) => state.sessionReducer);
  const { category, orderId, organizationName } = route.params;
  const [isStepsVisible, setIsStepsVisible] = React.useState(false);

  //const onCancel = () => {
  //  navigation.navigate('Explore');
  //};

  const onDetailButtonPress = () => {
    //setIsMapViewVisible(!isMapViewVisible);
    //navigation.navigate('DeliveryDetail');
    setIsStepsVisible(!isStepsVisible);
  };

  return (
    <Box flex={1}>
      <Box flex={1}>
        <Box>
          <DeliveryTime organization={organizationName} />
          <Divider />
          {/* <DriverInformation /> */}
        </Box>
        {isStepsVisible && (
          <DeliveryStep orderId={orderId} category={category} />
        ) || <DeliveryDetail orders={orders} orderId={orderId} />}
      </Box>
      <Box width="100%" paddingHorizontal="m" backgroundColor="card">
        <Button
          label={ isStepsVisible && ('Detalhes do Pedido') || 'Rastrear Pedido'}
          isFullWidth
          paddingVertical="m"
          onPress={onDetailButtonPress}
        />
      </Box>
    </Box>
  );
};
