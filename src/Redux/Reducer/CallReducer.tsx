/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { commonKeys } from '../Constants/CommonKeys';
import { LoginMod, SocialLoginMod, } from '../../Modals/LoginModl';
import { PaymentMod } from '../../Modals/PaymentModl'

import { UserModl } from '../../Modals/UserModl';
import { cos } from 'react-native-reanimated';
import loginKeys from '../Constants/LoginKeys';


const INITIAL_STATE = {
  userData: (undefined as any) as UserModl,
};

export default function UserReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {

    

    case loginKeys.SAVE_CALL:
      return {
        ...state,
        userData: action.payload,
        isLoader: false
      };

    case commonKeys.API_FAILED:
      return { ...state, isLoader: false, authError: { data: '' }, };
    case UserKeys.ERROR:
      return {
        ...state,
        authError: action.payload,
        isLoader: false
      };

    default:
      return state;
  }
};

