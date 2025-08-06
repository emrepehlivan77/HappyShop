import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getProductById } from '../api/products';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

// 🔹 Görsel için ayrı bileşen
const ImageWithLoader = ({ uri }) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <View style={styles.imageContainer}>
      {imgLoading && (
        <ActivityIndicator size="large" color="#ed1c24" style={styles.spinner} />
      )}
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        onLoadEnd={() => setImgLoading(false)}
      />
    </View>
  );
};

const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

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
    <View style={styles.container}>
      {/* Ürün görselleri */}
      <FlatList
        data={product.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ImageWithLoader uri={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        onViewableItemsChanged={viewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Dot göstergesi */}
      <View style={styles.dotsContainer}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Sepete Ekle</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff' },
  flatList: { maxHeight: 280 },
  imageContainer: {
    width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: { width, height: 250 },
  spinner: { position: 'absolute', zIndex: 1 },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ed1c24',
    width: 10,
    height: 10,
  },
  info: { padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  description: { fontSize: 15, marginVertical: 10, color: '#444' },
  price: { fontSize: 20, color: '#ed1c24', fontWeight: 'bold', marginVertical: 5 },
  addButton: {
    backgroundColor: '#ed1c24',
    padding: 15,
    borderRadius: 8,
    margin: 15,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default ProductDetailScreen;
