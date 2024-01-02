import { useAppTheme } from '@src/theme';
import { FlatList, FlatListProps } from 'react-native';
import { Divider } from '../Divider';
import React from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { Text } from '../Text';
import { Box } from '../Box';

export function List<T>({ contentContainerStyle, ...rest }: FlatListProps<T>) {
  const { colors } = useAppTheme();
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderDivider = () => {
    return <Divider />;
  };

  return (
    <FlatList
      ref={ref}
      ItemSeparatorComponent={renderDivider}
      ListEmptyComponent={
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text variant="secondary">No data</Text>
        </Box>
      }
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={[
        {
          backgroundColor: colors.card,
        },
        contentContainerStyle,
      ]}
      {...rest}
    />
  );
}
