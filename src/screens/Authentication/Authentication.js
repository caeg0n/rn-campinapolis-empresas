import React from 'react';
import { Box, Button, Image } from '@src/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
//import { AuthContext } from '@src/auth';
//import { StyleSheet } from 'react-native';
//import { useDispatch } from 'react-redux';
//import { useEffect } from 'react';

export const Authentication = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();

  const onConnectWithPhoneNumberButtonPress = () => {
    navigation.navigate('AuthenticationWithPhone');
  };

  const onSocialNetworkConnectButtonPress = () => {
  };

  return (
    <>
    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    <Box
      flex={1}
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="primary">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image
          source={require('@src/assets/app/app_icon.png')}
          width="55%"
          height="95%"
          style={{marginTop:50}}
        />
      </Box>
      <Box
        height={"80%"}
        padding="l"
        borderTopLeftRadius="xxl"
        borderTopRightRadius="xxl"
        backgroundColor="card"
        style={{
          paddingBottom: bottom !== 0 ? bottom : undefined,
        }}>
        {/* <Text fontWeight="bold" variant="header">
          COMPRE TUDO QUE PRECISA.
        </Text> */}
        {/* <Text marginTop="xs" variant="secondary">
          Compre todos os produtos disponiveis na cidade de Campinápolis no
          conforto da sua casa.
        </Text> */}
        <Box marginTop="s" justifyContent="space-around">
          <Button
            label="ABRIR/FECHAR"
            isFullWidth
            onPress={onConnectWithPhoneNumberButtonPress}
          />          
          <Button
            label="PEDIDOS"
            isFullWidth
            //variant="facebook"
            marginTop="s"
            backgroundColor="facebook"
            onPress={onSocialNetworkConnectButtonPress}
          />
          <Button
            label="PRODUTOS"
            isFullWidth
            //variant="facebook"
            marginTop="s"
            backgroundColor="facebook"
            onPress={()=>navigation.navigate("ProductRegister")}
          />
          {/* <Button
            label="FRETE"
            isFullWidth
            //variant="facebook"
            marginTop="s"
            backgroundColor="facebook"
            onPress={onSocialNetworkConnectButtonPress}
          /> */}
          <Button
            label="ENTREGADOR"
            //variant="google"
            marginTop="s"
            isFullWidth
            onPress={onSocialNetworkConnectButtonPress}
          />
          <Button
            label="CONFIGURAÇÕES"
            //variant="google"
            marginTop="s"
            isFullWidth
            onPress={()=>navigation.navigate("EditProfile")}
          />
        </Box>
      </Box>
    </Box>
    </>
  );
};
