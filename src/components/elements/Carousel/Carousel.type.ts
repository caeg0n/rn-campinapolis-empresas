import { TCarouselProps } from 'react-native-reanimated-carousel';

export type CarouselProps<T = any> = TCarouselProps<T> & {
  numItemsPerSlide?: number;
};
