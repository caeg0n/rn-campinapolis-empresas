import React from 'react';
import ReanimatedCarousel from 'react-native-reanimated-carousel';

export const Carousel = ({ numItemsPerSlide, width = 0, ...rest }) => {
  const carouselWidth = numItemsPerSlide ? width / numItemsPerSlide : width;

  return (
    <ReanimatedCarousel
      loop={false}
      width={carouselWidth}
      style={{
        width,
      }}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      {...rest}
    />
  );
};
