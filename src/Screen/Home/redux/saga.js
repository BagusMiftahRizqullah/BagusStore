import {ToastAndroid} from 'react-native';
import {takeLatest, put} from 'redux-saga/effects';
import {getHomeActionSuccess} from './action';
import firestore from '@react-native-firebase/firestore';
import {actionLoading, actionIsLogged} from '../../../Store/GlobalAction';

const loginApi = payload => {
  return firestore().collection('tes').get();
};

function* getHomeAction(action) {
  try {
    yield put(actionLoading(true));
    const res = yield loginApi(action.payload, '<=======ini hasil Home api');
    console.log(res, 'ini hasil res');
    if (res && res._docs) {
      console.log(res._docs, 'ini hasil res');
      console.log('Berhasil Mengambil Data');
      ToastAndroid.show(
        'Berhasil data Home',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      yield put(getHomeActionSuccess(res._docs));
    }
  } catch (err) {
    console.log('Gagal Mengambil');
    yield put(actionLoading(false));
  }
}

function* HomeSaga() {
  yield takeLatest('GET_HOME', getHomeAction);
}
export default HomeSaga;
