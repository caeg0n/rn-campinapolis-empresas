import React from 'react';
import { Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Box } from '@src/components';
import { HeadingInformation } from './HeadingInformation';
import { AddToBasketForm } from './AddToBasketForm';
import { CartContext } from '@src/cart';
import { formatCurrency } from '@src/utils';
import styles from './DishDetails.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExploreStackNavigation } from '@src/hooks';
import { useEffect } from 'react';
import { SideDishes } from './SideDishes';
//import { mockDishDetails } from "@src/data"
//import { useSelector } from 'react-redux';
//import { useAppTheme } from '@src/theme';

function getDishesByOrganizationId(arr, orgId) {
  return arr.filter((item) => item.dish.organization_id === orgId);
}

function popDishBySelectedDishValue(array, selectedDish) {
  const index = array.findIndex(item => item.selectedDish === selectedDish);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};

function removeItemsFromBasket (sourceArray, targetArray) {
  const idsToRemove = sourceArray.map(item => item.dish.id);
  for (let i = targetArray.length - 1; i >= 0; i--) {
    if (idsToRemove.includes(targetArray[i].dish.id)) {
      targetArray.splice(i, 1);
    }
  }
};

function removeItemsByUuids (sourceArray, targetArray) {
  const uuidsToRemove = sourceArray.map(item => item.uuid);
  for (let i = targetArray.length - 1; i >= 0; i--) {
    if (uuidsToRemove.includes(targetArray[i].uuid)) {
      targetArray.splice(i, 1);
    }
  }
};

function calculateTotalPrice (items) {
  return items.reduce((acc, item) => {
    const partialPrice = item.dish.amount * parseFloat(item.dish.price);
    return acc + partialPrice;
  }, 0);
};

export const DishDetails = ({ route }) => {
  //const { colors } = useAppTheme();
  const { organizationTitle = '' } = route.params;
  const { organization = {} } = route.params;
  const [ subtotal, setSubtotal ] = React.useState(0);
  const { product = null } = route.params;
  const { goBack } = useExploreStackNavigation();
  const { bottom } = useSafeAreaInsets();
  const { cartItems, addCartItems, updateCartItems } = React.useContext(CartContext);
  const [ basketItems ] = React.useState(getDishesByOrganizationId(cartItems, organization.id));
  const [ removedItems, setRemovedItems ] = React.useState([]);
  const [ totalPrice, setTotalPrice ] = React.useState(
    parseFloat(product?.price || '0'),
  );
  const [scrollY] = React.useState(new Animated.Value(0));
  let [my_product, setMyProduct] = React.useState({});
  
  useEffect(() => {
    var basketTotal = 0;
    var removedFromBasketTotal = 0;
    setMyProduct({ ...product, amount: 1 });
    basketItems.forEach((item) => {
      basketTotal += item.dish.price * item.dish.amount;
    });
    removedItems.forEach((item) => {
      removedFromBasketTotal += item.dish.price * item.dish.amount;
    });
    setSubtotal(basketTotal-removedFromBasketTotal);
  }, [product, removedItems]);

  const updateTotalDishAmount = React.useCallback(
    (amount) => {
      setMyProduct({ ...product, amount: amount });
      setTotalPrice(parseFloat(product.price) * amount);
    },
    [product],
  );

  const onAddToBasketButtonPress = () => {
    cartItems.push({ dish: my_product, uuid: cartItems.length});
    updateCartItems(cartItems, totalPrice);
    goBack();
  };

  const onUpdateBasketButtonPress = () => {
    const myCartItems = JSON.parse(JSON.stringify(cartItems));
    removeItemsFromBasket(removedItems, basketItems);
    removeItemsByUuids(removedItems, myCartItems);
    addCartItems(myCartItems, calculateTotalPrice(myCartItems));
    goBack();
  };

  const removeItemFromBasket = (selectedDish, isChecked) => {
    if ( isChecked == false ) {
      const dishToCopy = basketItems[selectedDish];
      if (!dishToCopy) return;
      dishToCopy.selectedDish = selectedDish; 
      setRemovedItems(prevItems => [...prevItems, dishToCopy]);
    }
    if ( isChecked == true ) {
      popDishBySelectedDishValue(removedItems,selectedDish);  
      setRemovedItems(prevItems => [...prevItems]);
    }
  };

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  });

  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Box
      flex={1}
      style={{
        paddingBottom: bottom,
      }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        enabled>
        <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}>
          <Animated.View
            style={[
              styles.coverPhotoContainer,
              {
                transform: [
                  {
                    translateY: coverTranslateY,
                  },
                ],
              },
            ]}>
            <Animated.Image
              source={
                (product && product.image) != null
                  ? { uri: product.image }
                  : { uri: organization.cover }
              }
              style={[
                styles.coverPhoto,
                {
                  transform: [
                    {
                      scale: coverScale,
                    },
                  ],
                },
              ]}
            />
          </Animated.View>
          <HeadingInformation
            subtotal={subtotal}
            organizationTitle={organizationTitle}
            data={product}
          />
          {!product && (
            <SideDishes
              cartItems={cartItems}
              basketItems={basketItems}
              removeItemFromBasket={removeItemFromBasket}
            />
          )}
          {product && (
            <AddToBasketForm updateTotalDishAmount={updateTotalDishAmount} />
          )}
        </Animated.ScrollView>
      </KeyboardAvoidingView>
      <Box
        paddingHorizontal="m"
        paddingVertical="s"
        alignItems="center"
        justifyContent="center">
        {!product && (
          <Button
            isFullWidth
            label={`Atualizar o Carrinho`}
            onPress={onUpdateBasketButtonPress}
          />
        )}
        {product && (
          <Button
            isFullWidth
            label={`Adicionar ao Carrinho - ${formatCurrency(totalPrice)}`}
            onPress={onAddToBasketButtonPress}
          />
        )}
      </Box>
      {/* <Animated.View
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            backgroundColor: colors.card,
          },
        ]}>
        <Text variant="subHeader" numberOfLines={1} paddingHorizontal="l">
          {mockDishDetails.title}
        </Text>
      </Animated.View> */}
    </Box>
  );
};
