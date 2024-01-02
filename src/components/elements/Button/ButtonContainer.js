import { createRestyleComponent, createVariant } from '@shopify/restyle';
import { Box } from '../Box';

export const ButtonContainer = createRestyleComponent(
  [
    createVariant({ themeKey: 'buttonSizeVariants', property: 'buttonSize' }),
    createVariant({ themeKey: 'buttonVariants' }),
  ],
  Box,
);
