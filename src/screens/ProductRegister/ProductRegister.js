import { DEV_API_BASE, PROD_API_BASE } from '@env';

import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native';
//import { AdvancedImage } from 'cloudinary-react-native';
//import { Cloudinary } from "@cloudinary/url-gen";

var CREATE_PRODUCT_URL = (__DEV__ ? DEV_API_BASE : PROD_API_BASE) + '/products';

async function createProduct(product) {
  try {
    let response = await fetch(CREATE_PRODUCT_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: {
          device_id: id,
          title: address_data.title,
          name: address_data.name,
          cel: address_data.phone,
          address_detail: address_data.address,
        },
      }),
    });
    if (response.status !== 201) {
      console.log('erro');
    }
    response = await response.json();
    if (response.id > 0) {
        //nav.navigate('SavedAddresses');
    }
  } catch (error) {
    console.log(error);
  }
}


export const ProductRegister = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        state: 'sell',
    });

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 12],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            setImage(uri);
        } else {
            console.log('User canceled image picker');
        }
    };

    const cloudinaryUpload = async (uri) => {
        let formData = new FormData();
        formData.append('file', {
            name: 'product.jpg',
            type: 'image/jpeg',
            uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        });
        formData.append('upload_preset', 'campinapolis-empresas-produtos');
        try {
            let response = await fetch('https://api.cloudinary.com/v1_1/campinapolis-com/image/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        if (image) {
            const data = await cloudinaryUpload(image);
            const url = data.url;
            
            
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title="Tirar uma foto" onPress={takePicture} />
                {image && <Image source={{ uri: image }} style={styles.thumbnail} />}
                <TextInput
                    style={styles.input}
                    placeholder="Nome do produto"
                    value={product.name}
                    onChangeText={(text) => setProduct({ ...product, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={product.description}
                    onChangeText={(text) => setProduct({ ...product, description: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    value={product.price}
                    onChangeText={(text) => setProduct({ ...product, price: text })}
                    keyboardType="numeric"
                />
                <Picker
                    selectedValue={product.state}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setProduct({ ...product, state: itemValue })}
                >
                    <Picker.Item label="A venda" value="sell" />
                    <Picker.Item label="Venda paralisada" value="paused" />
                    <Picker.Item label="Acabou o produto" value="out_of_stock" />
                </Picker>
                <Button title="Salvar" onPress={handleSave} />
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    thumbnail: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
});

