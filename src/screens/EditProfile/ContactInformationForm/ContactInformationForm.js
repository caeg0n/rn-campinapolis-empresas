import React from 'react';
import { Box, TextField, Button, Divider } from '@src/components';
import { fontSize } from '@src/theme';
import { useSelector } from 'react-redux';
import CurrencyInput, { FakeCurrencyInput } from "react-native-currency-input";
import { Switch } from 'react-native';
import { Section, Icon, ListRowItem } from '@src/components';
import {
  StyleSheet,
  Text,
  View,
  //KeyboardAvoidingView,
  //ScrollView,
  //TouchableOpacity
} from "react-native";

export const ContactInformationForm = ({ minimalOrderValue,
  deliveryPrice,
  editableMinimalOrderValue,
  editableDeliveryPrice,
  organizationId,
  token,
  checkIfDeviceIsRegistered,
  setMinimalOrderValue,
  deliveryForCamp,
  deliveryForOrg,
  updateDeliveryMethod,
  setDeliveryPrice }) => {
  const { uuid } = useSelector((state) => state.sessionReducer);


  return (
    <Box backgroundColor="lightGrey" padding="m">
      <TextField disabled
        inputProps={{
          defaultValue: uuid.toString(),
          fontSize: fontSize.xx
        }}
        style={{ backgroundColor: 'white', borderRadius: 5 }}
      />
      <Divider backgroundColor="card" marginVertical="s" />
      <TextField disabled
        inputProps={{
          defaultValue: organizationId.toString(),
          fontSize: fontSize.xx
        }}
        style={{ backgroundColor: 'white', borderRadius: 5 }}
      />
      <Divider backgroundColor="card" marginVertical="s" />
      <TextField disabled
        inputProps={{
          defaultValue: token.toString(),
          fontSize: 12
        }}
        style={{ backgroundColor: 'white', borderRadius: 5 }}
      />
      
      <Divider/>

      <Section style={{marginTop:-20}} title="Entregas">
        <ListRowItem
          title="PLATAFORMA CAMPINAPOLIS ENTREGAS"
          leftElement={<Icon name="logo-google" size={fontSize.l} />}
          rightElement={
            <Switch
              value={deliveryForCamp}
              onValueChange={(value) => updateDeliveryMethod("camp_entregas",value)}
            />
          }
        />
        <ListRowItem 
          style={{paddingTop:-10}}
          title="USAR MEUS ENTREGADORES"
          leftElement={<Icon name="logo-google" size={fontSize.l} />}
          rightElement={
            <Switch
              value={deliveryForOrg}
              onValueChange={(value) => updateDeliveryMethod("my_org",value)}
            />
          }
        />
      </Section>

      <Divider style={{ paddingBottom: 20 }}  />
      
      <View style={styles.container}>
        <Text style={styles.label}>Valor Mínimo do Pedido</Text>
        <CurrencyInput
          value={minimalOrderValue}
          style={styles.inputBasic}
          onChangeValue={setMinimalOrderValue}
          minValue={0}
          prefix="R$ "
          width={'50%'}
          precision={2}
          backgroundColor="white"
          placeholder="VALOR MINIMO DO PEDIDO"
          editable={editableMinimalOrderValue}
        />
      </View>

      <Divider />

      <View style={styles.container}>
        <Text style={styles.label}>Valor do Frete</Text>
        <CurrencyInput
          value={deliveryPrice}
          style={styles.inputBasic}
          onChangeValue={setDeliveryPrice}
          minValue={0}
          width={'50%'}
          prefix="R$ "
          precision={2}
          backgroundColor="white"
          placeholder="VALOR DO FRETE"
          editable={editableDeliveryPrice}
        />
      </View>

      <Divider />

      <Button onPress={() => checkIfDeviceIsRegistered(uuid)} label="Atualizar" isFullWidth />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 10,
    paddingBottom: 10,
  },
  label: {
    marginLeft: -10,
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputBasic: {
    marginLeft: -10,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
  },
});
