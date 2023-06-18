/* eslint-disable @typescript-eslint/no-unused-vars */
import loginKeys from '../Constants/LoginKeys';
import { commonKeys } from '../Constants/CommonKeys';

export const loginApi = (data: any) => ({
  type: loginKeys.LOGIN,
  payload: data,
});
export const saveLoginApi = (data: any) => ({
  type: loginKeys.SAVE_LOGIN,
  payload: data,
});
export const socialLoginApi = (data: any) => {
  console.log("check action creator", data)
  return {
  type: loginKeys.SOCIAL_LOGIN,
  payload: data,
}};
export const saveSocialLoginApi = (data: any) => ({
  type: loginKeys.SAVE_SOCIAL_LOGIN,
  payload: data,
});

export const PaymentApi = (data: any) => ({
  type: loginKeys.PAYMENT,
  payload: data,
});
export const savePaymentApi = (data: any) => ({
  type: loginKeys.SAVE_PAYMENT,
  payload: data,
});
