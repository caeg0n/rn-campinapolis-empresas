import { DEV_API_BASE, PROD_API_BASE } from '@env';
import React from 'react';
import { Animated, SafeAreaView } from 'react-native';
import { Box, Text, TabSectionList, Divider, DishItem } from '@src/components';
import styles from './PlaceDetails.style';
import { myConnGet } from '@src/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// import { mockPlaceDetails } from '@src/data';
// import { BasketSummary } from "./BasketSummary"
// import { PopularDishes } from "./PopularDishes"
// import { HeadingInformation } from "./HeadingInformation"

const API_BASE = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
var GET_ALL_CATEGORIES_AND_PRODUCTS_URL =
  API_BASE + '/get_categories_and_products_by_organization';

function transformData(inputData, orgId) {
  let result = [];
  const filteredData = inputData.filter((org) => org.organization_id === orgId);
  filteredData.forEach((org) => {
    org.categories.forEach((category) => {
      const existingCategory = result.find(
        (item) => item.title === category.title,
      );
      if (existingCategory) {
        existingCategory.data.push(...category.products);
      } else {
        result.push({
          title: category.title,
          data: category.products,
        });
      }
    });
  });
  return result.filter((category) => category.data.length > 0);
}

export const PlaceDetails = () => {
  const [categories_and_products, set_categories_and_products] = useState([]);
  const { organization } = useSelector((state) => state.sessionReducer);
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

  useEffect(() => {
    const initializeApp = async () => {
      updateProducts();
    };
    initializeApp();
  }, []);

  const updateProducts = async () => {
    const transaction = await myConnGet(
      GET_ALL_CATEGORIES_AND_PRODUCTS_URL + '/' + organization.id,
    );
    if (transaction.state == true) {
      set_categories_and_products(transaction.json);
    }
  }

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
              {/* <HeadingInformation data={organization} /> */}
              {/*<PopularDishes/>*/}
            </>
          }
          //sections={mockPlaceDetails.dishSection || []}
          sections={
            transformData(categories_and_products, organization.id) || []
          }
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
            return <DishItem data={item} updateProducts={updateProducts} />;
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
      {/* <BasketSummary /> */}
    </SafeAreaView>
  );
};
