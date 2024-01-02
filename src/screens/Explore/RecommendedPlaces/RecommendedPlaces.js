import React from 'react';
import { Carousel, Section, Card } from '@src/components/elements';
import { Dimensions } from 'react-native';
import { PlaceCardInfo } from '@src/components';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

export const RecommendedPlaces = ({ navigation }) => {
  const { recommended_places } = useSelector((state) => state.userReducer);

  const _onButtonActionPressed = () => {
    navigation.navigate('PlaceList', {
      title: 'Recomendados',
    });
  };

  const _onPlaceItemPress = (organization) => {
    navigation.navigate('PlaceDetails', {
      organization: organization,
      title:
        organization.subTitle.charAt(0).toUpperCase() +
        organization.subTitle.slice(1),
    });
  };

  const renderItem = (props) => {
    const { image, title, subTitle } = props.item;
    return (
      <Card
        key={props.index}
        coverImage={image}
        coverImageSize="s"
        title={title}
        subTitle={subTitle}
        marginLeft="m"
        titleProps={{
          numberOfLines: 1,
        }}
        subTitleProps={{
          numberOfLines: 2,
        }}
        onPress={() => _onPlaceItemPress(props.item)}>
        <PlaceCardInfo data={props.item} />
      </Card>
    );
  };

  return (
    <Section
      title="Recomendados"
      actionButtonText="Ver mais"
      onButtonActionPress={_onButtonActionPressed}>
      <Carousel
        numItemsPerSlide={1.8}
        data={recommended_places}
        width={Dimensions.get('window').width}
        renderItem={renderItem}
        height={250}
      />
    </Section>
  );
};
