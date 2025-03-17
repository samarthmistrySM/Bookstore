import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack.tsx';
import MainStack from './MainStack.tsx';

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      {/*  <MainStack/>*/}
    </NavigationContainer>
  );
};

export default Navigator;
