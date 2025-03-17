import React from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';

const Register = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is Register</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});


export default Register;
