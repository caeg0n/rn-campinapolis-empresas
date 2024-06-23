import { DEV_API_BASE, PROD_API_BASE } from '@env';

import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import { MemoizedRootNavigation } from '@src/navigation';
import { AppThemeProvider } from '@src/theme/AppThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MemoizedAuthProvider } from '@src/auth';
import { StartupContainer } from './StartupContainer';
import { CartProvider } from '@src/cart';
import { useEffect, useState, useRef } from 'react';
import { Provider } from 'react-redux';
import { Store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const API_BASE = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
var GET_ALL_CATEGORIES_AND_PRODUCTS_URL =
  API_BASE + '/get_categories_and_products';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const fetchData = async () => {
  let jsonData = {};
  response = await fetch(GET_ALL_CATEGORIES_AND_PRODUCTS_URL);
  json = await response.json();
  jsonData.jsonAllCategoriesAndProducts = json;
  return jsonData;
};

export default function App() {
  const allCategoriesAndProducts = useRef([]);
  //const [allOpenedOrganizations, setAllOpenedOrganizations] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const initializeApp = async () => {
      try {
        const jsonData = await fetchData();
        allCategoriesAndProducts.current =
          jsonData.jsonAllCategoriesAndProducts;
      } catch (error) {
        console.error('Error fetching data in app.js:', error);
      } finally {
        SplashScreen.hideAsync();
        setFetching(false);
      }
    };
    initializeApp();
  });

  if (isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={Store}>
        <PersistGate loading={<Text>Aguarde...</Text>} persistor={persistor}>
          <StartupContainer />
          {/* <ExpoPushNotifications /> */}
          <PortalProvider>
            <SafeAreaProvider>
              <AppThemeProvider>
                <MemoizedAuthProvider
                  fetchData={{
                    allCategoriesAndProducts: allCategoriesAndProducts.current,
                  }}>
                  <CartProvider>
                    <MemoizedRootNavigation />
                  </CartProvider>
                </MemoizedAuthProvider>
              </AppThemeProvider>
            </SafeAreaProvider>
          </PortalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
