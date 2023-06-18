/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native'
import { AppContainer } from './src/Navigation/AppContainer';
import requestCameraAndAudioPermission from './src/Constants/Permission';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './src/Redux/Saga/Saga';
import LoginReducer from './src/Redux/Reducer/LoginReducer';
import color from './src/Resources/Colors';
import messaging from '@react-native-firebase/messaging';
import { fcmService } from './src/Constants/Firebase/FCMService';
import { localNotificationservice } from './src/Constants/Firebase/LocalNotificationService';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';


const sagaMiddleWare = createSagaMiddleware();
const rootReducer = combineReducers({
  LoginReducer,
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

declare const global: { HermesInternal: null | {} };

class App extends React.Component {
  UNSAFE_componentWillMount(){
    this.checkPermission();
    this.messageListener();
  }

  async componentDidMount() {

    this.configureGoogleLogin()

    let resp: any = await AsyncStorage.getItem('loginData');
    if(JSON.parse(resp).role == 'guest') {
      await AsyncStorage.setItem('loginData', '');
    }

    
  }

  checkPermission = async () => {
    try {
      const token = await messaging().getToken();
      AsyncStorage.setItem('fcmtoken',token)
      //  console.log("errorMessage>>>>", permission)
      fcmService.registerAppWithFCM();
      fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification);
      localNotificationservice.configure(this.onOpenNotification);
    }
    catch (error: any) {
      console.error(error)
      // 
    }
  }

  onOpenNotification = (notify: any) => {
    console.log("[App] On Open Notifications: ", notify);

    // Alert("Open Notification: ", notify);


  }
  onNotification = (notify: any) => {
    console.log("[App] On Notifications: ", notify)
    const options = {
      soundName: 'default',
      playSound: true
    }
    localNotificationservice.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options
    )
  }
  onRegister = (token: any) => {
    console.log("[App] On Register: ", token)
  }

  messageListener = async () => {
    console.log('inside message listener ****** ')

    messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    })
  }

  configureGoogleLogin() {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '158827048732-r567dv4noii0c2fnouef0l206qvo4vb2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '158827048732-bimndqm06bo147m8t0gtltmkuqilq5t6.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar translucent backgroundColor={color.APP_Splash_BG_COLOR2} />
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
