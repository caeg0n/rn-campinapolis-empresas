import { Box, TextField } from '@src/components';
import React from 'react';

export const SearchHeader = () => {
  console.log('searchHeader');
  return (
    <Box backgroundColor="card" padding="s">
      <TextField
        backgroundColor="background"
        leftIcon="search"
        borderWidth={0}
        inputProps={{
          placeholder: 'Find places, dishes, restaurants, etc.',
        }}
      />
    </Box>
  );
};

export const MemoizedSearchHeader = React.memo(SearchHeader);
