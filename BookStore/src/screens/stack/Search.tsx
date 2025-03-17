import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavParamList} from '../../navigation/types.ts';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavParamList>>();
  const handleSearch = () => {
    if (!history.includes(search)) {
      setHistory(prev => [...prev, search]);
    }
    navigation.navigate('Result', {searchParam: search});
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SFSymbol name={'arrow.left'} style={styles.icon} color={'#000'} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <SFSymbol
            style={styles.icon}
            name={'magnifyingglass'}
            color={'#777'}
          />
          <TextInput
            style={styles.input}
            placeholder={'Search...'}
            returnKeyType="search"
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={() => handleSearch()}
          />
        </View>
        <ScrollView>
          <View style={styles.history}>
            <Text style={styles.label}>Recently Searched</Text>
            {history.map((item, index) => (
              <TouchableOpacity key={index} style={styles.btn}>
                <Text style={styles.btnText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#A03037',
    width: '100%',
    marginTop: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    fontSize: 17,
    width: '90%',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  btn: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
  },
  btnText: {
    fontWeight: 400,
    letterSpacing: 0.5,
  },
  history: {
    margin: 10,
  },
});

export default Search;
