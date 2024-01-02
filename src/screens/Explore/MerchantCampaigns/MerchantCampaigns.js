import React from 'react';
import { Dimensions, I18nManager } from 'react-native';
import { mockMerchantCaimpaigns } from '@src/data';
import { Box, Carousel, Image, Text } from '@src/components';
// import { useEffect } from 'react';

export const MerchantCampaigns = () => {
  const renderItem = (props) => {
    const { id, image, title, subTitle, backgroundColor } = props.item;

    return (
      <Box
        key={id}
        backgroundColor="card"
        borderRadius="xxl"
        flexDirection="row"
        alignItems="center"
        marginLeft="m"
        paddingRight="m"
        style={{
          backgroundColor: backgroundColor,
        }}>
        <Image source={image} width={70} height={70} />
        <Box backgroundColor="transparent" paddingLeft="s">
          <Text
            fontWeight="bold"
            color="white"
            textAlign={I18nManager.isRTL ? 'left' : 'auto'}>
            {title}
          </Text>
          <Text
            variant="secondary"
            color="white"
            textAlign={I18nManager.isRTL ? 'left' : 'auto'}>
            {subTitle}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box backgroundColor="card" paddingVertical="m" alignItems="center">
      <Carousel
        numItemsPerSlide={1.4}
        width={Dimensions.get('window').width}
        data={mockMerchantCaimpaigns}
        height={70}
        renderItem={renderItem}
      />
    </Box>
  );
};
