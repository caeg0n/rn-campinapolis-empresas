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
import { updateDoc } from 'firebase/firestore';

const API_BASE_URL = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
const SET_EXPO_TOKEN_URL = __DEV__ ? DEV_API_BASE + '/notification/register' : PROD_API_BASE + '/notification/register';

function updateMinimalOrderValue(value){
  
}

function updateDeliveryPrice(value){
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
        setEditableMinimalOrderValue(true);
        setEditableDeliveryPrice(true);
        updateMinimalOrderValue(minimalOrderValue);
        updateDeliveryPrice(deliveryPrice);
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
    let transaction = {};
    try {
      const response = await fetchWithTimeout(
        SET_EXPO_TOKEN_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notification: { token: token, device: uuid, device_class: 0 } }),
        },
        {
          timeout: 6000,
        },
      );
      if (!response.ok) {
        transaction.state = false;
        return transaction;
      } else {
        if (response.status >= 200 && response.status <= 299) {
          const json = await response.json();
          transaction.state = true;
          transaction.json = json;
          return transaction;
        } else {
          transaction.state = false;
          transaction.json = json;
          return transaction;
        }
      }
    } catch (err) {
      transaction.state = false;
      transaction.err = err;
      return transaction;
    }
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
                              checkIfDeviceIsRegistered={checkIfDeviceIsRegistered}
                              setMinimalOrderValue={setMinimalOrderValue}
                              setDeliveryPrice={setDeliveryPrice}
      />
    </ScrollView>
  );
};
