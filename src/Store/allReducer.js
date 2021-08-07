import {combineReducers} from 'redux';
import GlobalReducer from './GlobalReducer';
import LoginReducer from '../Screen/Login/redux/reducer';
import HomeReducer from '../Screen/Home/redux/reducer';
import CartReducer from '../Screen/Cart/redux/reducer';

export const allReducer = combineReducers({
  GlobalReducer: GlobalReducer,
  LoginReducer: LoginReducer,
  HomeReducer: HomeReducer,
  CartReducer: CartReducer,
});
