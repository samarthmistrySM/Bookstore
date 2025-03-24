import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, Text} from 'react-native';
import Card from '../../components/Card.tsx';
import Header from '../../components/Header.tsx';
import {Book} from '../../types.ts';
import BookModal from '../../components/BookModal.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {fetchBooks} from '../../redux/slices/dataSlice.ts';

const Landing = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const userState : any = useSelector((state: RootState) => state.auth);
  const bookState : any = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadBooks = async () => {
      dispatch(await fetchBooks());
    };
    loadBooks();
  }, []);

  useEffect(() => {
    if (!userState.user || !userState.user.wishList) {
      setFilteredBooks(bookState.books);
      return;
    }

    const filtered = bookState.books.filter(
      (book :Book) =>
        !userState.user.wishList.some(
          (wishlistedBook: Book) =>
            wishlistedBook._id.toString() === book._id.toString(),
        ),
    );

    setFilteredBooks(filtered);
  }, [bookState.loading, userState.loading]);

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
      <Header screen={'Home'} />
      <Text style={styles.title}>
        Books{' '}
        <Text style={styles.booksCount}> ({filteredBooks.length} Items)</Text>
      </Text>
      <ScrollView>
        <View style={styles.booksContainer}>
          {filteredBooks.map((book: Book, index: number) => (
            <Card
              key={index}
              book={book}
              selectBook={selectBook}
              wishlisted={false}
            />
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
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    paddingVertical: 10,
    fontSize: 22,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
});

export default Landing;
