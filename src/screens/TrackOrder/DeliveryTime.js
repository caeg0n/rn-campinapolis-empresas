import React from 'react';
import { Box, Text } from '@src/components';

export const DeliveryTime = ({organization=""}) => {
  return (
    <Box
      backgroundColor="card"
      justifyContent="center"
      alignItems="center"
      >
      {/* <Text variant="secondary">TABACARIA</Text> */}
      <Text variant="subHeader" color="primary" >
        {organization}
      </Text>
    </Box>
  );
};
