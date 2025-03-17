import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackNavParamList} from './types.ts';
import Login from '../screens/auth/Login.tsx';
import Register from '../screens/auth/Register.tsx';

const Stack = createNativeStackNavigator<AuthStackNavParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Register'} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
