import React from 'react';
import { TextInput, I18nManager } from 'react-native';
import { Box } from '../Box';
import {
  backgroundColor,
  border,
  color,
  createRestyleComponent,
  layout,
  opacity,
  spacing,
  typography,
  visible,
} from '@shopify/restyle';
import { fontSize, useAppTheme } from '@src/theme';
import { Icon } from '../Icon';

const InnerTextInput = createRestyleComponent(
  [
    spacing,
    color,
    backgroundColor,
    layout,
    visible,
    opacity,
    border,
    typography,
  ],
  TextInput,
);

export const TextField = ({
  leftIcon,
  leftIconSize = fontSize.l,
  hasMargin,
  disabled = false,
  inputProps: { onFocus, onBlur, ...restInputProps },
  ...rest
}) => {
  const { colors } = useAppTheme();
  const [borderWidth, setBorderWidth] = React.useState(1);
  const handleOnFocus = (e) => {
    setBorderWidth(2);
    onFocus?.(e);
  };

  const handleOnBlur = (e) => {
    if (!disabled){
      setBorderWidth(1);
      onBlur?.(e);
    }
  };

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderRadius="l"
        backgroundColor={disabled ? 'lightGrey' : 'card'}
        borderWidth={borderWidth}
        borderColor="white"
        height={55}
        opacity={disabled ? 0.5 : 1}
        {...rest}
        margin={hasMargin ? 's' : undefined}>
        {leftIcon ? (
          <Box paddingLeft="m" paddingRight={I18nManager.isRTL ? 's' : 'none'}>
            <Icon name={leftIcon} size={leftIconSize} color={colors.text} />
          </Box>
        ) : null}
        <InnerTextInput
          color="text"
          fontSize={fontSize.m}
          placeholderTextColor={colors.secondary}
          underlineColorAndroid="transparent"
          flex={1}
          padding="m"
          paddingHorizontal="m"
          paddingLeft={leftIcon ? 's' : undefined}
          borderRadius="l"
          backgroundColor="transparent"
          height="100%"
          editable={!disabled}
          selectTextOnFocus={!disabled}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          {...restInputProps}
        />
      </Box>
    </>
  );
};
