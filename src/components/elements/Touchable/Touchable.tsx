import { createBox } from '@shopify/restyle';
import { Theme } from '@src/theme';
import React from 'react';
import { Platform, TouchableNativeFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableProps } from './Touchable.type';

export const InnerTouchable: React.FC<TouchableProps> = ({
  children,
  variant,
  ...rest
}) => {
  return Platform.OS === 'ios' || variant === 'transparent' ? (
    <TouchableOpacity {...rest}>{children}</TouchableOpacity>
  ) : (
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  );
};

export const Touchable = createBox<Theme, TouchableProps>(InnerTouchable);
