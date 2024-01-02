import { useAppTheme } from '@src/theme';
import React from 'react';
import { Rating } from 'react-native-ratings';
import { RatingProps } from './RatingView.type';

export const RatingView: React.FC<RatingProps> = ({
  value = 1,
  readonly,
  itemSize = 16,
  ratingStarBackgroundColor,
  ...rest
}) => {
  const { colors } = useAppTheme();
  return (
    <Rating
      type="custom"
      readonly={readonly}
      startingValue={value}
      imageSize={itemSize}
      ratingColor={colors.primary}
      ratingBackgroundColor={colors.border}
      tintColor={
        ratingStarBackgroundColor ? ratingStarBackgroundColor : colors.card
      }
      {...rest}
    />
  );
};
