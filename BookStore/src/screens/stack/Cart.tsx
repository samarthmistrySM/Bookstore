import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import {useNavigation} from '@react-navigation/native';
import CartItem from '../../components/CartItem.tsx';
import UserDetailsModal from '../../components/UserDetailsModal.tsx';
import {Address} from '../../types.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavParamList} from '../../navigation/types.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store.ts';
import {CartItemType} from '../../types.ts';

const Cart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavParamList>>();

  const [isUserDataModalOpen, setIsUserDataModalOpen] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [total, setTotal] = useState(0);

  const userState: any = useSelector((state: RootState) => state.auth);

  const handleModalClose = () => {
    setIsUserDataModalOpen(false);
  };

  const handelAddAddress = (address: Address) => {
    setAddresses([...addresses, address]);
  };

  const calculatePrice = (discount: number, price: number) => {
    const discountedPrice = price - price * (discount / 100);
    return discountedPrice.toFixed(2);
  };

  useEffect(() => {
    let newTotal = userState.user.cart.reduce(
      (sum: number, item: CartItemType) => {
        const price = calculatePrice(item.book.discount, item.book.price);
        const quantity = item.quantity;

        return sum + parseFloat(price) * quantity;
      },
      0,
    );

    setTotal(newTotal.toFixed(2));
  }, [userState.loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Header screen={'Cart'} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SFSymbol name={'arrow.left'} style={styles.icon} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.title}>
          My Bag{' '}
          <Text style={styles.booksCount}>
            {' '}
            ({userState.user.cart.length} Items)
          </Text>
        </Text>
      </View>
      <ScrollView
        style={styles.upperContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cartContainer}>
          {userState.user.cart.length === 0 && (
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>Cart is Empty</Text>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => {
                  navigation.popToTop();
                }}>
                <Text style={styles.btnText}>Shop Something</Text>
              </TouchableOpacity>
            </View>
          )}

          {userState.user.cart.map((item: CartItemType, index: number) => (
            <CartItem key={index} book={item.book} quantity={item.quantity} />
          ))}
        </View>
        <View style={styles.customerDetails}>
          <TouchableOpacity
            style={styles.customerBtn}
            onPress={() => {
              setIsUserDataModalOpen(true);
            }}>
            <Text>Customer Details</Text>
            <SFSymbol style={styles.icon} name={'plus'} color={'#000'} />
          </TouchableOpacity>

          {addresses.map((address, index) => (
            <TouchableOpacity key={index} style={styles.addressContainer}>
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{address.type}</Text>
                <Text style={styles.addressText}>{address.name}</Text>
                <Text style={styles.addressText}>{address.number}</Text>
                <Text style={styles.addressText}>
                  {address.address}, {address.locality}
                </Text>
                <Text style={styles.addressText}>
                  {address.city} - {address.pinCode}
                </Text>
                <Text style={styles.addressText}>
                  Landmark: {address.landmark}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <View>
          <Text>Total</Text>
          <Text style={styles.totalCount}>Rs. {total}</Text>
        </View>
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => navigation.navigate('Closure')}>
          <Text style={styles.btnText}>Place Order</Text>
        </TouchableOpacity>
        <UserDetailsModal
          isModalOpen={isUserDataModalOpen}
          handleModalClose={handleModalClose}
          handelAddAddress={handelAddAddress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartContainer: {
    justifyContent: 'center',
  },
  title: {
    paddingVertical: 10,
    fontSize: 22,
    paddingHorizontal: 10,
  },
  booksCount: {
    fontSize: 13,
    fontWeight: 400,
    color: '#999',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  upperContainer: {
    padding: 10,
    minHeight: '55%',
    borderBottomWidth: 1,
    borderColor: '#dadada',
  },
  alertContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  alertText: {
    fontSize: 18,
    marginBottom: 10,
  },
  customerDetails: {
    padding: 20,
    backgroundColor: '#dadada',
    marginTop: 20,
  },
  customerBtn: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  totalCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A03037',
  },
  Btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A03037',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  addressContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addressDetails: {
    flexDirection: 'column',
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A03037',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
});

export default Cart;
