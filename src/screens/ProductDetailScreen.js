import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getProductById } from '../api/products';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Ürün yüklenemedi, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Toast.show({
      type: 'success',
      text1: 'Sepete Eklendi',
      text2: `${product.title} sepete eklendi.`,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ed1c24" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
        {product.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Sepete Ekle</Text>
      </TouchableOpacity>

      {/* Toast Container */}
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 10, backgroundColor: '#fff' },
  image: { width: width - 20, height: 250, resizeMode: 'cover', borderRadius: 8, marginRight: 10 },
  info: { marginTop: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  description: { fontSize: 15, marginVertical: 10, color: '#444' },
  price: { fontSize: 20, color: '#ed1c24', fontWeight: 'bold', marginVertical: 5 },
  addButton: { backgroundColor: '#ed1c24', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default ProductDetailScreen;
