export const paymentMethods = [
  {
    id: '1',
    name: 'Cash On Delivery',
    icon: 'cash',
  },
  {
    id: '2',
    name: 'ATM Card',
    icon: 'card',
  },
  {
    id: '3',
    name: 'Visa / Master',
    icon: 'card-outline',
  },
  {
    id: '5',
    name: 'Apple Pay',
    icon: 'logo-apple',
  },
  {
    id: '6',
    name: 'Google Pay',
    icon: 'logo-google',
  },
];

// import { DEV_API_BASE, PROD_API_BASE } from '@env';

// let paymentMethods = [
//   {
//     id: '1',
//     name: 'Cash On Delivery',
//     icon: 'cash',
//   },
// ];

// if (__DEV__) {
//   var API_BASE_URL = DEV_API_BASE;
// } else {
//   var API_BASE_URL = PROD_API_BASE;
// }

// (async () => {
//   try {
//     const apiUrl = API_BASE_URL + '/get_payments_methods';
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const fetchedData = await response.json();
//     paymentMethods = fetchedData.map(({ id, name, icon }) => ({
//       id,
//       name,
//       icon,
//     }));
//   } catch (error) {
//     console.error('Error fetching payment methods:', error);
//   }
// })();

// export default paymentMethods;