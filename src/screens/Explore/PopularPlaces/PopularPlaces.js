import React from 'react';
import { Carousel, Section, Card, PlaceCardInfo } from '@src/components';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { mockPlaces } from '@src/data';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

const PopularPlaces = ({ navigation }) => {
  const { most_popular } = useSelector((state) => state.userReducer);

  const _onButtonActionPress = () => {
    navigation.navigate('PlaceList', {
      title: '!!!!!',
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
        onPress={() => _onPlaceItemPress(props.item)}>
        <PlaceCardInfo data={props.item} />
      </Card>
    );
  };

  // const onButtonActionPress = () => {
  //   navigation.navigate('PlaceList', { title: 'Popular Near You' });
  // };

  // const onPlaceItemPress = () => {
  //   navigation.navigate('PlaceDetails');
  // };

  return (
    <Section
      title="Mais Populares"
      actionButtonText="Mostrar mais"
      onButtonActionPress={_onButtonActionPress}>
      <Carousel
        width={Dimensions.get('window').width}
        height={255}
        numItemsPerSlide={1.2}
        data={shuffleArray(most_popular)}
        snapEnabled
        renderItem={renderItem}
      />
    </Section>
  );
};
export const MemoizedPopularPlaces = React.memo(PopularPlaces);
