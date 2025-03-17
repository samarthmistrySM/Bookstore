import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import books from '../../mock/data.json';
import Header from '../../components/Header.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import {useNavigation} from '@react-navigation/native';
import CartItem from '../../components/CartItem.tsx';
import UserDetailsModal from '../../components/UserDetailsModal.tsx';
import {Address} from '../../types.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavParamList} from '../../navigation/types.ts';

const Cart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavParamList>>();
  const [isUserDataModalOpen, setIsUserDataModalOpen] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const handleModalClose = () => {
    setIsUserDataModalOpen(false);
  };
  const handelAddAddress = (address: Address) => {
    setAddresses([...addresses, address]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header screen={'Cart'} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SFSymbol name={'arrow.left'} style={styles.icon} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.title}>
          My Bag <Text style={styles.booksCount}> ({books.length} Items)</Text>
        </Text>
      </View>
      <ScrollView style={styles.upperContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cartContainer}>
          <CartItem book={books[0]} />
          <CartItem book={books[1]} />
          <CartItem book={books[2]} />
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
          <Text style={styles.totalCount}>Rs. 3000</Text>
        </View>
        <TouchableOpacity style={styles.placeBtn} onPress={()=>navigation.navigate('Closure')}>
          <Text style={styles.placeBtnText}>Place Order</Text>
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
  placeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A03037',
  },
  placeBtnText: {
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
