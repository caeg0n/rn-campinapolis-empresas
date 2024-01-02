import { DEV_API_BASE, PROD_API_BASE } from '@env';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { setUUID } from '@src/redux/actions/session';
import { setAddresses } from '@src/redux/actions/session';
import { setOrders } from '@src/redux/actions/session';
//import { plus } from './Helpers';

if (__DEV__) {
  var GET_ADDRESSES_URL = DEV_API_BASE + '/get_addresses';
  var GET_ORDERS_URL = DEV_API_BASE + '/get_orders/device';
} else {
  var GET_ADDRESSES_URL = PROD_API_BASE + '/get_addresses';
  var GET_ORDERS_URL = DEV_API_BASE + '/get_orders/device';
}

async function fetchUUID() {
  try {
    const response = await fetch(GET_ADDRESSES_URL + '/' + uuid);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
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

export const StartupContainer = () => {
  const dispatch = useDispatch();
  const { uuid } = useSelector((state) => state.sessionReducer);  

  useEffect(() => {
    let temp_uuid = setUUID(v4());
    //configura uuid para device_id
    if (uuid === undefined || uuid === '') {
      dispatch(temp_uuid);
    }
    if (!(uuid === undefined || uuid === '')) {
      fetchUUID()
        .then((json) => {
          dispatch(setAddresses(json));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    //pega todas os pedidos para o device_id
    fetchOrders(uuid || temp_uuid)
      .then((json) => {
        dispatch(setOrders(json));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch, uuid]);
};
