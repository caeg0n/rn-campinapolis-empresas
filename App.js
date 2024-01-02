// import { DEV_API_BASE, PROD_API_BASE } from '@env';

import * as SplashScreen from 'expo-splash-screen';
// import { StartupContainer } from './StartupContainer';
// import { ExpoPushNotifications } from './ExpoPushNotifications';
import { View, ActivityIndicator } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import { MemoizedRootNavigation } from '@src/navigation';
import { AppThemeProvider } from '@src/theme/AppThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MemoizedAuthProvider } from '@src/auth';
import { CartProvider } from '@src/cart';
import { useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import { Store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


// if (__DEV__) {
//   var GET_ALL_OPENED_ORGANIZATIONS_URL =
//     DEV_API_BASE + '/get_all_opened_organizations';
// } else {
//   var GET_ALL_OPENED_ORGANIZATIONS_URL =
//     PROD_API_BASE + '/get_all_opened_organizations';
// }

//StartupContainer.init();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  const [allOpenedOrganizations, setAllOpenedOrganizations] = useState([]);
  const [isFetching, setFetching] = useState(true);

  const fetchData = async () => {
    let jsonData = {};

    // response = await fetch(GET_ALL_OPENED_ORGANIZATIONS_URL);
    // json = await response.json();
    // jsonData.jsonAllOpenedOrganizations = json;

    return jsonData;
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    fetchData()
      .then((jsonData) => {
        setAllOpenedOrganizations(jsonData.jsonAllOpenedOrganizations);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        SplashScreen.hideAsync();
        setFetching(false);
      });
  }, []);

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
          {/* <StartupContainer /> */}
          {/* <ExpoPushNotifications /> */}
          <PortalProvider>
            <SafeAreaProvider>
              <AppThemeProvider>
                <MemoizedAuthProvider
                  fetchData={{
                    allOpenedOrganizations,
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
