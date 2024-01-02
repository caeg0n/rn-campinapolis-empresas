import React from 'react';
import { Image, List, ListRowItem } from '@src/components';
import { useActivityHistoryStackNavigation } from '@src/hooks';
import { formatCurrency } from '@src/utils';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import {
  collection,
  addDoc,
  query,
  where, 
  getDocs
} from 'firebase/firestore';
import { database } from '../../../firebaseConfig';

const extractOrganizationCategory = (data) => {
  for (const reference of Object.values(data)) {
    for (const orderList of Object.values(reference)) {
      if (orderList.length > 0) {
        return orderList[0].organization_category;
      }
    }
  }
  return null;
};

export const ActivityHistory = () => {
  const navigation = useActivityHistoryStackNavigation();
  const { orders } = useSelector((state) => state.sessionReducer);
  const category = extractOrganizationCategory(orders);

  const addDocumentIfOrderIdDoesNotExist = async (orderId, newData) => {
    const collectionRef = collection(database, 'orders');
    const q = query(collectionRef, where('orderId', '==', orderId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      try {
        const docRef = await addDoc(collectionRef, newData);
      } catch (e) {
      }
    }
  };

  const data = Object.entries(orders).flatMap(([reference, orgOrders]) => {
    return Object.entries(orgOrders).flatMap(([organizationId, ordersList]) => {
      const organizationName =
        ordersList[0]?.organization_name || 'Comércio Desconhecido';
      const organizationLogo = ordersList[0]?.organization_logo || '?';
      const dataInfo = ordersList[0]?.data || '?';
      const orderId = reference + '-' + organizationId;
      const totalOrders = ordersList.reduce((total, order) => {
        total += order.amount;
        return total;
      }, 0);
      const totalPrice = ordersList.reduce((total, order) => {
        total += parseFloat(order.total);
        return total;
      }, 0);
      const newData = {
        orderId: orderId,
        statusNow: [0]
      };

      addDocumentIfOrderIdDoesNotExist(orderId, newData);

      return [
        {
          id: reference + '-' + organizationId,
          title: `${organizationName}`,
          subTitle: `${totalOrders} items | ${formatCurrency(totalPrice)}`,
          note: `Referência: ${reference}`,
          dataInfo: `Data: ${dataInfo}`,
          onPress: () =>
            navigation.navigate('TrackOrder', {
              reference,
              organizationName,
              category,
              orderId,
              orders
            }),
          leftElement: (
            <View
              style={{
                borderRadius: 30,
                borderWidth: 30,
                borderColor: 'red',
                width: 54,
                height: 54,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: organizationLogo }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </View>
          ),
        },
      ];
    });
  });
  const renderItem = ({ item }) => <ListRowItem {...item} />;
  return <List data={data} renderItem={renderItem} />;
};
