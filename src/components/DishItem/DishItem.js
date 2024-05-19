import React, { useState } from 'react';
import { Box, Text, Touchable, Image } from '../elements';
import { formatCurrency } from '@src/utils';
import { useExploreStackNavigation } from '@src/hooks';
import { Button } from 'react-native-elements';
import { Provider } from 'react-native-paper';
import Dialog from 'react-native-dialog';
import { View } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export const DishItem = ({ data }) => {
  const { price, title, description, image } = data;
  const navigation = useExploreStackNavigation();
  const [isPlayDialogVisible, setPlayDialogVisible] = useState(false);
  const [isPauseDialogVisible, setPauseDialogVisible] = useState(false);
  const [isJunkDialogVisible, setJunkDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);


  const onPlaceItemPress = () => {
    navigation.navigate('DishDetailsModal');
  };

  const handleJunkPress = () => {
    setJunkDialogVisible(true);
  };

  const handlePlayPress = () => {
    setPlayDialogVisible(true);
  };

  const handlePausePress = () => {
    setPauseDialogVisible(true);
  };

  const handlePlayDialogCancel = () => {
    setPlayDialogVisible(false);
  };

  const handlePauseDialogCancel = () => {
    setPauseDialogVisible(false);
  };

  const handleJunkDialogCancel = () => {
    setJunkDialogVisible(false);
  };

  const handlePlayDialogConfirm = () => {
    setPlayDialogVisible(false);
    console.log('Produto colocado à venda');
  };

  const handlePauseDialogConfirm = () => {
    setPauseDialogVisible(false);
    console.log('Produto pausado');
  };

  const handleJunkDialogConfirm = () => {
    setJunkDialogVisible(false);
    console.log('Produto excluído');
  };

  const handleEditPress = () => {
    console.log('Edit clicked');
    // closeMenu();
  };

  return (
    <Provider>
      <Touchable onPress={onPlaceItemPress} activeOpacity={0.5}>
        <View>
          <Box flexDirection="row" padding="m" backgroundColor="card">
            {image && (
              <Image
                width={70}
                height={70}
                borderRadius="m"
                marginRight="m"
                source={image}
              />
            )}
            <Box flex={1}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Text fontWeight="bold">{title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: 50,
                  }}>
                  <Menu
                    visible={visible}
                    anchor={
                      <Button
                        icon={{
                          name: 'more-vert',
                          type: 'material',
                          size: 25,
                          color: 'black',
                        }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        onPress={showMenu}
                      />
                    }
                    onRequestClose={hideMenu}>
                    <MenuItem onPress={hideMenu}>Editar</MenuItem>
                    {/* <MenuItem onPress={hideMenu}>Menu item 2</MenuItem> */}
                    {/* <MenuItem disabled>Disabled item</MenuItem> */}
                    {/* <MenuDivider /> */}
                    {/* <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
                  </Menu>
                  {/* <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                      <Button
                        icon={{
                          name: 'more-vert',
                          type: 'material',
                          size: 25,
                          color: 'black',
                        }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        onPress={openMenu}
                      />
                    }
                  >
                    <Menu.Item style={{top: -100}} onPress={handleEditPress} title="Alterar" />
                  </Menu> */}
                </View>
              </Box>
              <Text
                variant="secondary"
                marginTop="xs"
                marginBottom="s"
                numberOfLines={3}>
                {description}
              </Text>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Text fontWeight="bold" color="primary">
                  {formatCurrency(parseFloat(price))}
                </Text>
                <Box flexDirection="row">
                  <Button
                    icon={{
                      name: 'delete',
                      type: 'material',
                      size: 15,
                      color: 'white',
                    }}
                    buttonStyle={{ backgroundColor: 'red', marginRight: 5 }}
                    onPress={handleJunkPress}
                  />
                  <Button
                    icon={{
                      name: 'play-arrow',
                      type: 'material',
                      size: 15,
                      color: 'white',
                    }}
                    buttonStyle={{ backgroundColor: 'green', marginRight: 5 }}
                    onPress={handlePlayPress}
                  />
                  <Button
                    icon={{
                      name: 'pause',
                      type: 'material',
                      size: 15,
                      color: 'white',
                    }}
                    buttonStyle={{ backgroundColor: 'yellow' }}
                    onPress={handlePausePress}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Dialog.Container visible={isPlayDialogVisible}>
            <Dialog.Title>Confirmar</Dialog.Title>
            <Dialog.Description>
              Deseja colocar o produto à venda? Se você continuar o produto será
              mostrado no aplicativo Campinapolis Compras e estará disponível
              para a venda.
            </Dialog.Description>
            <Dialog.Button label="Cancelar" onPress={handlePlayDialogCancel} />
            <Dialog.Button
              label="Continuar"
              onPress={handlePlayDialogConfirm}
            />
          </Dialog.Container>
          <Dialog.Container visible={isPauseDialogVisible}>
            <Dialog.Title>Confirmar</Dialog.Title>
            <Dialog.Description>
              Deseja pausar a venda do produto? Se você continuar o produto não
              aparecerá para os clientes no aplicativo Campinapolis Compras.
            </Dialog.Description>
            <Dialog.Button label="Cancelar" onPress={handlePauseDialogCancel} />
            <Dialog.Button
              label="Continuar"
              onPress={handlePauseDialogConfirm}
            />
          </Dialog.Container>
          <Dialog.Container visible={isJunkDialogVisible}>
            <Dialog.Title>Confirmar</Dialog.Title>
            <Dialog.Description>
              Deseja excluir o produto? Se você continuar o produto será
              excluído da sua lista de produtos e não estará mais à venda no
              aplicativo Campinapolis Compras.
            </Dialog.Description>
            <Dialog.Button label="Cancelar" onPress={handleJunkDialogCancel} />
            <Dialog.Button
              label="Continuar"
              onPress={handleJunkDialogConfirm}
            />
          </Dialog.Container>
        </View>
      </Touchable>
    </Provider>
  );
};
