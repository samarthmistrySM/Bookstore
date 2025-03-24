import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Book, CartItem, User} from '../types.ts';
import {SFSymbol} from 'react-native-sfsymbols';
import {wishlistBook, addToCart} from '../redux/slices/dataSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store.ts';

interface Props {
  book: Book;
  selectBook: (book: Book) => void;
  wishlisted: boolean;
}

const Card: FC<Props> = ({book, selectBook, wishlisted}) => {
  const [color, setColor] = useState<string>('#ececec');
  const dispatch = useDispatch<AppDispatch>();
  const userState: any = useSelector((state: RootState) => state.auth);

  const calculatePrice = (discount: number, price: number) => {
    const discountedPrice = price - price * (discount / 100);
    return discountedPrice.toFixed(2);
  };

  const handleWishlistClick = async (bookId: string) => {
    dispatch(await wishlistBook(bookId));
  };

  const handleAddToCartClick = async (bookId: string) => {
    dispatch(await addToCart(bookId));
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

      {userState?.user?.cart?.some(
        (item: CartItem) => item.book._id === book._id,
      ) ? (
        <View style={[styles.btnContainer, {justifyContent: 'center'}]}>
          <TouchableOpacity
            style={styles.addedToCart}
            onPress={() => {
              handleAddToCartClick(book._id);
            }}
            disabled={true}>
            <Text style={styles.btnAddedText}>Added to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => {
              handleWishlistClick(book._id);
            }}>
            <SFSymbol
              style={styles.icon}
              name={wishlisted ? 'heart.fill' : 'heart'}
              color={wishlisted ? '#A03037' : '#777'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => {
              handleAddToCartClick(book._id);
            }}
            disabled={false}>
            <Text style={styles.btnText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: '#ececec',
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
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
    height: 85,
    justifyContent: 'space-between',
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
    alignItems: 'center',
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
    boxSizing:'border-box',
  },
  addedToCart: {
    backgroundColor: '#FFE7E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth:1,
    borderColor: '#A03037',
    width: '100%',
    boxSizing:'border-box',
  },
  btnText: {
    color: '#fff',
  },
  btnAddedText: {
    color: '#A03037',
  },
});

export default Card;
