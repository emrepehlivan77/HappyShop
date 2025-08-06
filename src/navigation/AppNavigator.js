import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const CartIcon = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View style={{ marginRight: 15,marginTop: 10 }}>
        <Icon name="shopping-cart" size={28} color="#ed1c24" />
        {totalCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: '#ed1c24',
              borderRadius: 10,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              {totalCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({ navigation }) => ({
            title: 'HappyShop 🛍️',
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Ürün Detayı' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Sepetim' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
