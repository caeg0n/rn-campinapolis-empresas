import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '../elements';
import { useSafeAreaScrollViewStyles } from '@src/hooks';

export const AuthenticationLayout = ({ title, subtitle, children, footer }) => {
  const styles = useSafeAreaScrollViewStyles(true, true);
  return (
    <ScrollView contentContainerStyle={[styles.contentContainer]}>
      <Box marginTop="l" marginBottom="m">
        <Text fontWeight="bold" variant="largeHeader">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="secondary" marginVertical="s">
            {subtitle}
          </Text>
        ) : null}
        <Box marginTop="m">{children}</Box>
      </Box>
      {footer ? <Box>{footer}</Box> : null}
    </ScrollView>
  );
};
