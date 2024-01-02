import React from 'react';
import { SectionProps } from './Section.type';
import { Text } from '../Text';
import { Box } from '../Box';
import { Touchable } from '../Touchable';
import { Divider } from '../Divider';

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  actionButtonText,
  hasDivider = true,
  onButtonActionPress,
  ...rest
}) => {
  const handleButtonActionPress = () => {
    if (onButtonActionPress) {
      onButtonActionPress();
    }
  };

  return (
    <Box {...rest}>
      {hasDivider && (
        <Divider backgroundColor="background" marginVertical="s" />
      )}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="m">
        {title ? (
          <Box flex={1}>
            <Text variant="subHeader" numberOfLines={2}>
              {title}
            </Text>
          </Box>
        ) : null}
        {actionButtonText ? (
          <Touchable onPress={handleButtonActionPress} variant="transparent">
            <Text variant="primary">{actionButtonText}</Text>
          </Touchable>
        ) : null}
      </Box>
      {children}
    </Box>
  );
};
