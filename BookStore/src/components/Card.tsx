import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Book} from '../types.ts';
import {SFSymbol} from 'react-native-sfsymbols';

interface Props {
  book: Book;
  selectBook: (book: Book) => void;
  wishlisted: boolean;
}

const card: FC<Props> = ({book, selectBook, wishlisted}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [color, setColor] = useState<string>('#ececec');

  const calculatePrice = (discount: number, price: number) => {
    const discountedPrice = price - price * (discount / 100);
    return discountedPrice.toFixed(2);
  };

  return (
    <View style={[styles.card, {backgroundColor: color}]}>
      <Pressable
        onPressIn={() => setColor('#D2E6FFFF')}
        onPressOut={() => setColor('#ececec')}
        onPress={() => {
          selectBook(book);
        }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: book.image}} />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.bookName}>{book.name}</Text>
          <Text style={styles.bookAuthor}>By {book.author}</Text>
          <Text style={styles.bookPrice}>
            Rs. {calculatePrice(book.discount, book.price)}{' '}
            <Text style={styles.ogPrice}> Rs. {book.price} </Text>
          </Text>
        </View>
      </Pressable>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.wishlistBtn}>
          <SFSymbol style={styles.icon} name={ wishlisted ? 'heart.fill' : 'heart'} color={ wishlisted ? '#A03037' : '#777'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.btnText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: '#ececec',
    margin: 10,
    borderRadius: 5,
    borderWidth:1,
    borderColor: '#d5d5d5',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 130,
    aspectRatio: 4 / 5,
    borderRadius: 5,
    marginRight: 15,
    padding: 10,
    objectFit: 'cover',
  },
  cardBody: {
    marginTop: 5,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    padding: 10,
    borderTopEndRadius: 5,
    borderStartStartRadius: 5,
  },
  bookName: {
    fontSize: 13,
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 11,
    color: '#777',
    marginBottom: 5,
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ogPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    fontWeight: 500,
  },
  btnContainer: {
    marginHorizontal: 2,
    marginBottom: 2,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 5,
    borderEndEndRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
    padding: 5,
  },
  wishlistBtn: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#777',
    justifyContent: 'center',
  },
  cartBtn: {
    backgroundColor: '#A03037',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#fff',
  },
});

export default card;
