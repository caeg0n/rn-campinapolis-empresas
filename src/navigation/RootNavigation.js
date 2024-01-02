import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  theme as defaultTheme,
  darkTheme,
  ThemeContext,
  getNavigationTheme,
} from '@src/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import { AuthContext } from '@src/auth';
import { AuthenticationStack } from './Stacks';
import { PortalHost } from '@gorhom/portal';
import { DishDetails, SearchDishes, ActivityHistory, ProductRegister } from '@src/screens';

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
  const { theme } = useContext(ThemeContext);
  const { userToken } = useContext(AuthContext);

  const navigationTheme = React.useMemo(() => {
    return getNavigationTheme(theme);
  }, [theme]);

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar
          backgroundColor={
            theme === 'light'
              ? defaultTheme.colors.background
              : darkTheme.colors.background
          }
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <RootStack.Navigator
          screenOptions={{
            presentation: 'modal',
          }}>
          {userToken ? (
            <RootStack.Screen
              name="MainStacks"
              options={{ headerShown: false }}
              component={TabNavigation}
            />
          ) : (
            <RootStack.Screen
              options={{
                headerShown: false,
              }}
              name="AuthenticationStacks"
              component={AuthenticationStack}
            />
          )}
          {/* <RootStack.Screen
            options={{
              headerTransparent: true,
              title: '',
              headerBackTitleVisible: false,
            }}
            name="DishDetailsModal"
            component={DishDetails}
          /> */}
          {/* <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="SearchDishesModal"
            component={SearchDishes}
          /> */}
          {/* <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Pedidos'
            }}
            name="ActivityHistory"
            component={ActivityHistory}
          /> */}
          <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Pedidos'
            }}
            name="ProductRegister"
            component={ProductRegister}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      <PortalHost name="rootPortal" />
    </>
  );
};
export const MemoizedRootNavigation = React.memo(RootNavigation);