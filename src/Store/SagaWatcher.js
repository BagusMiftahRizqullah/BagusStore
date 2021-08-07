import {all} from 'redux-saga/effects';
import loginSaga from '../Screen/Login/redux/saga';
import HomeSaga from '../Screen/Home/redux/saga';

export function* SagaWacther() {
  yield all([loginSaga(), HomeSaga()]);
}
