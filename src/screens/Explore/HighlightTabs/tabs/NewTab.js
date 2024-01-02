import React from 'react';
import { Box, PlaceListItem } from '@src/components';
import { useSelector } from 'react-redux';

export const NewTab = () => {
  const { all_closed_organizations } = useSelector(
    (state) => state.userReducer,
  );

  return (
    <Box backgroundColor="card" padding="s" paddingTop="none">
      {all_closed_organizations.map((item) => {
        return <PlaceListItem key={item.id} data={item} />;
      })}
    </Box>
  );
};
