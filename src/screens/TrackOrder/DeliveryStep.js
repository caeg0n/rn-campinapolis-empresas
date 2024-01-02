import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { fontSize, useAppTheme } from '@src/theme';
import { Box } from '@src/components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database } from '../../../firebaseConfig';
import { Text } from 'react-native';

function extractBlockNumbers(data) {
  if (!data.order_status_block_list) {
    return [];
  }
  const blocks = data.order_status_block_list;
  const blockNumbers = blocks.map((block) => {
    const numberPart = block.replace('block_', '');
    return parseInt(numberPart, 10);
  });
  return blockNumbers.filter((number) => !isNaN(number));
}

function replaceUnderscoresWithSpace(array, param) {
  return array.map((item) => {
    let updatedItem = item.replace(/_/g, ' ');
    if (item.startsWith('_')) {
      updatedItem = param + ' ' + updatedItem.trim();
    }
    return updatedItem;
  });
}

function insertUniqueElements(sourceArray, targetObject) {
  const targetArray = targetObject.order_status_base_list;
  sourceArray.forEach((element, index) => {
    const elementAsString = element.toString();
    if (!targetArray.includes(elementAsString)) {
      const insertPosition = Math.min(index, targetArray.length);
      targetArray.splice(insertPosition, 0, elementAsString);
    }
  });
  return targetObject;
}

function findOrderStatusDescriptions(input, statusDescriptions) {
  const statusIds = input.order_status_base_list;
  const matchedDescriptions = [];
  statusIds.forEach((id) => {
    for (const [description, value] of Object.entries(statusDescriptions)) {
      if (value.toString() === id) {
        matchedDescriptions.push(description);
        break;
      }
    }
  });
  return matchedDescriptions;
}

export const DeliveryStep = ({ category, orderId }) => {
  const { colors } = useAppTheme();
  const { order_status_base_list } = useSelector(
    (state) => state.sessionReducer,
  );
  const { order_status_block_list } = useSelector(
    (state) => state.sessionReducer,
  );
  const { order_status_list } = useSelector((state) => state.sessionReducer);
  const [statusList, setStatusList] = useState(
    findOrderStatusDescriptions(order_status_base_list, order_status_list),
  );
  const [statusNow, setStatusNow] = useState(0);
  const [applyStrikethrough, setApplyStrikethrough] = useState(false);

  useEffect(() => {
    const fieldToObserve = 'statusNow';
    let _order_status_base_list = JSON.parse(
      JSON.stringify(order_status_base_list),
    );
    observeOrderChanges(orderId, fieldToObserve, (statusValue) => {
      insertUniqueElements(statusValue, _order_status_base_list);
      setStatusList(
        replaceUnderscoresWithSpace(
          findOrderStatusDescriptions(
            _order_status_base_list,
            order_status_list,
          ),
          category,
        ),
      );
      setStatusNow(statusValue.length - 1);
      if (
        extractBlockNumbers(order_status_block_list).includes(
          statusValue[statusValue.length - 1],
        ) == true
      ) {
        setApplyStrikethrough(true);
      } else {
        setApplyStrikethrough(false);
      }
    });
  }, []);

  const observeOrderChanges = (orderId, fieldToObserve, callback) => {
    const collectionRef = collection(database, 'orders');
    const q = query(collectionRef, where('orderId', '==', orderId));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.hasOwnProperty(fieldToObserve)) {
            callback(data[fieldToObserve]);
          }
        });
      },
      (error) => {
        console.error('Error observing document: ', error);
      },
    );
    return unsubscribe;
  };

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

  const renderLabel = ({ stepStatus, label }) => {
    let labelStyle = {
      fontSize: fontSize.s,
      color: stepStatus === 'finished' ? 'white' : colors.text,
    };
    if (stepStatus === 'unfinished' && applyStrikethrough) {
      labelStyle = {
        ...labelStyle,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'grey',
      };
    }
    return <Text style={labelStyle}>{label}</Text>;
  };

  return (
    <Box paddingHorizontal="m" flex={1}>
      <StepIndicator
        customStyles={stepIndicatorStyles}
        currentPosition={statusNow}
        labels={statusList}
        direction="vertical"
        stepCount={statusList.length}
        renderLabel={renderLabel}
      />
    </Box>
  );
};
