/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Images from '../../Resources/Images';
import validator from 'validator';
import { NavigationScreenProp } from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
import { loginApi, socialLoginApi, saveLoginApi, saveSocialLoginApi } from '../../Redux/Actions/LoginActions';
import { connect } from 'react-redux';
import { LoginMod, SocialLoginMod } from '../../Modals/LoginModl';
import * as navigation from '../../Navigation/NavigatorService';
import { googleLogin, facebookLogin } from '../../Constants/SocialLogin';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import firestore from '@react-native-firebase/firestore';
import UserLoginVw from './UserLogin';
import ModeratorLogin from './ModeratorLogin';
import GuestLogin from './GuestLogin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { fcmService } from '../../Constants/Firebase/FCMService';
import { localNotificationservice } from '../../Constants/Firebase/LocalNotificationService';
import messaging from '@react-native-firebase/messaging';
import { commonKeys } from '../../Redux/Constants/CommonKeys';
import { setSocialLogData } from '../../Redux/ReduxAPIHandler/LoginApis'
import api from '../../Resources/APIs';
import RequestManager from '../../APIManager';
export interface Props {
  navigation: NavigationScreenProp<any, any>;
  loginUser: any;
  loginResponse: LoginMod;
  socialSignup: any;

  signupResponse: SocialLoginMod;
  saveLoginData: any;
}

class Login extends React.Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    email: '',
    password: '',
    isSelected: false,
    isLoading: false,
    isInternet: true,
    tabIndex: 0,
    fcmToken: ''
  };

  isFbLogin = true;
  isCurrentView = false;
  willBlurListener: any;




  UNSAFE_componentWillMount() {
    this.checkPermission();
    this.messageListener();
  }




  async componentDidMount() {

    Keyboard.dismiss();
    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
      this.isCurrentView = false;

    });
    this.props.navigation.addListener('focus', (event: any) => {

      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
      this.setState({ isLoading: false, email: '', password: '' });
      this.isCurrentView = true;
    });
  }





  componentWillReceiveProps(props: any) {
    console.log('loginResponse>>>>>>', props.loginResponse)
    if (this.isCurrentView) {
      console.log('loginResponse>>>>>> IN block', props.loginResponse)
      if (props.loginResponse != undefined) {
        if (this.isCurrentView && props.loginResponse.login != undefined && props.loginResponse.login != '') {
          if (props.loginResponse.login.data != undefined && props.loginResponse.login.data != '') {
            this.saveLoginInfo({ data: props.loginResponse.login, type: 'login' });
            this.setState({ isLoading: false });
          }
          else {
            this.setState({ isLoading: false });
          }
        }
        else if (props.loginResponse.socialLogin != undefined) {
          this.saveLoginInfo({ data: props.loginResponse.socialLogin.data, type: 'login' });
          this.setState({ isLoading: false })
        }
        else {
          this.setState({ isLoading: false });
        }
      }
      else {
        this.setState({ isLoading: false });
      }
      this.setState({ isLoading: false });
    } else {

      this.saveLoginInfo({ data: props.loginResponse.login, type: 'login' });

    }
  }




  private saveLoginInfo = async (response: any) => {
    console.log("check method fires >>>> saveLoginInfo ",)
    try {
      if (response.type == 'login') {
        if (response.data != undefined) {
          if (response.data.responseCode == 402) {
            await AsyncStorage.setItem('loginId', response.data.data.id);
            firestore().collection('eventUser').doc(response.data.data.id).update({
              status: 'offline'
            }).then(() => { });
            this.props.navigation.navigate('Pay', {
              id: response.data.data.id,
              email: response.data.data.email,
              name: '',
              image: '',
            })
            this.setState({ isLoading: false, email: '', password: '' });
            this.isCurrentView = false;
          }
          else if (response.responseCode == 402) {
            if (response.data != undefined || response.data.id != undefined) {
              await AsyncStorage.setItem('loginId', response.data.id);
              firestore().collection('eventUser').doc(response.data.id).update({
                status: 'offline'
              }).then(() => { });
              this.props.navigation.navigate('Pay', {
                id: response.data.id,
                email: response.data.email,
                name: '',
                image: '',
              })
              this.setState({ isLoading: false, email: '', password: '' });
              this.isCurrentView = false;
            }
            else {
              this.setState({ isLoading: false, email: '', password: '' });
              this.isCurrentView = false;
            }

          }
          else {
            await AsyncStorage.setItem('loginData', JSON.stringify(response.data));
            await AsyncStorage.setItem('loginId', response.data.data.id);
            firestore().collection('eventUser').doc(response.data.data.id).update({
              status: 'offline'
            }).then(() => { });
            const value = await AsyncStorage.getItem('loginData');
            console.log('loginData54334', response.data)
            this.setState({ isLoading: false, email: '', password: '' });
            console.log('login' + this.isCurrentView)
            this.isCurrentView = false;
            Toast.show(response.data.message != '' ? response.data.message != undefined ? response.data.message : 'Login successfully' : 'Login successfully', Toast.SHORT);
            navigation.reset('HomeStackScreen');
          }
        }
        else {
          Toast.show(response.message, Toast.SHORT)

          this.setState({ isLoading: false });
        }
      }
      else {
        if (response.data != undefined) {
          if (response.data.id != undefined) {
            if (response.data.responseCode == 402) {
              await AsyncStorage.setItem('loginId', response.data.id);
              firestore().collection('eventUser').doc(response.data.id).update({
                status: 'offline'
              }).then(() => { });
              this.props.navigation.navigate('Pay', {
                id: response.data.id,
                email: response.data.email,
                password: '12345'
              })
              this.setState({ isLoading: false, email: '', password: '' });
              this.isCurrentView = false;

            } else {
              await AsyncStorage.setItem('loginData', JSON.stringify(response.data));
              console.log(response.data)
              this.isCurrentView = false;
              this.setState({ isLoading: false, email: '', password: '' });
              Toast.show(response.message, Toast.SHORT)
            }
          }
          else {
            this.setState({ isLoading: false });
          }
        }
        else {
          this.setState({ isLoading: false });
        }

      }
    }

    catch (error) {
      Toast.show(error, Toast.SHORT)
    }
  };

  //get firebase token
  checkPermission = async () => {
    try {
      const token = await messaging().getToken();
      AsyncStorage.setItem('fcmtoken', token)
      this.setState({ ...this.state, fcmToken: token })

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
    })
  }




  login = async () => {
    if (this.vaildateDetails()) {
      Keyboard.dismiss();
      try {
        if (this.state.isInternet) {

          this.props.loginUser({
            email: this.state.email.toLowerCase(),
            password: this.state.password,
            fcmToken: this.state.fcmToken,
          });
          this.setState({ isLoading: true });
        }
        else {
          Toast.show('Internet not Working');
        }

      }
      catch (error) {
        Toast.show(error)
        this.setState({ isLoading: false });
      }
    }
  };




  private vaildateDetails() {
    if (this.state.email.length <= 0) {
      Toast.show('Please enter email.', Toast.SHORT);
      this.setState({ isLoading: false });
      return false;
    } else if (!validator.isEmail(this.state.email)) {
      Toast.show('Please enter valid email.', Toast.SHORT);
      this.setState({ isLoading: false });
      return false;
    } else if (this.state.password.length <= 0) {
      Toast.show('Please enter password.', Toast.SHORT);
      this.setState({ isLoading: false });
      return false;
    }
    return true;
  }

  hitSocialAPi = async (res: any) => {
    const params = {
      email: res.user.email + "4",
      name: res.user.name,
      token: res.idToken,
      image: res.user.photo,
      provider: 'Google',
      providerId: res.user.id + "5",
      role: 'user',
      fcmToken: this.state.fcmToken,
    }
    await new Promise((resolve, reject) => {
      try {
        let header = {
          'Content-Type': 'application/json',
        };
        //@ts-ignore
        const response = RequestManager.postRequest(
          api.SOCIALLOGIN,
          {
            email: params.email,
            name: params.name,
            token: params.token,
            image: params.image,
            provider: params.provider,
            providerId: params.providerId,
            role: params.role,
            fcmToken: params.fcmToken
          },
          header,
        );
        console.log('socail login res>>>>>', JSON.stringify(response))
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  initGoogleLogin = (res: any) => {
    console.log("check init google login >>> ")
    // this.props.socialSignup({
    //   email: res.user.email + "3",
    //   name: res.user.name,
    //   token: res.idToken,
    //   image: res.user.photo,
    //   provider: 'Google',
    //   providerId: res.user.id+"3",
    //   role: 'user',
    //   fcmToken: this.state.fcmToken,
    // });



    try {

      this.hitSocialAPi(res).then(data => {
        this.props.saveLoginData(data)
        return data
      }).then(data => {
        this.props.savesocialData(data)
      }).catch(err => {
        if (err.error.data.responseCode == 400) {
          Toast.show(err.error.data.message, Toast.SHORT)
          this.props.saveLoginData(undefined)
          this.props.apiFailed(err)
        } else {
          const SocialloginData = setSocialLogData(err.error.data)
          this.props.saveLoginData(err.error.data)
          this.props.savesocialData(err.error.data)
          this.props.apiFailed(err)
        }
      })

    } catch (e) {

    }
  }


  // Google Login Code
  googleSignIn = async () => {
    if (this.state.isInternet) {
      googleLogin()
        .then((res: any) => {
          console.log('signup response from google check >>>>. ', res);
          // this.initGoogleLogin(res)
          this.props.socialSignup({
            email: res.user.email + "6",
            name: res.user.name,
            token: res.idToken,
            image: res.user.photo,
            provider: 'Google',
            providerId: res.user.id + "6",
            role: 'user',
            fcmToken: this.state.fcmToken,
          });

        })
        .catch((error: any) => {
          console.log('error', JSON.stringify(error));
          Toast.show(JSON.stringify(error), Toast.SHORT)

        });
    }
    else {
      Toast.show('Internet not Working');
    }
  };





  facebookSignIn = () => {
    if (this.state.isInternet) {
      facebookLogin()
        .then((res: any) => {
          return {
            email: res.email,
            name: res.name,
            token: res.id,
            image: res.picture.data.url,
            provider: 'Facebook',
            providerId: res.id,
            role: 'user',
            fcmToken: this.state.fcmToken,
          };
        }).then((data) => {
          // console.log('error>>>>>>>>>>>>>>', JSON.stringify(data));
          this.props.socialSignup(data)
        })
        .catch((error: any) => {
          console.log('error>>>>>>>>>>>>>>', JSON.stringify(error));
          Toast.show(JSON.stringify(error), Toast.SHORT)
        });
    }
    else {
      Toast.show('Internet not Working');
    }
  };

  appleSignIn = async () => {

    if (this.state.isInternet) {

      try {
        // AppleAuthRequestOperation.LOGOUT;
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );
        if (credentialState === appleAuth.State.AUTHORIZED) {
          let givenName = appleAuthRequestResponse.fullName?.givenName != null ? appleAuthRequestResponse.fullName?.givenName : '';
          let familyName = appleAuthRequestResponse.fullName?.familyName != null ? appleAuthRequestResponse.fullName?.familyName : '';
          let email = appleAuthRequestResponse.email != null ? appleAuthRequestResponse.email : '';
          this.setState({ name: givenName + ' ' + familyName })
          let params = {
            name: givenName + ' ' + familyName,
            email: email,
            token: appleAuthRequestResponse.user,
            image: '',
            role: "user",
            provider: 'Apple',
            providerId: appleAuthRequestResponse.user,
            fcmToken: this.state.fcmToken,
          }
          this.props.socialSignup(params)
        }


      }
      catch (error) {
        console.log('Apple loginResponse error', error)
      }
    }
    else {
      Toast.show('Internet not Working');
    }
  }

  moveSignup = () => {
    this.isCurrentView = false;
    this.setState({ isLoading: false, email: '', password: '' });
    this.props.navigation.navigate('Signup')
  }

  renderLoginOPtions(title: string, index: any) {
    return (
      <TouchableOpacity onPress={() => this.setState({ tabIndex: index })} style={{ width: Dimensions.get('screen').width / 3 }} activeOpacity={0.8}>
        <View style={[style.menuTxtVw, this.state.tabIndex == index ? null : { backgroundColor: 'transparent' }]}>
          <Text style={[style.tabTx, { marginBottom: 2 }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    return (
      <SafeAreaView style={style.container}>

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={style.mainVw}>
            <Text style={style.createTx}>{'LOGIN'}</Text>
            <View style={style.menuCntnr}>
              {
                this.renderLoginOPtions('USER', 0)
              }
              {
                this.renderLoginOPtions('MODERATOR', 1)
              }
              {
                this.renderLoginOPtions('GUEST', 2)
              }
            </View>
            {
              this.state.tabIndex == 0 ?
                <UserLoginVw this={this} /> :
                this.state.tabIndex == 1 ?
                  <ModeratorLogin this={this} /> :
                  <GuestLogin this={this} navigation={this.props.navigation} />
            }
            <Modal
              animated={true}
              animationType={'fade'}
              transparent={true}
              visible={this.state.isLoading}>
              <View style={style.popupView}>
                {this.state.isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : null}

              </View>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    loginResponse: state.LoginReducer.loginInfo,
    signupResponse: state.LoginReducer.loginInfo.socialLogin,
  };
}

function mapDispatchToProps(dispatch: any) {

  return {
    loginUser: (data: any) => dispatch(loginApi(data)),
    socialSignup: (data: any) => dispatch(socialLoginApi(data)),
    saveLoginData: (data: any) => dispatch(saveLoginApi(data)),
    savesocialData: (data: any) => dispatch(saveSocialLoginApi(data)),
    apiFailed: (e: any) => dispatch({ type: commonKeys.API_FAILED, message: e })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


