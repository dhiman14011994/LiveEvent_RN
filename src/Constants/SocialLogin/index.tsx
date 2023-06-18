/* eslint-disable eqeqeq */
import { Platform } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const googleLogin = async () => {
  await GoogleSignin.signOut()
  return await new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      resolve(userInfo);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
        reject(error);
      }
    }
  });
};

export const facebookLogin = async () => {
  if (Platform.OS === 'android') {
    LoginManager.setLoginBehavior('web_only');
  }
  return await new Promise((resolve, reject) => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          reject('facebook Login cancelled');
        }
      })
      .then(() => {
        const infoRequest = new GraphRequest(
          '/me?fields=id,name,email,picture',
          null,
          (error, result) => {
            if (error) {
              console.log('Error fetching data: ', error);
            } else {
              console.log('fetching data facebook>>>',result)
              resolve(result);
            }
          },
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      })
      .catch((err) => reject(err));
  });
};

