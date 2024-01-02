import React from 'react';
import { ScrollView } from 'react-native';
import { activityHistoryDetail } from '@src/data/mock-activity-history';
import {
  Divider,
  Box,
  Icon,
  Button,
  ListRowItem,
  Image,
} from '@src/components';
import StepIndicator from 'react-native-step-indicator';
import { OrderSummary } from './OrderSummary';
import { fontSize, useAppTheme } from '@src/theme';

export const ActivityHistoryDetail = () => {
  const { colors } = useAppTheme();

  const labels = [activityHistoryDetail.from, activityHistoryDetail.to];

  const stepIndicatorStyles = {
    stepStrokeCurrentColor: colors.primary,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.secondary,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.border,
    stepIndicatorCurrentColor: colors.background,
    stepIndicatorLabelFontSize: fontSize.s,
    currentStepIndicatorLabelFontSize: fontSize.s,
    stepIndicatorLabelCurrentColor: colors.text,
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: colors.text,
    labelColor: colors.text,
    labelAlign: 'flex-start',
    currentStepLabelColor: colors.primary,
    labelSize: fontSize.m,
  };

  const renderLabel = (params) => {
    const { position } = params;
    switch (position) {
      case 0:
        return <Icon name="restaurant" size={fontSize.m} isPrimary />;
      case 1:
        return <Icon name="location" size={fontSize.m} isPrimary />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <ListRowItem
        title={activityHistoryDetail.restaurantName}
        note={`Booking ID: ${activityHistoryDetail.bookingId}`}
        subTitle={`Status: ${activityHistoryDetail.status}`}
        leftElement={
          <Image
            source={require('@src/assets/common/food.png')}
            width={30}
            height={30}
          />
        }
      />
      <Divider />
      <Box backgroundColor="card" height={150} paddingHorizontal="m">
        <StepIndicator
          customStyles={stepIndicatorStyles}
          labels={labels}
          direction="vertical"
          stepCount={2}
          renderStepIndicator={renderLabel}
        />
      </Box>
      <Divider />
      <OrderSummary orderDetail={activityHistoryDetail.orderDetail} />
      <Box backgroundColor="card" paddingHorizontal="m" paddingBottom="m">
        <Button isFullWidth label="Contact Us" />
      </Box>
    </ScrollView>
  );
};
