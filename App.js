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
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default function App() {
  //const [allOpenedOrganizations, setAllOpenedOrganizations] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const initializeApp = async () => {
      SplashScreen.hideAsync();
      setFetching(false);
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
                <MemoizedAuthProvider>
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
