import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityHistory, ActivityHistoryDetail } from '@src/screens';

const Stack = createNativeStackNavigator();

export const ActivityHistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="ActivityHistory">
      <Stack.Screen
        options={() => {
          return {
            title: 'Pedidos',
          };
        }}
        name="ActivityHistory"
        component={ActivityHistory}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Detalhes do pedido',
          };
        }}
        name="ActivityHistoryDetail"
        component={ActivityHistoryDetail}
      />
    </Stack.Navigator>
  );
};
