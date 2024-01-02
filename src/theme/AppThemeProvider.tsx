import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { ThemeContext } from './theme-context';
import { darkTheme, theme } from './theme';

type AppThemeProviderProps = {
  children?: React.ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const scheme = useColorScheme();
  const [currentTheme, setCurrentTheme] =
    React.useState<ColorSchemeName | null>('light');
  const [useSystemTheme, setUseSystemTheme] = React.useState(false);

  React.useEffect(() => {
    if (useSystemTheme) {
      setCurrentTheme(scheme);
    }
  }, [scheme, useSystemTheme]);

  const setTheme = React.useCallback((newTheme: ColorSchemeName) => {
    setCurrentTheme(newTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        useSystemTheme,
        setTheme: setTheme,
        setUseSystemTheme,
      }}>
      <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
