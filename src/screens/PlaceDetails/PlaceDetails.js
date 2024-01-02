import React from 'react';
import { Animated, SafeAreaView } from 'react-native';
import { Box, Text, TabSectionList, Divider, DishItem } from '@src/components';
import styles from './PlaceDetails.style';
import { BasketSummary } from './BasketSummary';
import { HeadingInformation } from './HeadingInformation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
//import { mockPlaceDetails } from '@src/data';
//import { PopularDishes } from './PopularDishes';

function transformData (inputData, orgId) {
  let result = [];
  const filteredData = inputData.filter(org => org.organization_id === orgId);
  filteredData.forEach(org => {
    org.categories.forEach(category => {
      const existingCategory = result.find(item => item.title === category.title);
      if (existingCategory) {
        existingCategory.data.push(...category.products);
      } else {
        result.push({
          title: category.title,
          data: category.products
        });
      }
    });
  });
  return result.filter(category => category.data.length > 0);
};

export const PlaceDetails = ({ route }) => {
  const { categories_and_products } = useSelector((state) => state.userReducer);
  const [scrollY] = React.useState(new Animated.Value(0));
  const { organization } = route.params;

  useEffect(() => {
    console.log('PlaceDetails');
  });

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
                {organization.image && (
                  <Animated.Image
                    source={{ uri: organization.image }}
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
              <HeadingInformation data={organization} />
              {/*<PopularDishes/>*/}
            </>
          }
          //sections={mockPlaceDetails.dishSection || []}
          sections={transformData(categories_and_products, organization.id) || []}
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
