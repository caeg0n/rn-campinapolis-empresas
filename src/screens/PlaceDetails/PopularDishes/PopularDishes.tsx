import React from 'react';
import { Carousel, Section, Card, PlaceCardInfo } from '@src/components';
import { Dimensions } from 'react-native';
import { mockPlaces, Place } from '@src/data';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import { useExploreStackNavigation } from '@src/hooks';

export const PopularDishes = () => {
  const navigation = useExploreStackNavigation();

  const onButtonActionPress = () => {
    navigation.navigate('PlaceList', { title: "What's Popular Here" });
  };

  const onPlaceItemPress = () => {
    navigation.navigate('DishDetailsModal');
  };

  const renderItem = (props: CarouselRenderItemInfo<Place>) => {
    const { image, title, subTitle } = props.item;
    return (
      <Card
        key={props.index}
        coverImage={image}
        coverImageSize="m"
        title={title}
        subTitle={subTitle}
        marginLeft="m"
        titleProps={{
          numberOfLines: 1,
        }}
        subTitleProps={{
          numberOfLines: 2,
        }}
        onPress={onPlaceItemPress}>
        <PlaceCardInfo data={props.item} />
      </Card>
    );
  };

  return (
    <Section
      title="What's Popular Here"
      actionButtonText="View more"
      onButtonActionPress={onButtonActionPress}>
      <Carousel
        width={Dimensions.get('window').width}
        height={255}
        numItemsPerSlide={1.2}
        data={mockPlaces}
        snapEnabled
        renderItem={renderItem}
      />
    </Section>
  );
};
