import React from 'react';
import { Box, List, PlaceListItem } from '@src/components';
import { mockPlaceList } from '@src/data';

export const PlaceList = () => {
  return (
    <Box flex={1}>
      <List
        data={mockPlaceList}
        renderItem={({ item }) => {
          return <PlaceListItem key={item.id} data={item} hasDivider={false} />;
        }}
      />
    </Box>
  );
};
