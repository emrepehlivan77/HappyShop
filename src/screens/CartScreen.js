import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))} style={styles.button}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))} style={styles.button}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.removeBtn}>
            <Text style={styles.removeText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>Sepetiniz boş</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Toplam: ${totalPrice.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontSize: 18, color: '#555' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    margin: 10,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#ed1c24', marginVertical: 5 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  button: {
    backgroundColor: '#ed1c24',
    padding: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  quantity: { fontSize: 16, marginHorizontal: 8 },
  removeBtn: { marginLeft: 10 },
  removeText: { fontSize: 20 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  total: { fontSize: 20, fontWeight: 'bold', color: '#ed1c24' },
});

export default CartScreen;
