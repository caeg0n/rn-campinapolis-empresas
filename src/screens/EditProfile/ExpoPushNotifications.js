// import { DEV_API_BASE, PROD_API_BASE } from '@env';
// import { useEffect } from 'react';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { setExpoToken } from '@src/redux/actions/session';
// import fetchWithTimeout from '@gluons/react-native-fetch-with-timeout';

// const SET_EXPO_TOKEN_URL = __DEV__ ? DEV_API_BASE + '/notification/register' : PROD_API_BASE + '/notification/register';

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Desculpe, não conseguimos enviar notificações para seu aparelho!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//   return token.data;
// }

// async function registerExpoToken(token, uuid) {
//   let transaction = {};
//   try {
//     const response = await fetchWithTimeout(
//       SET_EXPO_TOKEN_URL,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ notification: { token: token, device: uuid, device_class: 0 } }),
//       },
//       {
//         timeout: 6000,
//       },
//     );
//     if (!response.ok) {
//       transaction.state = false;
//       return transaction;
//     } else {
//       if (response.status >= 200 && response.status <= 299) {
//         const json = await response.json();
//         transaction.state = true;
//         transaction.json = json;
//         return transaction;
//       } else {
//         transaction.state = false;
//         transaction.json = json;
//         return transaction;
//       }
//     }
//   } catch (err) {
//     transaction.state = false;
//     transaction.err = err;
//     return transaction;
//   }
// }

// export const ExpoPushNotifications = () => {
//   const dispatch = useDispatch();
//   const { uuid } = useSelector((state) => state.sessionReducer);
//   useEffect(() => {
//     registerForPushNotificationsAsync().then(async (token) => {
//       const transaction = await registerExpoToken(token, uuid);
//       if (transaction.state === true) {
//         dispatch(setExpoToken(token));
//       }
//     });
//   }, []);
//   return {
//   };
// };

