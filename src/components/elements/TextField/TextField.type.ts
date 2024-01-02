import { TextInputProps } from 'react-native/types';
import {
  ColorProps,
  SpacingProps,
  BackgroundColorProps,
  LayoutProps,
  VisibleProps,
  OpacityProps,
  BorderProps,
  TypographyProps,
} from '@shopify/restyle';
import { Theme } from '@src/theme';
import { IconProps } from '../Icon';

export type InputRestyleProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  VisibleProps<Theme> &
  OpacityProps<Theme> &
  BorderProps<Theme> &
  TypographyProps<Theme>;

export type TextFieldProps = {
  leftIcon?: IconProps['name'];
  leftIconSize?: number;
  hasMargin?: boolean;
  inputProps: TextInputProps;
} & InputRestyleProps;
