import { DEV_API_BASE, PROD_API_BASE } from '@env';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { HeadingInformation } from './HeadingInformation';
import { ContactInformationForm } from './ContactInformationForm';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { setExpoToken } from '@src/redux/actions/session';
import fetchWithTimeout from '@gluons/react-native-fetch-with-timeout';
import { useDispatch, useSelector } from 'react-redux';
import { myConnPut } from '@src/utils';

const API_BASE_URL = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
const SET_EXPO_TOKEN_URL = __DEV__ ? DEV_API_BASE + '/notification/register' : PROD_API_BASE + '/notification/register';
const UPDATE_ORGANIZATION_STATE_URL = __DEV__ ? DEV_API_BASE + '/organization_state' : PROD_API_BASE + '/organizations_state';
const UPDATE_ORGANIZATION_DELIVERY_TYPE_URL = __DEV__ ? DEV_API_BASE + '/organization_delivery_type' : PROD_API_BASE + '/organizations_delivery_type';

async function updateDeliveryType(uuid, delivery_type, state) {
  const body = {
    organization: {
      uuid: uuid,
      delivery_type: delivery_type,
      state: state
    }
  }
  const transaction = await myConnPut(UPDATE_ORGANIZATION_DELIVERY_TYPE_URL, body);
}

export const EditProfile = () => {
  const dispatch = useDispatch();
  const [organizationId, setOrganizationId] = useState('- '.repeat(50));
  const [organizationName, setOrganizationName] = useState('- '.repeat(10));
  const [token, setToken] = useState('- '.repeat(50));
  const [cover, setCover] = useState('https://png.pngtree.com/template/20190323/ourmid/pngtree-vintage-retro-blank-labels-logo-image_83079.jpg');
  const [logo, setLogo] = useState(cover);
  const [title, setTitle] = useState('- '.repeat(10));
  const [minimalOrderValue, setMinimalOrderValue] = React.useState("000");
  const [deliveryPrice, setDeliveryPrice] = React.useState("000");
  const [editableMinimalOrderValue, setEditableMinimalOrderValue] = React.useState(false);
  const [editableDeliveryPrice, setEditableDeliveryPrice] = React.useState(false);
  const [deliveryForCamp, setDeliveryForCamp] = useState(false);
  const [deliveryForOrg, setDeliveryForOrg] = useState(false);
  const [info, setInfo] = useState('');
  const { uuid } = useSelector((state) => state.sessionReducer);

  useEffect(() => {
    checkIfDeviceIsRegistered(uuid);
    registerForPushNotificationsAsync();
  }, []);

  const checkIfDeviceIsRegistered = async (uuid) => {
    try {
      const url = `${API_BASE_URL}/organization_devices?organization_device[device_id]=` + uuid;
      const response = await axios.get(url);
      if (response.status === 200 && response.data) {
        setOrganizationId(response.data.device);
        setCover(response.data.organization.cover);
        setTitle(response.data.organization.name);
        setLogo(response.data.organization.logo);
        setDeliveryForOrg(response.data.organization.delivery_type === "my_org" ? true : false);
        setDeliveryForCamp(response.data.organization.delivery_type === "camp_entregas" ? true : false);
        // setEditableMinimalOrderValue(true);
        // setEditableDeliveryPrice(true);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.response ? error.response.status : error.message);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Desculpe, não conseguimos enviar notificações para seu aparelho!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
    setToken(token.data);
    const transaction = await registerExpoToken(token.data, uuid);
    if (transaction.state === true) {
      dispatch(setExpoToken(token));
    }
    return token.data;
  }

  async function registerExpoToken(token, uuid) {
    let transaction = { state: false };
    try {
      const response = await fetchWithTimeout(
        SET_EXPO_TOKEN_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notification: { token, device: uuid, device_class: 0 } }),
        },
        { timeout: 6000 }
      );
      const json = await response.json();
      transaction.json = json;
      if (response.ok && response.status >= 200 && response.status <= 299) {
        transaction.state = true;
      }
    } catch (err) {
      transaction.err = err;
    }
    return transaction;
  }

  async function updateDeliveryMethod(deliveryType, state) {
    if (deliveryType === "my_org" ) {
      setDeliveryForOrg(state);
      setDeliveryForCamp(!state);
    }
    if (deliveryType === "camp_entregas") {
      setDeliveryForCamp(state);
      setDeliveryForOrg(!state);
    }
    if (organizationId > 0 && uuid)
      await updateDeliveryType(uuid, deliveryType, state);
  }

  return (
    <ScrollView>
      <HeadingInformation cover={cover}
        title={title}
        logo={logo}
        organizationId={organizationId}
        organizationName={organizationName}
      />
      <ContactInformationForm organizationId={organizationId}
        token={token}
        minimalOrderValue={minimalOrderValue}
        deliveryPrice={deliveryPrice}
        editableMinimalOrderValue={editableMinimalOrderValue}
        editableDeliveryPrice={editableDeliveryPrice}
        deliveryForCamp={deliveryForCamp}
        deliveryForOrg={deliveryForOrg}
        checkIfDeviceIsRegistered={checkIfDeviceIsRegistered}
        setMinimalOrderValue={setMinimalOrderValue}
        setDeliveryPrice={setDeliveryPrice}
        updateDeliveryMethod={updateDeliveryMethod}
      />
    </ScrollView>
  );
};
