/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Platform } from 'react-native';
import { takeLatest, put, takeEvery } from 'redux-saga/effects';

import loginKeys from '../Constants/LoginKeys';
import { loginUser, loginSocial } from '../ReduxAPIHandler/LoginApis';
import { payment } from '../ReduxAPIHandler/PaymentApis'
import Toast from 'react-native-simple-toast';
import { getUserData } from '../ReduxAPIHandler/UserAPis';
import UserKeys from '../Constants/UserKeys';

function* login(params: any) {
  console.log('saga12345', params);
  yield loginUser(params.payload);
}

function* socialLogin(params: any) {
  console.log('saga12345', params);
  try{
    yield loginSocial(params.payload);
  }catch(err){
    console.log("check error >>>>> at login saga cathc block >>>> ",err)
  }
  
}

function* paymentDetials(params: any) {
  console.log('paymentDetials', params);
  yield payment(params.payload);
}

function* userDetials(params: any) {
  console.log('userDetials', params);
  yield getUserData(params.payload);
}
export default function* rootSaga() {
  yield takeLatest(loginKeys.LOGIN, login);
  yield takeEvery(loginKeys.SOCIAL_LOGIN, socialLogin);
  yield takeLatest(loginKeys.PAYMENT, paymentDetials)
  yield takeLatest(UserKeys.USER_DATA, userDetials)
}
