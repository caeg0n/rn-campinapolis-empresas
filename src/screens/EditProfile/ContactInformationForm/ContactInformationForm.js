import React from 'react';
import { Box, TextField, Button, Divider } from '@src/components';
import { fontSize } from '@src/theme';
import { useSelector } from 'react-redux';
import CurrencyInput, { FakeCurrencyInput } from "react-native-currency-input";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export const ContactInformationForm = ({ organizationId, token, checkIfDeviceIsRegistered }) => {
  const { uuid } = useSelector((state) => state.sessionReducer);
  const [valor, setValor] = React.useState("1234");

  const [minimalOrder, setMinimalOrder] = React.useState(0);
  const [deliveryPrice, setDeliveryPrice] = React.useState(0);

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
          //textContentType: 'telephoneNumber',
        }}
        style={{ backgroundColor: 'white', borderRadius: 5 }}
      />
      <Divider backgroundColor="card" marginVertical="s" />
      <TextField disabled
        inputProps={{
          defaultValue: token.toString(),
          fontSize: 12
          //textContentType: 'name',
        }}
        style={{ backgroundColor: 'white', borderRadius: 5 }}
      />
      <Divider style={{paddingBottom:20}} />
      
      <View style={styles.container}>
        <Text style={styles.label}>Valor Mínimo do Pedido</Text>
        <CurrencyInput
          value={valor}
          style={styles.inputBasic}
          onChangeValue={setValor}
          minValue={0}
          prefix="R$ "
          width={'50%'}
          precision={2}
          backgroundColor="white"
          placeholder="VALOR MINIMO DO PEDIDO"
        />
      </View>

      <Divider />

      <View style={styles.container}>
        <Text style={styles.label}>Valor do Frete</Text>
        <CurrencyInput
          value={valor}
          style={styles.inputBasic}
          onChangeValue={setValor}
          minValue={0}
          width={'50%'}
          prefix="R$ "
          precision={2}
          backgroundColor="white"
          placeholder="VALOR DO FRETE"
        />
      </View>

      <Divider/>

      <Button onPress={() => checkIfDeviceIsRegistered(uuid)} label="Atualizar" isFullWidth />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Allows absolute positioning inside
    padding: 10,
    paddingBottom:10,
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
