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
import { PortalHost } from '@gorhom/portal';
import { ProductRegister } from '@src/screens';
//import { ListProducts } from '@src/screens';
import { PlaceDetails } from '@src/screens';
import { EditProfile } from '@src/screens';
import { Authentication } from '@src/screens';
import { ActivityHistory } from '@src/screens/ActivityHistory';
//import TabNavigation from './TabNavigation';
// import { AuthContext } from '@src/auth';
//import { AuthenticationStack } from './Stacks';

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
  const { theme } = useContext(ThemeContext);
  //const { userToken } = useContext(AuthContext);

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
          {/* {userToken ? (
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
          )} */}
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
              headerShown: false,
            }}
            name="Authentication"
            component={Authentication}
          />
          <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Pedidos'
            }}
            name="ActivityHistory"
            component={ActivityHistory}
          />
          <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Cadastro de Produto'
            }}
            name="ProductRegister"
            component={ProductRegister}
          />
          {/* <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Meus Produtos'
            }}
            name="ListProducts"
            component={ListProducts}
          /> */}
          <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Meus Produtos'
            }}
            name="PlaceDetails"
            component={PlaceDetails}
          />
          <RootStack.Screen
            options={{
              headerShown: true,
              title: 'Configurações'
            }}
            name="EditProfile"
            component={EditProfile}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      <PortalHost name="rootPortal" />
    </>
  );
};
export const MemoizedRootNavigation = React.memo(RootNavigation);