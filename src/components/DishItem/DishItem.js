import React from 'react';
import { Box, Text, Touchable, Image } from '../elements';
import { formatCurrency } from '@src/utils';
import { useExploreStackNavigation } from '@src/hooks';

export const DishItem = ({ data }) => {
  const { price, title, description, image } = data;
  const navigation = useExploreStackNavigation();

  const onPlaceItemPress = () => {
    let product = data;
    navigation.navigate('DishDetailsModal', { product });
  };

  return (
    <Touchable onPress={onPlaceItemPress} activeOpacity={0.5}>
      <Box flexDirection="row" padding="m" backgroundColor="card">
        {image && (
          <Image
            width={70}
            height={70}
            borderRadius="m"
            marginRight="m"
            source={image}
          />
        )}
        <Box flex={1}>
          <Box>
            <Text fontWeight="bold">{title}</Text>
            <Text
              variant="secondary"
              marginTop="xs"
              marginBottom="s"
              numberOfLines={3}>
              {description}
            </Text>
            <Text fontWeight="bold" color="primary">
              {formatCurrency(parseFloat(price))}
            </Text>
          </Box>
        </Box>
      </Box>
    </Touchable>
  );
};
