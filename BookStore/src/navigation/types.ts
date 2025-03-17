import {ParamListBase} from '@react-navigation/native';

export interface StackNavParamList extends ParamListBase {
  Home: undefined;
  Wishlist: undefined;
  Result: {searchParam: string};
  Closure: undefined;
}

export interface AuthStackNavParamList extends StackNavParamList {
  Login: undefined;
  Register: undefined;
}
