import React from 'react';
import { StorybookDecoratorProps } from './StorybookDecorator.type';
import { ThemeContext, fontSize } from '@src/theme';
import { Icon, Text, Box } from '../elements';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

export const StorybookDecorator: React.FC<StorybookDecoratorProps> = ({
  children,
}) => {
  const isFocused = useIsFocused();
  const { setTheme, theme } = React.useContext(ThemeContext);

  const onThemeIconPress = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      {isFocused && <StatusBar />}
      <Box
        backgroundColor="card"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="m">
        <Text variant="subHeader">Documentation</Text>
        <Icon
          name={theme === 'dark' ? 'sunny' : 'moon'}
          size={fontSize.xl}
          onPress={onThemeIconPress}
        />
      </Box>
      <Box flex={1} padding="m">
        {children}
      </Box>
    </Box>
  );
};
