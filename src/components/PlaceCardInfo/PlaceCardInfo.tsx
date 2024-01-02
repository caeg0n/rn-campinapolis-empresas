import React from 'react';
import { Place } from '@src/data';
import { fontSize } from '@src/theme';
import { Box, Icon, RatingView, Text } from '../elements';

type PlaceCardInfoProps = {
  data: Place;
  ratingStarBackgroundColor?: string;
};

export const PlaceCardInfo: React.FC<PlaceCardInfoProps> = ({
  data,
  ratingStarBackgroundColor,
}) => {
  const { distance, rating, time } = data;

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap">
      <Box paddingBottom="s">
        <RatingView
          value={rating}
          itemSize={16}
          readonly
          ratingStarBackgroundColor={ratingStarBackgroundColor}
        />
      </Box>
      <Box flexDirection="row">
        <Box
          flexDirection="row"
          borderWidth={1}
          borderColor="primary"
          alignItems="center"
          paddingHorizontal="s"
          paddingVertical="xxs"
          borderRadius="l"
          marginRight="s">
          <Icon name="location-outline" size={fontSize.xs} isPrimary />
          <Text
            color="primary"
            marginLeft="xs"
            fontSize={fontSize.xs}>{`${distance}m`}</Text>
        </Box>
        <Box
          flexDirection="row"
          borderWidth={1}
          borderColor="primary"
          alignItems="center"
          paddingHorizontal="s"
          paddingVertical="xxs"
          borderRadius="l">
          <Icon name="time-outline" size={fontSize.xs} isPrimary />
          <Text color="primary" marginLeft="xs" fontSize={fontSize.xs}>
            {`${time}'`}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
