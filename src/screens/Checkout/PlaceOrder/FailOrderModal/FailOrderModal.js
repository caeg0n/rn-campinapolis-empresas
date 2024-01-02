import React from 'react';
import { Animated } from 'react-native';
import {
  Box,
  Text,
  Button,
  BottomSheetModal,
  LottieView,
} from '@src/components';
import styles from './SuccessOrderModal.style';
// import { CartContext } from '@src/cart';
import { useExploreStackNavigation } from '@src/hooks';

export const OrderFailModal = ({ isVisible, setIsVisble, modalError }) => {
  const navigation = useExploreStackNavigation();
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const fadeOut = React.useRef(new Animated.Value(1)).current;
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);
  // const { clearCart } = React.useContext(CartContext);

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: isAnimationFinished ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeOut, {
      toValue: isAnimationFinished ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isAnimationFinished, fadeIn, fadeOut]);
  
  const onAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  const onBackdropPress = () => {
    setIsVisble(false);
    setIsAnimationFinished(false);
  };

  // const onOrderSomethingElseButtonPress = () => {
  //   clearCart();
  //   setIsVisble(false);
  //   navigation.navigate('Explore');
  // };

  const onTrackOrderButtonPress = () => {
    setIsVisble(false);
    setIsAnimationFinished(false);
    navigation.navigate('Checkout');
  };

  return (
    <BottomSheetModal
      isOpened={isVisible}
      snapPoints={['95%']}
      onClose={onBackdropPress}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box width="100%" alignItems="center">
          <LottieView
            source={require('@src/assets/animations/order-error3.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
            height={120}
          />
          {!isAnimationFinished && (
            <Animated.View
              style={[styles.processingOrderContainer, { opacity: fadeOut }]}>
              <Text fontWeight="bold">Processando seu pedido...</Text>
            </Animated.View>
          )}
          <Animated.View
            style={[styles.successMessageContainer, { opacity: fadeIn }]}>
            <Text textAlign="center" variant="header" fontWeight="bold" color="primary">
              Desculpe, algo deu errado.
            </Text>
            <Text textAlign="center" marginTop="s">
              Seu pedido infelizmente não pode ser finalizado.
            </Text>
          </Animated.View>
        </Box>
        <Animated.View
          style={[styles.footerButtonContainer, { opacity: fadeIn }]}>
          <Button
            label="Voltar para o carrinho"
            isFullWidth
            onPress={onTrackOrderButtonPress}
          />
          {/* <Button
            label="Order Something Else"
            isFullWidth
            variant="transparent"
            marginTop="s"
            onPress={onOrderSomethingElseButtonPress}
          /> */}
        </Animated.View>
      </Box>
    </BottomSheetModal>
  );
};
