import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useAppTheme } from '@src/theme';
import { createBox } from '@shopify/restyle';

const InnerDateTimePicker = createBox(RNDateTimePicker);

export const DateTimePicker = ({ textColor, accentColor, ...rest }) => {
  const { colors, colorScheme } = useAppTheme();
  return (
    <InnerDateTimePicker
      textColor={textColor || colors.text}
      accentColor={accentColor || colors.primary}
      themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    />
  );
};
