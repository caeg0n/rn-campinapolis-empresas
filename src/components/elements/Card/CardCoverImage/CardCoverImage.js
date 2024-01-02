import React from 'react';
import { createRestyleComponent, createVariant } from '@shopify/restyle';
import { Image } from '../../Image';
import { Box } from '../../Box';

const CoverImage = createRestyleComponent(
  [
    createVariant({
      themeKey: 'cardCoverImageSizeVariants',
      property: 'size',
    }),
  ],
  Image,
);

export const CardCoverImage = ({ ...rest }) => {
  return (
    <Box>
      <CoverImage
        width="100%"
        borderTopLeftRadius="m"
        borderTopRightRadius="m"
        {...rest}
      />
    </Box>
  );
};
