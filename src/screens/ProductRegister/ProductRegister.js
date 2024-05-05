import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { View, TextInput, Button, Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { DEV_API_BASE, PROD_API_BASE } from '@env';
import { myConnPost, myConnGet } from '@src/utils';
import { useEffect } from 'react';

var CREATE_PRODUCT_URL = (__DEV__ ? DEV_API_BASE : PROD_API_BASE) + '/products';
var GET_CATEGORIES_URL =
  (__DEV__ ? DEV_API_BASE : PROD_API_BASE) + '/get_all_categories';

function removeCurrencyMask(value) {
  const numericValue = value.replace('R$', '').trim().replace(',', '.');
  return parseFloat(numericValue);
}

const ImagePickerComponent = ({ image, setImage }) => {
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 12],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Button title="Tirar uma foto" onPress={takePicture} />
      {image && <Image source={{ uri: image }} style={styles.thumbnail} />}
    </View>
  );
};

const ProductInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  error,
  multiline,
  numberOfLines,
}) => (
  <View>
    {error && <Text style={styles.errorText}>{error}</Text>}
    <TextInput
      style={[
        styles.input,
        {
          borderColor: error ? 'red' : '#007AFF',
          height: multiline ? undefined : 50,
        },
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  </View>
);

const PriceInput = ({ value, onChangeText, error }) => (
  <View>
    {error && <Text style={styles.errorText}>{error}</Text>}
    <TextInputMask
      type={'money'}
      options={{
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$ ',
        suffixUnit: '',
      }}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, { borderColor: error ? 'red' : '#007AFF' }]}
      placeholder="Preço"
      keyboardType="numeric"
    />
  </View>
);

const ProductPicker = ({ selectedValue, onValueChange }) => (
  <Picker
    selectedValue={selectedValue}
    style={styles.picker}
    onValueChange={onValueChange}>
    <Picker.Item label="À venda" value="active" />
    <Picker.Item label="Venda pausada" value="paused" />
    <Picker.Item label="Fora de estoque" value="out_of_stock" />
  </Picker>
);

export const ProductRegister = ({ route }) => {
  const { organization } = route.params;
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    status: '',
    organization_id: '',
    category_id: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const transaction = await myConnGet(GET_CATEGORIES_URL);
      if (transaction.state == true) {
        setCategories(transaction.json);
      }
    };
    fetchData();
  }, []);

  const validateFields = () => {
    let formValid = true;
    const newErrors = { ...errors };

    if (product.name.trim() === '') {
      newErrors.name = 'Nome do produto é obrigatório';
      formValid = false;
    } else {
      newErrors.name = '';
    }

    if (product.description.trim() === '') {
      newErrors.description = 'Descrição é obrigatória';
      formValid = false;
    } else {
      newErrors.description = '';
    }

    if (product.price.trim() === '') {
      newErrors.price = 'Preço é obrigatório';
      formValid = false;
    } else {
      newErrors.price = '';
    }

    setErrors(newErrors);
    return formValid;
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
      let response = await fetch(
        'https://api.cloudinary.com/v1_1/campinapolis-com/image/upload',
        {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePress = async () => {
    if (validateFields()) {
      if (image) {
        const data = await cloudinaryUpload(image);
        const url = data.url;
        if (url) {
          const body = {
            product: {
              name: product.name,
              description: product.description,
              price: removeCurrencyMask(product.price),
              organization_id: organization.id,
              img: url,
              category_id: product.category_id,
              status: product.status
            },
          };
          const transaction = await myConnPost(CREATE_PRODUCT_URL, body);
          console.log(transaction);
        }
      }
    }
  };

  const CategoryPicker = ({ selectedValue, onValueChange, categories }) => (
    <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={onValueChange}>
      {categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id}
          />
        ))}
    </Picker>
  );

  const selectCategory = (itemValue) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category_id: itemValue,
    }))
    console.log(product);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImagePickerComponent image={image} setImage={setImage} />
        <View>
          <ProductInput
            placeholder="Nome do produto"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
            error={errors.name}
          />
        </View>
        <View>
          <ProductInput
            placeholder="Descrição"
            value={product.description}
            onChangeText={(text) =>
              setProduct({ ...product, description: text })
            }
            error={errors.description}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View>
          <PriceInput
            value={product.price}
            onChangeText={(masked) => setProduct({ ...product, price: masked })}
            error={errors.price}
          />
        </View>
        <CategoryPicker
          selectedValue={product.category_id}
          onValueChange={(itemValue) => selectCategory((itemValue))}
          categories={categories}
        />
        <ProductPicker
          selectedValue={product.status}
          onValueChange={(itemValue) =>
            setProduct({ ...product, status: itemValue })
          }
        />
        <Button title="Salvar" onPress={handleSavePress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  picker: {
    height: 60,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
