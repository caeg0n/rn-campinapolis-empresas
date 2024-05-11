import React from 'react';
import { Animated, SafeAreaView } from 'react-native';
import { Box, Text, TabSectionList, Divider, DishItem } from '@src/components';
import { mockPlaceDetails } from '@src/data';
import styles from './ListProducts.style';
import { BasketSummary } from './BasketSummary';
import { PopularDishes } from './PopularDishes';
import { HeadingInformation } from './HeadingInformation';

export const ListProducts = () => {
  const [scrollY] = React.useState(new Animated.Value(0));

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  });

  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  const tabBarOpacity = scrollY.interpolate({
    inputRange: [200, 500],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderItemSeparator = () => (
    <Divider height={0.5} marginVertical="none" />
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Box flex={1}>
        <TabSectionList
          ListHeaderComponent={
            <>
              <Animated.View
                style={[
                  styles.coverPhotoContainer,
                  {
                    transform: [
                      {
                        translateY: coverTranslateY,
                      },
                    ],
                  },
                ]}>
                {mockPlaceDetails.coverImage && (
                  <Animated.Image
                    source={mockPlaceDetails.coverImage}
                    style={[
                      styles.coverPhoto,
                      {
                        transform: [
                          {
                            scale: coverScale,
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </Animated.View>
              <HeadingInformation data={mockPlaceDetails} />
              <PopularDishes />
            </>
          }
          sections={mockPlaceDetails.dishSection || []}
          keyExtractor={(item) => item.title}
          stickySectionHeadersEnabled={false}
          scrollToLocationOffset={5}
          tabBarStyle={[styles.tabBar, { opacity: tabBarOpacity }]}
          ItemSeparatorComponent={renderItemSeparator}
          renderTab={({ title, isActive }) => {
            const borderBottomWidth = isActive ? 2 : 0;
            return (
              <Box borderBottomWidth={borderBottomWidth} borderColor="primary">
                <Text
                  color={isActive ? 'primary' : 'text'}
                  padding="m"
                  fontWeight="500">
                  {title}
                </Text>
              </Box>
            );
          }}
          renderSectionHeader={({ section }) => (
            <Text variant="subHeader" padding="m" textAlign="left">
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => {
            return <DishItem data={item} />;
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
      </Box>
      <BasketSummary />
    </SafeAreaView>
  );
};
