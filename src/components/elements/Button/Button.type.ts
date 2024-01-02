import {
  ColorProps,
  SpacingProps,
  BackgroundColorProps,
  VariantProps,
  LayoutProps,
  VisibleProps,
  OpacityProps,
  BorderProps,
  TextProps,
  PositionProps,
} from '@shopify/restyle';
import { Theme } from '@src/theme';

import { TouchableProps } from '../Touchable';

export type ButtonRestyleProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  VisibleProps<Theme> &
  OpacityProps<Theme> &
  BorderProps<Theme> &
  PositionProps<Theme> &
  BackgroundColorProps<Theme>;

export type ButtonVariants = VariantProps<Theme, 'buttonVariants'>;
export type ButtonSizeVariants = VariantProps<
  Theme,
  'buttonSizeVariants',
  'buttonSize'
>;

export type ButtonProps = ButtonRestyleProps &
  ButtonVariants &
  ButtonSizeVariants & {
    buttonSize?: ButtonSizeVariants['buttonSize'];
    onPress?: TouchableProps['onPress'];
    isFullWidth?: boolean;
    label?: string;
    textAlign?: TextProps<Theme>['textAlign'];
    children?: React.ReactNode;
  };
