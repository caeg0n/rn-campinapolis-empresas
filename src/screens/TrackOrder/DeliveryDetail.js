import React from 'react';
import { ScrollView } from 'react-native';
import { activityHistoryDetail } from '@src/data/mock-activity-history';
import { Divider, ListRowItem, Image } from '@src/components';
import { OrderSummary } from './OrderSummary';
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  updateDoc,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { database } from '../../../firebaseConfig';
import { useSelector } from 'react-redux';

//import { fontSize, useAppTheme } from "@src/theme"
//import StepIndicator from "react-native-step-indicator"

function extractOrganizationName(orders, inputString) {
  const parts = inputString.split('-');
  const reference = parts[0];
  const organization = parts[1];
  return orders[reference][organization][0].organization_name;
}

async function fetchRatingForDriver(uuid, orderId) {
  const collectionRef = collection(database, 'ratings');
  const q = query(
    collectionRef,
    where('deviceId', '==', uuid),
    where('orderId', '==', orderId),
    where('type', '==', 1),
  );
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return 0;
    }
    const document = querySnapshot.docs[0]; 
    if (!document.exists()) {
      return 0;
    }
    const data = document.data();
    if (data && 'rating' in data) {
      return data.rating;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return 0;
  }
}

async function fetchRatingForOrganization(uuid, orderId) {
  const collectionRef = collection(database, 'ratings');
  const q = query(
    collectionRef,
    where('deviceId', '==', uuid),
    where('orderId', '==', orderId),
    where('type', '==', 0),
  );
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return 0;
    }
    const document = querySnapshot.docs[0]; 
    if (!document.exists()) {
      return 0;
    }
    const data = document.data();
    if (data && 'rating' in data) {
      return data.rating;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return 0;
  }
}

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
  const [ratingForOrg, setRatingForOrg] = useState(0);
  const [ratingForDriver, setRatingForDriver] = useState(0);
  const [ratingForOrgNow, setRatingForOrgNow] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      var ratingFromOrg = 0;
      var ratingFromDriver = 0;
      ratingFromOrg = await fetchRatingForOrganization(uuid, orderId);
      ratingFromDriver = await fetchRatingForDriver(uuid, orderId);
      setRatingForOrg(ratingFromOrg);
      setRatingForDriver(ratingFromDriver);
      setRatingForOrgNow(ratingFromOrg);
    };
    fetchData().catch(console.error);
  }, []);

  const onStartRating = (rating, typeRating) => {};

  const onFinishRating = async (rating, typeRating) => {
    let newData = {};
    newData.rating = rating;
    newData.orderId = orderId;
    newData.deviceId = uuid;
    newData.type = typeRating;
    if (typeRating == 0) {
      setRatingForOrgNow(rating);
    }
    const collectionRef = collection(database, 'ratings');
    const q = query(
      collectionRef,
      where('deviceId', '==', uuid),
      where('orderId', '==', orderId),
      where('type', '==', typeRating),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      try {
        await addDoc(collectionRef, newData);
      } catch (e) {
        console.log(e);
      }
    } else {
      querySnapshot.forEach(async (document) => {
        const docRef = document.ref;
        try {
          await updateDoc(docRef, newData);
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <ScrollView>
      <OrderSummary cartItem={filterData(orderId, orders)} />
      <Divider />
      <ListRowItem
        typeRating={0}
        showReview={true}
        savedRating={ratingForOrg}
        onStartRating={onStartRating}
        onFinishRating={onFinishRating}
        title={extractOrganizationName(orders, orderId)}
        note={'Avaliação: ' + ratingForOrgNow + '/5'}
        //subTitle={'subtitle'}
        leftElement={
          <Image
            source={require('@src/assets/common/food.png')}
            width={30}
            height={30}
          />
        }
      />
      <Divider />
      <ListRowItem
        typeRating={1}
        showReview={true}
        savedRating={ratingForDriver}
        onStartRating={onStartRating}
        onFinishRating={onFinishRating}
        title={'driver title'}
        note={`Booking ID: ${activityHistoryDetail.bookingId}`}
        subTitle={`Status: ${activityHistoryDetail.status}`}
        leftElement={
          <Image
            source={require('@src/assets/common/food.png')}
            width={30}
            height={30}
          />
        }
      />
      <Divider />
    </ScrollView>
  );
};
