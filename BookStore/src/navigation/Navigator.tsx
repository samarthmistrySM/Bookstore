import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Login from '../screens/auth/Login.tsx';
import MainStack from './MainStack.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {fetchUser} from '../redux/slices/authSlice.ts';

const Navigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookState : any = useSelector((state: RootState) => state.data);
  const userState : any = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [bookState.loading]);

  return (
    <NavigationContainer>
      {userState.user ? <MainStack /> : <Login />}
    </NavigationContainer>
  );
};

export default Navigator;
