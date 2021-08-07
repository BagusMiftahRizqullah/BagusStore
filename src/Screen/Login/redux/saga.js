import {ToastAndroid} from 'react-native';
import {takeLatest, put} from 'redux-saga/effects';
import {loginActionSuccess, loginActionFailed} from './action';
import firestore from '@react-native-firebase/firestore';
import {actionLoading, actionIsLogged} from '../../../Store/GlobalAction';

const loginApi = payload => {
  return firestore().collection('auth').get();
};

function* loginAction(action) {
  try {
    yield put(actionLoading(true));
    const res = yield loginApi(action.payload, '<=======ini hasil login api');
    console.log(res, 'ini hasil res');
    if (res && res._docs) {
      console.log(res._docs, 'ini hasil res');
      console.log('Berhasil Login');
      ToastAndroid.show('Berhasil LOGIN', ToastAndroid.SHORT, ToastAndroid.TOP);
      yield put(actionIsLogged(true));
      yield put(loginActionSuccess(res._docs));
    }
  } catch (err) {
    console.log(err.response.data.message, 'Gagal Login');
    yield put(actionLoading(false));
    const errorMessage = err.response.data.message + '';
    ToastAndroid.show(errorMessage, ToastAndroid.LONG, ToastAndroid.TOP);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginAction);
}
export default loginSaga;
