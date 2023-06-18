/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { commonKeys } from '../Constants/CommonKeys';
import { LoginMod, SocialLoginMod, } from '../../Modals/LoginModl';
import { PaymentMod } from '../../Modals/PaymentModl'
import UserKeys from '../Constants/UserKeys';
import { UserModl } from '../../Modals/UserModl';
import { cos } from 'react-native-reanimated';


const INITIAL_STATE = {
  userData: (undefined as any) as UserModl,
};

export default function UserReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {

    case UserKeys.SAVE_PROFILE_IMAGE:
      let data = state.userData;
      data.image = action.payload;
      return {
        ...state,
        userData: data,
        isLoader: false
      };

    case UserKeys.SAVE_USER_DATA:
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

