/* eslint-disable @typescript-eslint/no-unused-vars */
import {combineReducers} from 'redux';
import loginKeys from '../Constants/LoginKeys';
import {commonKeys} from '../Constants/CommonKeys';
import {LoginMod, SocialLoginMod, } from '../../Modals/LoginModl';
import {PaymentMod} from '../../Modals/PaymentModl'
import UserReducer from './UserReducer';


const INITIAL_STATE = {
  login: (undefined as any) as LoginMod,
  socialLogin: (undefined as any) as SocialLoginMod,
  payment: (undefined as any) as PaymentMod,
};

export const saveLoginInfo = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case loginKeys.SAVE_LOGIN:
      return {
        ...state,
        login: action.payload,
        isLoader: false
      };
      
    case loginKeys.SAVE_SOCIAL_LOGIN:
      return {
        ...state,
        socialLogin: action.payload,
        isLoader: false
      };
      case loginKeys.SAVE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
        isLoader: false
      };

      case commonKeys.API_FAILED:
      return { ...state, isLoader: false, authError: { data: '' }, };
      case loginKeys.ERROR:
      return {
        ...state,
        authError: action.payload,
        isLoader: false
      };

    default:
      return state;
  }
};
export default combineReducers({
  loginInfo: saveLoginInfo,
  userInfo: UserReducer
});
