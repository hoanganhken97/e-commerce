import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action
import * as CartActions from '../../store/cart/cartActions';
//component
import Header from './components/Header';
import CartBody from './components/CartBody';
import TotalButton from './components/TotalButton';
//Loader
import SkeletonLoadingCart from '../../components/Loaders/SkeletonLoadingCart';

const { height } = Dimensions.get('window');

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const carts = useSelector((state) => state.cart.cartItems);
  const cartItems = carts.items;
  const cartId = carts._id;
  let total = 0;
  carts.items.map((item) => (total += +item.item.price * +item.quantity));
  const loadCarts = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(CartActions.fetchCart());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
    setLoading(false);
  }, [dispatch, setIsRefreshing]);
  useEffect(() => {
    loadCarts();
  }, [user.userid]);

  return (
    <View style={styles.container}>
      <Header user={user} carts={carts} navigation={props.navigation} />
      {loading ? (
        <View style={styles.centerLoader}>
          <SkeletonLoadingCart />
        </View>
      ) : (
        <>
          <CartBody
            user={user}
            carts={carts}
            loadCarts={loadCarts}
            isRefreshing={isRefreshing}
            navigation={props.navigation}
          />
          {Object.keys(user).length === 0 ? (
            <></>
          ) : carts.items.length === 0 ? (
            <View />
          ) : (
            <TotalButton
              total={total}
              cartItems={cartItems}
              cartId={cartId}
              navigation={props.navigation}
            />
          )}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
  },
});
export default CartScreen;
