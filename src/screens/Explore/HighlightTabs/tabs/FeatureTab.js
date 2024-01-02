import React from 'react';
import { Box, PlaceListItem } from '@src/components';
import { useSelector } from 'react-redux';

export const FeaturedTab = () => {
  const { all_opened_organizations } = useSelector(
    (state) => state.userReducer,
  );

  return (
    <Box backgroundColor="card" paddingTop="none">
      {all_opened_organizations.map((item) => {
        return <PlaceListItem key={item.id} data={item} />;
      })}
    </Box>
  );
};
