import React, {FC} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Book} from '../types.ts';
import {SFSymbol} from 'react-native-sfsymbols';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
  selectedBook: Book | null;
}

const AddModal: FC<Props> = ({isModalOpen, handleModalClose, selectedBook}) => {
  const calculatePrice = (discount: number, price: number) => {
    const discountedPrice = price - price * (discount / 100);
    return discountedPrice.toFixed(2);
  };
  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModalClose}>
      <View style={styles.overlay}>
        <View
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}>
          {selectedBook && (
            <>
              <View style={styles.modalHeader}>
                <Image
                  style={styles.image}
                  source={{uri: selectedBook.image}}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {selectedBook.name}
                  </Text>
                  <Text style={styles.author}>{selectedBook.author}</Text>
                </View>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.description}>
                  {selectedBook.description}
                </Text>
              </View>
              <View>
                <Text style={styles.bookPrice}>
                  Rs.{' '}
                  {calculatePrice(selectedBook.discount, selectedBook.price)}{' '}
                  <Text style={styles.ogPrice}> Rs. {selectedBook.price} </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleModalClose}>
                <SFSymbol
                  name={'multiply'}
                  color={'#fff'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
    paddingBottom: 50,
    position: 'relative',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 30,
  },
  image: {
    width: 80,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  author: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  modalBody: {
    marginVertical: 30,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  bookPrice: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#A03037',
  },
  ogPrice: {
    fontSize: 17,
    textDecorationLine: 'line-through',
    fontWeight: 500,
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    left: '55%',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#A03037',
    borderRadius: 100,
    padding: 5,
  },
});

export default AddModal;
