import { ColorSchemeName } from 'react-native/types';
import { Theme, darkTheme, theme } from './theme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SpacingProps } from '@shopify/restyle';

export const fontSize = {
  xs: 11,
  s: 13,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

export const getNavigationTheme = (themeScheme: ColorSchemeName) => {
  const appTheme = themeScheme === 'light' ? theme.colors : darkTheme.colors;

  const defaultNavigationTheme =
    themeScheme === 'light' ? DefaultTheme : DarkTheme;

  return {
    ...defaultNavigationTheme,
    colors: {
      ...defaultNavigationTheme.colors,
      primary: appTheme.primary,
      background: appTheme.background,
      card: appTheme.card,
      text: appTheme.text,
      border: appTheme.border,
    },
  };
};

export const extractSpacingProps = (prop: SpacingProps<Theme>) => {
  const {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,
    ...rest
  } = prop;
  return {
    spacingProps: {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      padding,
      paddingBottom,
      paddingEnd,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingStart,
      paddingTop,
      paddingVertical,
    },
    rest,
  };
};
