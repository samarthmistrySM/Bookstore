import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../../components/Header.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavParamList} from '../../navigation/types.ts';

const Closure = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header screen={'Cart'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.upper}>
          <Image
            style={styles.celebration1}
            source={require('../../assets/celebration.png')}
          />
          <Text style={styles.successTitle}>Order Placed Successfully</Text>
          <Image
            style={styles.celebration2}
            source={require('../../assets/celebration2.png')}
          />
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            hurray!!! your order is confirmed the order id is #123456 save the
            order id for further communication..
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.popToTop()}>
          <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.contactInfo}>
          <View style={styles.row}>
            <View style={styles.contactRow}>
              <View style={styles.contactIconBox}>
                <Text style={styles.contactIcon}>✉️</Text>
              </View>
              <Text style={styles.contactText}>admin@bookstore.com</Text>
            </View>

            <View style={styles.contactRow}>
              <View style={styles.contactIconBox}>
                <Text style={styles.contactIcon}>📞</Text>
              </View>
              <Text style={styles.contactText}>+91 1234567890</Text>
            </View>
          </View>

          <View style={styles.contactRow}>
            <View style={styles.contactIconBox}>
              <Text style={styles.contactIcon}>📍</Text>
            </View>
            <Text style={styles.addressText}>
              Chitkara University Rajpura Punjab 140401
            </Text>
          </View>
        </View>

        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>
            Copyright © 2020, Bookstore Private Limited. All Rights Reserved
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  celebration1: {
    height: 200,
    objectFit: 'contain',
  },
  celebration2: {
    height: 50,
    objectFit: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  messageContainer: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    lineHeight: 26,
  },
  continueButton: {
    backgroundColor: '#8B2333',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginHorizontal: 20,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  contactIconBox: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    fontSize: 18,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    paddingRight: 20,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 15,
    backgroundColor: '#222',
    marginHorizontal: -15,
    marginBottom: -15,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  copyrightText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Closure;
