import React from 'react';
import { mockRemarkablePlace } from '@src/data';
import { Box, PlaceListItem } from '@src/components';

export const TrendingTab = () => {
  return (
    <Box backgroundColor="card" padding="s" paddingTop="none">
      {mockRemarkablePlace.trending.map((item) => {
        return <PlaceListItem key={item.id} data={item} />;
      })}
    </Box>
  );
};
