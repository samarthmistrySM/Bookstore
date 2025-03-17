import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../screens/stack/Landing.tsx';
import WishList from '../screens/stack/WishList.tsx';
import Cart from '../screens/stack/Cart.tsx';
import Search from '../screens/stack/Search.tsx';
import Result from '../screens/stack/Result.tsx';
import {StackNavParamList} from './types.ts';
import Closure from '../screens/stack/Closure.tsx';

const Stack = createNativeStackNavigator<StackNavParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Landing'} component={Landing} />
      <Stack.Screen name={'Wishlist'} component={WishList} />
      <Stack.Screen name={'Cart'} component={Cart} />
      <Stack.Screen name={'Search'} component={Search} />
      <Stack.Screen name={'Result'} component={Result} />
      <Stack.Screen name={'Closure'} component={Closure} />
    </Stack.Navigator>
  );
};

export default MainStack;
