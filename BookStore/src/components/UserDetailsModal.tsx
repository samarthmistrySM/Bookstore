import React, {FC, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import {Address} from '../types.ts';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
  handelAddAddress: (address: Address) => void;
}

const AddModal: FC<Props> = ({
  isModalOpen,
  handleModalClose,
  handelAddAddress,
}) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');

  const onAdd = () => {
    if (
      name.trim() === '' ||
      phone.length !== 10 ||
      pinCode.length !== 6 ||
      locality.trim() === '' ||
      address.trim() === '' ||
      city.trim() === '' ||
      landmark.trim() === '' ||
      selectedType.trim() === ''
    ) {
      Alert.alert('Invalid Information', 'Please fill all fields correctly.');
      return;
    }

    const newAddress: Address = {
      name,
      number: parseInt(phone, 10),
      pinCode: parseInt(pinCode, 10),
      locality,
      address,
      city,
      landmark,
      type: selectedType,
    };

    handelAddAddress(newAddress);
    handleModalClose();
    resetFields();
  };

  const resetFields = () => {
    setName('');
    setPhone('');
    setPinCode('');
    setLocality('');
    setAddress('');
    setCity('');
    setLandmark('');
    setSelectedType('');
  };

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModalClose}>
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalContent, {backgroundColor: '#f4f4f4'}]}
          onStartShouldSetResponder={() => true}>
          <Text style={styles.text}>Customer Details</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder={'Name'}
              keyboardType={'default'}
              placeholderTextColor={'#222'}
              onChangeText={setName}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder={'Phone Number'}
              keyboardType={'number-pad'}
              onChangeText={setPhone}
              value={phone}
              placeholderTextColor={'#222'}
            />
            <TextInput
              style={styles.input}
              placeholder={'Pincode'}
              keyboardType={'number-pad'}
              maxLength={6}
              onChangeText={setPinCode}
              value={pinCode}
              placeholderTextColor={'#222'}
            />
            <TextInput
              style={styles.input}
              placeholder={'Locality'}
              keyboardType={'default'}
              onChangeText={setLocality}
              value={locality}
              placeholderTextColor={'#222'}
            />
            <TextInput
              style={[styles.input, {height: 100}]}
              placeholder={'Address'}
              keyboardType={'default'}
              onChangeText={setAddress}
              value={address}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={'#222'}
            />
            <TextInput
              style={styles.input}
              placeholder={'City/Town'}
              keyboardType={'default'}
              onChangeText={setCity}
              value={city}
              placeholderTextColor={'#222'}
            />
            <TextInput
              style={styles.input}
              placeholder={'Landmark'}
              keyboardType={'default'}
              onChangeText={setLandmark}
              value={landmark}
              placeholderTextColor={'#222'}
            />

            <View style={styles.btnsContainer}>
              <Text style={styles.title}>Type</Text>
              <View style={styles.btns}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    selectedType === 'Home' && styles.selectedBtn,
                  ]}
                  onPress={() => setSelectedType('Home')}>
                  <Text
                    style={selectedType === 'Home' && styles.selectedBtnText}>
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    selectedType === 'Work' && styles.selectedBtn,
                  ]}
                  onPress={() => setSelectedType('Work')}>
                  <Text
                    style={selectedType === 'Work' && styles.selectedBtnText}>
                    Work
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    selectedType === 'Other' && styles.selectedBtn,
                  ]}
                  onPress={() => setSelectedType('Other')}>
                  <Text
                    style={selectedType === 'Other' && styles.selectedBtnText}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}>
            <SFSymbol name={'multiply'} color={'#fff'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#888',
    marginHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 15,
    marginHorizontal: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#777',
  },
  btnsContainer: {
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#777',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedBtn: {
    backgroundColor: '#A03037',
  },
  selectedBtnText: {
    color: '#fff',
  },
  addBtn: {
    padding: 10,
    backgroundColor: '#A03037',
  },
  addBtnText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
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
