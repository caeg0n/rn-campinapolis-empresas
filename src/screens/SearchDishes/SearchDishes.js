import React from 'react';
import {
  BlurView,
  Box,
  Button,
  DishItem,
  SectionList,
  Text,
  TextField,
} from '@src/components';
import { mockPlaceDetails } from '@src/data';
import { isIos } from '@src/utils';
import { useExploreStackNavigation } from '@src/hooks';

export const SearchDishes = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigation = useExploreStackNavigation();

  const onCloseButtonPress = () => {
    navigation.goBack();
  };

  const onSearch = (e) => {
    setSearchTerm(e);
  };

  return (
    <Box flex={1}>
      <SectionList
        sections={mockPlaceDetails.dishSection || []}
        keyExtractor={(item) => item.title}
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <Box
            backgroundColor="card"
            flexDirection="row"
            alignItems="center"
            padding="m">
            <TextField
              leftIcon="search"
              flex={1}
              inputProps={{
                value: searchTerm,
                placeholder: 'Search a dish name',
                onChangeText: onSearch,
              }}
            />
            <Box width={70} alignItems="flex-end">
              <Button
                variant="transparent"
                buttonSize="xs"
                label="Cancel"
                onPress={onCloseButtonPress}
              />
            </Box>
          </Box>
        }
        renderSectionHeader={({ section }) => (
          <BlurView intensity={isIos ? 80 : 120}>
            <Text variant="subHeader" textAlign="left" padding="m">
              {section.title}
            </Text>
          </BlurView>
        )}
        renderItem={({ item }) => {
          return <DishItem data={item} />;
        }}
      />
    </Box>
  );
};
