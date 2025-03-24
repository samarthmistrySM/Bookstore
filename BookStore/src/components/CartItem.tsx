import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {SFSymbol} from 'react-native-sfsymbols';
import {Book} from '../types.ts';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/slices/dataSlice.ts';
import {AppDispatch} from '../redux/store.ts';

interface Props {
  book: Book;
  quantity: number;
}

const CartItem: FC<Props> = ({book, quantity}) => {
  const dispatch = useDispatch<AppDispatch>();

  const calculatePrice = (discount: number, price: number) => {
    const discountedPrice = price - price * (discount / 100);
    return discountedPrice.toFixed(2);
  };

  const handelAddToCart = async (bookId: string) => {
    dispatch(await addToCart(bookId));
  };

  const handelRemoveFromCart = async (bookId: string) => {
    dispatch(await removeFromCart(bookId));
  };

  const removeAllFromCart = async (bookId: string) => {
    for (let i = 0; i < quantity; i++) {
      await dispatch(removeFromCart(bookId));
    }
  };

  return (
    <View style={styles.item}>
      <Image style={styles.img} source={{uri: book.image}} />
      <View style={styles.details}>
        <View style={styles.top}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{book.name}</Text>
            <Text style={styles.author}>By {book.author}</Text>
          </View>
          <TouchableOpacity onPress={()=>{removeAllFromCart(book._id)}}>
            <SFSymbol
              style={[styles.icon, {backgroundColor: '#fff'}]}
              name={'multiply'}
              color={'#000'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.bookPrice}>
            Rs. {calculatePrice(book.discount, book.price)}{' '}
            <Text style={styles.ogPrice}> Rs. {book.price} </Text>
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => {
                handelRemoveFromCart(book._id);
              }}>
              <SFSymbol style={styles.icon} name={'minus'} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                handelAddToCart(book._id);
              }}>
              <SFSymbol style={styles.icon} name={'plus'} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  img: {
    width: 90,
    aspectRatio: 4 / 5,
    borderRadius: 5,
    marginRight: 15,
    objectFit: 'cover',
    padding: 5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    flexDirection: 'column',
    width: '70%',
    marginLeft: 20,
    paddingVertical: 5,
  },
  titleContainer: {
    width: '80%',
  },
  title: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 5,
  },
  priceContainer: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookPrice: {
    fontSize: 17,
    fontWeight: 600,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    width: 25,
    height: 25,
    backgroundColor: '#A03037',
    borderRadius: 100,
    padding: 5,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  author: {
    fontSize: 11,
    color: '#777',
    marginBottom: 5,
  },
  ogPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    fontWeight: 500,
  },
});
