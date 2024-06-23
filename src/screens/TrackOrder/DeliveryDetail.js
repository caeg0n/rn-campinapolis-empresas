import React from 'react';
import { ScrollView } from 'react-native';
import { Divider, ListRowItem, Image } from '@src/components';
import { OrderSummary } from './OrderSummary';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import { activityHistoryDetail } from '@src/data/mock-activity-history';

//import { fontSize, useAppTheme } from "@src/theme"
//import StepIndicator from "react-native-step-indicator"

// function extractOrganizationName(orders, inputString) {
//   const parts = inputString.split('-');
//   const reference = parts[0];
//   const organization = parts[1];
//   return orders[reference][organization][0].organization_name;
// }


function filterData(sourceParam, targetData) {
  const [reference, organizationId] = sourceParam.split('-');
  const result = [];
  if (targetData.hasOwnProperty(reference)) {
    const referenceData = targetData[reference];
    if (referenceData.hasOwnProperty(organizationId)) {
      result.push(referenceData[organizationId]);
    }
  }
  return result[0];
}

export const DeliveryDetail = ({ orders, orderId }) => {
  const { uuid } = useSelector((state) => state.sessionReducer);

  useEffect(() => {
  }, []);

  return (
    <ScrollView>
      <OrderSummary cartItem={filterData(orderId, orders)} />
      <Divider />
    </ScrollView>
  );
};
