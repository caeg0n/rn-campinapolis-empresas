import React from 'react';
import { ColorSchemeName } from 'react-native';

type ThemeContext = {
  theme: ColorSchemeName | null;
  setTheme: (_: ColorSchemeName) => void;
  useSystemTheme: boolean;
  setUseSystemTheme: (_: boolean) => void;
};

export const ThemeContext = React.createContext<ThemeContext>({
  theme: null,
  useSystemTheme: true,
  setTheme: (_: ColorSchemeName) => {},
  setUseSystemTheme: (_: boolean) => {},
});
