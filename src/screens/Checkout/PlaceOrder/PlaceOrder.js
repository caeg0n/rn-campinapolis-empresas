import { DEV_API_BASE, PROD_API_BASE } from '@env';

import React from 'react';
import { Box, Text, Button } from '@src/components';
import { OrderSuccessModal } from './SuccessOrderModal';
import { OrderErrorModal } from './ErrorOrderModal';
import { OrderFailModal } from './FailOrderModal';
import { formatCurrency } from '@src/utils';
import { useSelector, useDispatch } from 'react-redux';
import { CartContext } from '@src/cart';
import md5 from 'crypto-js/md5';
import fetchWithTimeout from '@gluons/react-native-fetch-with-timeout';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { setOrders } from '@src/redux/actions/session';

if (__DEV__) {
  var POST_ORDER_URL = DEV_API_BASE + '/orders';
  var GET_ALL_OPENED_ORGANIZATIONS_URL =
    DEV_API_BASE + '/get_all_opened_organizations';
  var GET_ORDERS_URL = DEV_API_BASE + '/get_orders/device';
} else {
  var POST_ORDER_URL = PROD_API_BASE + '/orders';
  var GET_ALL_OPENED_ORGANIZATIONS_URL =
    PROD_API_BASE + '/get_all_opened_organizations';
  var GET_ORDERS_URL = DEV_API_BASE + '/get_orders/device';
}

async function fetchOrders(device_id) {
  try {
    const response = await fetch(GET_ORDERS_URL + '/' + device_id);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

const getAllOpenedOrganizations = async () => {
  let jsonData = {};
  let response = await fetch(GET_ALL_OPENED_ORGANIZATIONS_URL);
  let json = await response.json();
  jsonData = json;
  return jsonData;
};

function findMissingObjects(sourceArray, targetArray, organizationObject) {
  const sourceIDs = sourceArray.map((item) => item.id);
  const missingIDs = targetArray.filter((id) => !sourceIDs.includes(id));
  const missingObjects = [];
  for (const category in organizationObject) {
    for (const org of organizationObject[category]) {
      if (missingIDs.includes(org.id)) {
        missingObjects.push(org);
      }
    }
  }
  return missingObjects;
}

async function isOrganizationOpen(cartItems, allOrganizations) {
  const organizationsIds = cartItems.map((item) => item.dish.organization_id);
  const allOpenedOrganizations = await getAllOpenedOrganizations();
  const allClosedOrganizations = findMissingObjects(
    allOpenedOrganizations,
    organizationsIds,
    allOrganizations,
  );
  if (allClosedOrganizations.length > 0) return allClosedOrganizations;
  else return true;
}

async function isOrderReady(
  cartItems,
  selected_address,
  payment_method,
  allOrganizations,
) {
  var status = {};
  const closedOrganizations = await isOrganizationOpen(
    cartItems,
    allOrganizations,
  );
  if (closedOrganizations !== true) {
    status.is_organization_open = null;
    status.closedOrganizations = closedOrganizations;
    return status;
  }
  if (!(cartItems.length > 0)) {
    status.cartItems = null;
    return status;
  }
  if (!(selected_address.id > 0)) {
    status.selected_address = null;
    return status;
  }
  if (!(payment_method.id > 0)) {
    status.payment_method = null;
    return status;
  }
  if (
    !(status.is_organization_open === null) &&
    !(status.cartItems === null) &&
    !(status.selected_address === null) &&
    !(status.payment_method === null)
  ) {
    status.success = true;
    return status;
  }
  return status;
}

function calculateTotalPrice(items) {
  return items.reduce((acc, item) => {
    const partialPrice = item.dish.amount * parseFloat(item.dish.price);
    return acc + partialPrice;
  }, 0);
}

export const PlaceOrder = ({ totalPrice, shippingFeeSum }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { all_organizations } = useSelector((state) => state.userReducer);
  const { uuid, selected_address } = useSelector(
    (state) => state.sessionReducer,
  );
  const { selected_payment_method } = useSelector(
    (state) => state.sessionReducer,
  );
  const { cartItems, addCartItems } = React.useContext(CartContext);
  const [isSuccessOrderModalVisible, setIsSuccessOrderModalVisible] =
    React.useState(false);
  const [isErrorOrderModalVisible, setIsErrorOrderModalVisible] =
    React.useState(false);
  const [isFailOrderModalVisible, setIsFailOrderModalVisible] =
    React.useState(false);
  const [modalError, setModalError] = React.useState({});

  const onPlaceOrderButtonPress = async () => {
    setIsLoading(true);
    const orderReadyStatus = await isOrderReady(
      cartItems,
      selected_address,
      selected_payment_method,
      all_organizations,
    );
    let isSuccess = false;
    let isOrderRegistered = false;
    setModalError(orderReadyStatus);

    let isError =
      orderReadyStatus.is_organization_open === null ||
      orderReadyStatus.selected_address === null ||
      orderReadyStatus.payment_method === null;
    let isFail =
      orderReadyStatus.cartItems === null ||
      (orderReadyStatus.register_order === null && !isError);

    if (!isError && !isFail) {
      isOrderRegistered = await createOrder();
      if (isOrderRegistered === true) {
        isSuccess = orderReadyStatus.success === true;
        //pega todas os pedidos para o device_id
        fetchOrders(uuid || temp_uuid)
          .then((json) => {
            dispatch(setOrders(json));
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } else {
        isFail = true;
      }
    }
    setIsErrorOrderModalVisible(isError);
    setIsFailOrderModalVisible(isFail);
    setIsSuccessOrderModalVisible(isSuccess);
    setIsLoading(false);
  };

  function emptyOrganizationCart(closedOrganizations) {
    const organizationIds = closedOrganizations.map((item) => item.id);
    const result = cartItems.filter(
      (targetItem) =>
        !organizationIds.includes(targetItem.dish.organization_id),
    );
    const myCartItems = JSON.parse(JSON.stringify(result));
    addCartItems(myCartItems, calculateTotalPrice(myCartItems));
  }

  async function createOrder() {
    let order = {};
    let transactions = [];
    order.device_id = uuid;
    order.address = selected_address.id;
    order.payment = selected_payment_method.id;
    order.consumer_name = selected_address.name;
    order.data = new Date().toString();
    order.reference = md5(JSON.stringify(order)).toString();
    for (const item of cartItems) {
      let transaction = {};
      transaction.id = item.dish.id;
      transaction.state = null;
      order.product_id = item.dish.id;
      order.total = item.dish.amount * item.dish.price;
      order.amount = item.dish.amount;
      try {
        const response = await fetchWithTimeout(
          POST_ORDER_URL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...order }),
          },
          {
            timeout: 6000,
          },
        );
        if (!response.ok) {
          transaction.state = false;
          transactions.push(transaction);
        } else {
          const json = await response.json();
          transaction.state = true;
          transaction.json = json;
          transactions.push(transaction);
        }
      } catch (err) {
        transaction.state = false;
        transaction.err = err;
        transactions.push(transaction);
      }
    }
    return validateTransactions(transactions);
  }

  const validateTransactions = (transactions) => {
    const hasFalseState = transactions.some((item) => item.state === false);
    return !hasFalseState;
  };

  return (
    <Box
      backgroundColor="card"
      padding="m"
      borderTopWidth={0.5}
      borderTopColor="border">
      <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
        <Text>Total</Text>
        <Text fontWeight="bold">
          {formatCurrency(totalPrice + shippingFeeSum)}
        </Text>
      </Box>
      <Button
        isFullWidth
        onPress={onPlaceOrderButtonPress}
        label={
          isLoading ? <ActivityIndicator color="#fff" /> : 'Finalizar Pedido'
        }
        disabled={isLoading}
      />
      <OrderSuccessModal
        isVisible={isSuccessOrderModalVisible}
        setIsVisble={setIsSuccessOrderModalVisible}
      />
      <OrderErrorModal
        isVisible={isErrorOrderModalVisible}
        setIsVisble={setIsErrorOrderModalVisible}
        modalError={modalError}
        emptyOrganizationCart={emptyOrganizationCart}
      />
      <OrderFailModal
        isVisible={isFailOrderModalVisible}
        setIsVisble={setIsFailOrderModalVisible}
        modalError={modalError}
      />
    </Box>
  );
};
