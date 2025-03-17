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
import Card from '../../components/Card.tsx';
import Header from '../../components/Header.tsx';
import {Book} from '../../types.ts';
import BookModal from '../../components/BookModal.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import {useNavigation} from '@react-navigation/native';

const Wishlist = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const navigation = useNavigation();
  const selectBook = (book: Book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const handleModalClose = () => {
    setIsBookModalOpen(false);
    setSelectedBook(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header screen={'Wishlist'} />
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SFSymbol name={'arrow.left'} style={styles.icon} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Wishlist{' '}
            <Text style={styles.booksCount}> ({books.length} Items)</Text>
          </Text>
        </View>
      <ScrollView>
        <View style={styles.booksContainer}>
          {books.map((book: Book, index: number) => (
            <Card key={index} book={book} selectBook={selectBook} wishlisted={true} />
          ))}
        </View>
        <Text style={styles.footer}>
          Copyright &copy; 2020, Bookstore private Limited. All Rights Reserved{' '}
        </Text>
      </ScrollView>
      <BookModal
        isModalOpen={isBookModalOpen}
        handleModalClose={handleModalClose}
        selectedBook={selectedBook}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  footer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});

export default Wishlist;
