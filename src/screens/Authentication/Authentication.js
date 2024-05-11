import { DEV_API_BASE, PROD_API_BASE } from '@env';
import { useEffect } from 'react';
import React from 'react';
import { Box, Button, Image } from '@src/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { myConnGet, myConnPut } from '@src/utils';
//import { organization, setOrganization } from '@src/redux/actions/session';
//import { AuthContext } from '@src/auth';
//import { StyleSheet } from 'react-native';
//import { useDispatch } from 'react-redux';

const API_BASE_URL = __DEV__ ? DEV_API_BASE : PROD_API_BASE;
const UPDATE_STATE_URL = API_BASE_URL + '/organization_state';
//const GET_ORGANIZATION_URL = API_BASE_URL + '/organizations/';

export const Authentication = ({ navigation }) => {
  //const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { uuid, organization } = useSelector((state) => state.sessionReducer);
  const [isOpen, setIsOpen] = useState(organization.open);
  console.log("Authentication");

  useEffect(() => {
    setIsOpen(organization.open); 
  }, [organization]);

  const onOpenClosePress = async () => {
    if (organization.id > 0) {
      const body = {
        organization: {
          uuid: uuid,
          is_open: !isOpen,
        }
      }
      const transaction = await myConnPut(UPDATE_STATE_URL, body);
      if (transaction.state == true && transaction.json.message == "error") { setIsOpen(isOpen); return; }
      if (transaction.state == true && transaction.json.message == "ok") { setIsOpen(transaction.json.is_open); return; }
    };
  }

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
            style={{ marginTop: 50 }}
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
              onPress={onOpenClosePress}
              {...(isOpen ? {} : {variant: "google"})}
            />
            <Button
              label="PEDIDOS"
              isFullWidth
              marginTop="s"
              backgroundColor="facebook"
              onPress={() => navigation.navigate("ActivityHistory")}
            />
            <Button
              label="CADASTRAR PRODUTO"
              isFullWidth
              //variant="twitter"
              marginTop="s"
              backgroundColor="facebook"
              onPress={() => navigation.navigate("ProductRegister",{organization})}
            />
            <Button
              label="MEUS PRODUTOS"
              isFullWidth
              //variant="twitter"
              marginTop="s"
              backgroundColor="facebook"
              onPress={() => navigation.navigate("ListProducts",{organization})}
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
              onPress={{}}
            />
            <Button
              label="CONFIGURAÇÕES"
              //variant="google"
              marginTop="s"
              isFullWidth
              onPress={() => navigation.navigate("EditProfile")}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
