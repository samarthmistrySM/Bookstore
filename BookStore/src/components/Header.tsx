import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavParamList} from '../navigation/types.ts';

interface Props {
  screen: string;
}

const Header: FC<Props> = ({screen}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavParamList>>();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => screen !== 'Home' && navigation.popToTop()}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </TouchableOpacity>
      <View style={styles.links}>
        <TouchableOpacity
          onPress={() => screen !== 'Search' && navigation.navigate('Search')}>
          <SFSymbol
            style={styles.icon}
            name={'magnifyingglass'}
            color={'#A03037'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            screen !== 'Wishlist' && navigation.navigate('Wishlist')
          }>
          <SFSymbol
            style={styles.icon}
            name={screen === 'Wishlist' ? 'heart.fill' : 'heart'}
            color={'#A03037'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => screen !== 'Cart' && navigation.navigate('Cart')}>
          <SFSymbol
            style={styles.icon}
            name={screen === 'Cart' ? 'cart.fill' : 'cart'}
            color={'#A03037'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 10},
    backgroundColor: '#fff',
    marginBottom: 3,
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    height: 45,
    width: 130,
    resizeMode: 'contain',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});

export default Header;
