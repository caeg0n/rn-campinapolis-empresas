import React, { useState }from 'react';
import { FeaturedTab, NewTab } from './tabs';
import { Box, TabView } from '@src/components';
import styles from './HighlightTabs.style';
import { useSelector } from 'react-redux';

export const HighlightTabs = () => {
  const { all_opened_organizations } = useSelector(
    (state) => state.userReducer,
  );
  const { all_closed_organizations } = useSelector(
    (state) => state.userReducer,
  );
  const [height, setHeight] = useState(112 * all_opened_organizations.length);

  const getIndex = (index) => {
    if(index==0){setHeight(112 * all_opened_organizations.length)}
    if(index==1){setHeight(115 * all_closed_organizations.length)}
  };

  const tabData = [
    { key: '0', title: 'Abertos', content: FeaturedTab },
    {
      key: '1',
      title: 'Fechados',
      content: NewTab,
    },
  ];

  return (
    <Box
      backgroundColor="card"
      borderTopRightRadius="xl"
      borderTopLeftRadius="xl"
      height={height}>
      <TabView getIndex={getIndex} tabData={tabData} tabBarStyle={styles.tabBarStyle} isFullWidth />
    </Box>
  );
};
