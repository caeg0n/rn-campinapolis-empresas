import { DEV_API_BASE, PROD_API_BASE } from '@env';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { setOrganization, setUUID, setOrders } from '@src/redux/actions/session';
import { myConnPost, myConnGet } from '@src/utils';

const API_BASE_URL = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
const SET_ORGANIZATION_URL = API_BASE_URL + '/validate_device';
const GET_ORGANIZATION_URL = API_BASE_URL + '/organizations/';
const GET_ORDERS_URL = API_BASE_URL + '/get_orders_by_organization/';

export const StartupContainer = () => {
  const dispatch = useDispatch();
  const { uuid, organization } = useSelector((state) => state.sessionReducer);

  const getOrganization = async (id) => {
    const transaction = await myConnGet(GET_ORGANIZATION_URL+id);
    if (transaction.state == true) {
      const organization = transaction.json;
      dispatch(setOrganization(organization));
    };
  }

  const validateDevice = async (uuid) => {
    const body = {
      organization_device: {
        uuid: uuid
      }
    }
    const transaction = await myConnPost(SET_ORGANIZATION_URL, body);
    if (transaction.state == true) {
      const organization = transaction.json.organization;
      if (organization.organization_id > 0 && organization.status == "enabled") {
        await getOrganization(organization.organization_id);
      };
    };
  }

  const getOrders = async (uuid, organization) => {
    const transaction = await myConnGet(GET_ORDERS_URL+uuid+'/'+organization.id);
    if (transaction.state == true) {
      const orders = transaction.json;
      dispatch(setOrders(orders));
      console.log(orders);
    };
  }

  useEffect(() => {
    let temp_uuid = setUUID(v4());
    if (uuid === undefined || uuid === '') {
      dispatch(temp_uuid);
    }
    validateDevice(uuid);
    getOrders(uuid, organization);
  }, [dispatch, uuid]);
};
