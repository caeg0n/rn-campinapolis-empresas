import React from 'react';
import { Box, Text } from '@src/components/elements';
import { formatCurrency } from '@src/utils';

export const HeadingInformation = ({ data, organizationTitle, subtotal }) => {
  const { title = '', 
          price = 0, 
          description = 'Remova os produtos que não deseja' } = data || {};
  return (
    <Box backgroundColor="card" padding="m">
      <Box flexDirection="row" justifyContent="space-between">
        <Box width="70%" paddingRight="s">
          <Text variant="subHeader" numberOfLines={2}>
            {title || organizationTitle}
          </Text>
        </Box>
        {
          price > 0 ? 
            <Text variant="subHeader" color="primary">
              {formatCurrency(parseFloat(price))}
            </Text> 
          :
            <Text variant="subHeader" color="primary">
              {formatCurrency(subtotal)}
            </Text>
        }
      </Box>
      <Text marginTop="m">{description}</Text>
    </Box>
  );
};
