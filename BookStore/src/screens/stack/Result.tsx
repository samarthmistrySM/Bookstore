import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavParamList} from '../../navigation/types.ts';
import Header from '../../components/Header.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import Card from '../../components/Card.tsx';
import {useNavigation} from '@react-navigation/native';
import BookModal from '../../components/BookModal.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {fetchBooks} from '../../redux/slices/dataSlice.ts';
import {Book} from '../../types.ts';

type Props = NativeStackScreenProps<StackNavParamList, 'Result'>;

const Result: FC<Props> = ({route}) => {
  const {searchParam} = route.params;
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const navigation = useNavigation();
  const selectBook = (book: Book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleModalClose = () => {
    setIsBookModalOpen(false);
    setSelectedBook(null);
  };

  const bookState: any = useSelector((state: RootState) => state.data);

  useEffect(() => {
    const filtered = bookState.books.filter((book: Book) =>
      book.name.toLowerCase().includes(searchParam.toLowerCase()),
    );
    setFilteredBooks(filtered);
  }, [searchParam]);

  return (
    <SafeAreaView style={styles.container}>
      <Header screen={'Result'} />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SFSymbol name={'arrow.left'} style={styles.icon} color={'#000'} />
            </TouchableOpacity>
            <Text style={styles.title}>
              Showing result for{' '}
              <Text style={styles.highlight}>{searchParam}</Text>
            </Text>
          </View>
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
        </ScrollView>
        <Text style={styles.footer}>
          Copyright &copy; 2020, Bookstore private Limited. All Rights Reserved{' '}
        </Text>
      </View>

      <BookModal
        isModalOpen={isBookModalOpen}
        handleModalClose={handleModalClose}
        selectedBook={selectedBook}
      />
    </SafeAreaView>
  );
};

export default Result;

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
    fontSize: 17,
    color: '#999',
  },
  highlight: {
    color: '#000',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },

  scrollContent: {
    flexGrow: 1,
  },

});
