import { SwipeRatingProps } from 'react-native-ratings';

export type RatingViewProps = {
  value?: number;
  readonly?: boolean;
  itemSize?: number;
  ratingStarBackgroundColor?: string;
};
export type RatingProps = RatingViewProps & SwipeRatingProps;
