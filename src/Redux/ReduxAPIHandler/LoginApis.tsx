/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { put, } from 'redux-saga/effects';
import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { saveLoginApi, saveSocialLoginApi } from '../Actions/LoginActions';
import { apiStart } from '../Actions/CommonActions';
import { LoginMod, SocialLoginMod } from '../../Modals/LoginModl';
import Toast from 'react-native-simple-toast';

//Login Api
export function* loginUser(params: any) {
  try {
    let header = {
      'Content-Type': 'application/json',
    };

    yield put(apiStart());
    //@ts-ignore
    const response = yield RequestManager.postRequest(
      api.LOGIN,
      {
        email: params.email,
        password: params.password,
        fcmToken:params.fcmToken
      },
      header,
    );
    const loginData = setLogData(response);
    yield put(saveLoginApi(response));
  } catch (e) {
    if (e.error.data.responseCode == 400) {
      yield put(saveLoginApi(undefined));
      yield put({ type: commonKeys.API_FAILED, message: e });
      console.log('dataLoginData>>>>>>>>>>>>>>>>>>>>>>',JSON.stringify(e.error))
      Toast.show(e.error.data.message != undefined ? e.error.data.message : e.message);
      yield put({ type: commonKeys.API_FAILED, message: e.error });
    }
    else {
      //@ts-ignore
      yield put(saveLoginApi(e.error.data));
      yield put(saveSocialLoginApi(e.error.data));
      yield put({ type: commonKeys.API_FAILED, message: e });
    }
  }
}

async function setLogData(response: any) {
  return await new Promise(function (resolve) {
    let login: LoginMod = {
      id: response.data.id,
      email: response.data.email,
      token: response.data.token,
      createdDate: response.data.createdDate,
      private: response.data.private,
      message: response.message,
    };
    resolve(login);
  });
}

//Social Login
export function* loginSocial(this: any, params: any) {
  console.log('socail login params>>>>> outside',JSON.stringify(params))
  try {
    let header = {
      'Content-Type': 'application/json',
    };
    console.log('socail login params>>>>>',JSON.stringify(params))
    yield put(apiStart());
    //@ts-ignore
    const response = yield RequestManager.postRequest(
      api.SOCIALLOGIN,
      {
        email: params.email,
        name: params.name,
        token: params.token,
        image: params.image,
        provider: params.provider,
        providerId: params.providerId,
        role: params.role,
        fcmToken:params.fcmToken
      },
      header,
    );
    console.log('socail login res>>>>>',JSON.stringify(response))
    yield put(saveLoginApi(response));
    yield put(saveSocialLoginApi(response));
  } catch (e) {
    console.log('socail login error>>>>>',JSON.stringify(e))
    if (e.error.data.responseCode == 400) {
      Toast.show(e.error.data.message, Toast.SHORT)
      yield put(saveLoginApi(undefined));
      yield put({ type: commonKeys.API_FAILED, message: e });
    }
    else {
      //@ts-ignore
      const SocialloginData = setSocialLogData(e.error.data)
      yield put(saveLoginApi(e.error.data));
      yield put(saveSocialLoginApi(e.error.data));
      yield put({ type: commonKeys.API_FAILED, message: e });
    }
  }
}
export async function setSocialLogData(response: any) {

  return await new Promise(function (resolve) {
    let socialLogin: SocialLoginMod = {
      id: response.data!=undefined ||response.data.id!=undefined? response.data.id:'',
      email: response.data!=undefined ||response.data.email!=undefined?response.data.email:'',
      token: response.data!=undefined ||response.data.token!=undefined?response.data.token:'',
      createdDate: response.data!=undefined ||response.data.createdDate!=undefined?response.data.createdDate:'',
      private: response.data!=undefined ||response.data.private!=undefined?response.data.private:false,
      image: response.data!=undefined ||response.data.image!=undefined?response.data.image:'',
      role: response.data!=undefined ||response.data.role!=undefined?response.data.role:'',
      name: response.data!=undefined ||response.data.name!=undefined?response.data.name:'',
      responseCode: response.responseCode,
      message: response.message,
    };
    resolve(socialLogin);
  });
}

//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Guest User Login Api 
export async function guestLogin(params: any,) {

  return await new Promise(async function (resolve, reject) {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    await RequestManager.postRequest(api.GUEST_LOGIN, params, header,).then((response: any) => {
      // console.log(' guest user response.data',response)
      resolve(response.data)
    })
      .catch(function (error: any) {
        console.log('error',error)
        reject(error.message)
      });
  });
}
