import { useTheme } from '@shopify/restyle';
import { Theme } from './theme';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import { ColorSchemeName } from 'react-native/types';

type AppTheme = Theme & {
  colorScheme: ColorSchemeName;
};

export const useAppTheme = (): AppTheme => {
  const { theme: colorScheme, useSystemTheme } = useContext(ThemeContext);

  const appTheme = useTheme<Theme>();

  return {
    ...appTheme,
    colorScheme,
  };
};
