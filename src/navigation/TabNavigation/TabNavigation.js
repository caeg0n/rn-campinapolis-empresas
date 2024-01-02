import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  //AccountStack,
  ActivityHistoryStack,
  ExploreStack,
  NotificationStack,
} from '../Stacks';
import { Icon, Text } from '@src/components';
import { fontSize } from '@src/theme';
import styles from './TabNavigation.style';
import { Checkout } from '@src/screens';

const Tab = createBottomTabNavigator();
const { Navigator } = Tab;

const renderTabBarIcon = (routeName) => {
  return (props) => {
    const { color } = props;
    let iconName = 'compass';
    switch (routeName) {
      case 'ExploreTab':
        iconName = 'home';
        break;
      case 'ActivityHistoryTab':
        iconName = 'timer';
        break;
      case 'NotificationTab':
        iconName = 'notifications';
        break;
      case 'CheckoutTab':
        iconName = 'cart';
        break;
      case 'AccountTab':
        iconName = 'person-circle';
        break;
      default:
        iconName = 'person-circle';
        break;
    }
    return <Icon name={iconName} size={fontSize.xl} color={color} />;
  };
};

const TabNavigation = () => {
  return (
    <Navigator
      initialRouteName="ExploreTab"
      screenOptions={(props) => {
        const {
          route: { name: routeName },
        } = props;
        return {
          headerShown: false,
          tabBarIcon: renderTabBarIcon(routeName),
          tabBarItemStyle: styles.tabItem,
        };
      }}>
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{
          title: 'Comprar',
        }}
      />
      <Tab.Screen
        name="CheckoutTab"
        component={Checkout}
        options={{
          title: 'Carrinho',
          headerTitleAlign: 'left',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="ActivityHistoryTab"
        component={ActivityHistoryStack}
        options={{
          title: 'Pedidos',
        }}
      />
      {/* <Tab.Screen
        name="NotificationTab"
        component={NotificationStack}
        options={{
          title: 'Mensagens',
        }}
      /> */}
      {/* <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          title: 'Accounts',
        }}
      /> */}
    </Navigator>
  );
};

export default TabNavigation;
