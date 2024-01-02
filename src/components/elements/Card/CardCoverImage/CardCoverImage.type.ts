import { VariantProps } from '@shopify/restyle';
import { ImageProps } from '@src/components/Image/Image.type';
import { Theme } from '@src/theme';

export type CardCoverImageSizeVariants = VariantProps<
  Theme,
  'cardCoverImageSizeVariants',
  'size'
>;

export type CardCoverImageProps = ImageProps & CardCoverImageSizeVariants;
