/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import * as navigation from '../../Navigation/NavigatorService';
// @ts-ignore
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp,} from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
import validator from 'validator';
import RequestManager from '../../APIManager';
import api from '../../Resources/APIs';
import { googleLogin, facebookLogin } from '../../Constants/SocialLogin';
import { connect } from 'react-redux';
import { socialLoginApi, saveLoginApi } from '../../Redux/Actions/LoginActions';
import { SocialLoginMod } from '../../Modals/LoginModl';
import AsyncStorage from '@react-native-community/async-storage';
import { internetcheck } from '../../Constants/InternetCkeck';
import firestore from '@react-native-firebase/firestore';
import { appleAuth } from '@invertase/react-native-apple-authentication';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  socialSignup: any;
  signupResponse: SocialLoginMod;
  saveLoginData: any;
}

class Signup extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    name:'',
    lname:'',
    email: '',
    password: '',
    confirmPassword: '',
    isSelected: false,
    errorMessage: '',
    isLoading: false,
    isInternet: true,
    checkVal:false,
    fcmToken:'',
  };
  isCurrentView = false;
  count = 0;
  componentDidMount() {
    AsyncStorage.getItem('fcmToken').then((res)=>{
      this.setState({...this.state,fcmToken:res})
        })
   
    this.props.navigation.addListener('blur', (event: any) => {

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
      this.isCurrentView = true;
    });
  }

 

  componentWillReceiveProps(props: any) {
      if (props.signupResponse != undefined) {
        if (this.isCurrentView && props.signupResponse.socialLogin != undefined) {

          this.saveLoginInfo({ data: props.signupResponse.socialLogin, type: 'SocialLogin' });
          this.setState({ isLoading: false })
        }
        else {
          this.setState({ isLoading: false })
        }
      }
      else {
        this.setState({ isLoading: false })
      }
    }
  private saveLoginInfo = async (response: any) => {
    try {
      if (response.type == 'SocialLogin') {
        console.log('Signup', response)
        if (response.data.responseCode == 402) {
          await AsyncStorage.setItem('loginId', response.data.data.id != undefined ? response.data.data.id : response.data.id);
          firestore().collection('eventUser').doc(response.data.data.id != undefined ? response.data.data.id : response.data.id).update({
            status: 'offline'
          }).then(()=>{});
          this.props.navigation.navigate('Pay', {
            id: response.data.data.id != undefined ? response.data.data.id : response.data.id,
            email: response.data.data.email != undefined ? response.data.data.email : response.data.email,
            name:'',
            image:'',
          })
          this.setState({ isLoading: false, email: '', password: '', confirmPassword: '' })
          

        }else if(response.responseCode == 402){
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
          this.setState({ isLoading: false, email: '', password: '', confirmPassword: '' })
          this.isCurrentView = false;
        } else {

          await AsyncStorage.setItem('loginData', JSON.stringify(response.data));
          firestore().collection('eventUser').doc(response.data.data.id != undefined ? response.data.data.id : response.data.id).update({
            status: 'offline'
          }).then(()=>{});
          // console.log('responsedata', response.data.message)
           
          Toast.show(response.data.message != '' ? response.data.message != undefined ? response.data.message : 'Login successfully' : 'Login successfully', Toast.SHORT);
          this.setState({ isLoading: false, email: '', password: '', confirmPassword: '' })
          this.props.navigation.navigate('HomeStackScreen');

          this.isCurrentView = false;
        }
      }
      else {
        // console.log('response', response)
      }
    }

    catch (error) {
      Toast.show(error);
    }
  };

  signup = () => {
    if (this.vaildateDetails()) {
      this.apiSignup();
      this.setState({ isLoading: true })
    }
  };

  private vaildateDetails() {
    if (this.state.name.length <= 0) {
      Toast.show('Please enter first name.', Toast.SHORT);
      return false;
    } else if (this.state.lname.length <= 0) {
      Toast.show('Please enter lastname.', Toast.SHORT);
      return false;
    }
    else if (this.state.email.length <= 0) {
      Toast.show('Please enter email.', Toast.SHORT);
      return false;
    } else if (!validator.isEmail(this.state.email)) {
      Toast.show('Please enter valid email.', Toast.SHORT);
      return false;
    } else if (this.state.password.length <= 0) {
      Toast.show('Please enter password.', Toast.SHORT);
      return false;
    } else if (this.state.password.length < 6) {
      Toast.show('Password must be atlist 6 character.', Toast.SHORT);
      return false;
    }else if (this.state.confirmPassword.length <= 0) {
      Toast.show('Please enter confirmPassword.', Toast.SHORT);
      return false;
    } else if (this.state.confirmPassword != this.state.password) {

      Toast.show('ConfirmPassword not match', Toast.SHORT);

      return false;
    }else if(!this.state.checkVal){
      Toast.show('Please accept terms & conditions to proceed registeration', Toast.SHORT);
      return false
    }
    return true;
  }

  private async apiSignup() {
    let errorMessage = '';
    let weakSelf = this;
    Keyboard.dismiss();
    let header = {
      'Content-Type': 'application/json',
    };

    await RequestManager.postRequest(
      api.SINGIN,
      {
        name: this.state.name,
        lastName:this.state.lname,
        email: this.state.email,
        password: this.state.password,
        cpassword: this.state.confirmPassword,
        fcmToken:  this.state.fcmToken
        
      },
      header,
    )
      .then(function (response: any) {
        // console.log('start>>', response);
        weakSelf.setState({ isLoading: false })

        weakSelf.manageLogin(response);
      })
      .catch(function (error: any) {
        errorMessage = error;
        Toast.show(error.error.data.message, Toast.SHORT);
        weakSelf.setState({ isLoading: false })

      });

  }

  //Manage Login Response

  private async manageLogin (response: any) {
    if (response.status == 'Not Finished') {
      setTimeout(function () {
        Toast.show(
          'Your profile is in process of moderation.\nPlease complete registration form details', Toast.SHORT
        );
      }, 100);
    } else {
      console.log('start111111>>', response.data.id);
      await AsyncStorage.setItem('loginId', response.data.id);
      firestore().collection('eventUser').doc(response.data.id).update({
        status: 'offline'
      }).then(()=>{});
      this.props.navigation.navigate('Pay', {
        id: response.data.id,
        email: response.data.email,
        password:this.state.password,
      });
      this.setState({ isLoading: false, email: '', password: '', confirmPassword: '' })
    }
  }
  googleSignIn = async () => {
    googleLogin()
      .then((res: any) => {
        // console.log('signup', res);

        this.props.socialSignup({
          email: res.user.email,
          name: res.user.name,
          token: res.idToken,
          image: res.user.photo,
          provider: 'Google',
          providerId: res.idToken,
          role: 'user',
          fcmToken:  this.state.fcmToken
        });
        this.setState({ isLoading: true })
      })
      .catch((error: any) => {
        Toast.show(error, Toast.SHORT);
      });
  };
  facebookSignIn = () => {
    facebookLogin()
      .then((res: any) => {
        // console.log('facebookres', res);
        return {
          email: res.email,
          name: res.name,
          token: res.id,
          image: res.picture.data.url,
          provide: 'Facebook',
          providerId: res.id,
          role: 'user',
          fcmToken:  this.state.fcmToken
        };

      }).then((data) => {
        this.props.socialSignup(data)
        this.setState({ isLoading: true })
      })
      .catch((error: any) => {
        console.log('error', error);
        Toast.show(error, Toast.SHORT);
      });
  };

  appleSignIn = async () => {

    if (this.state.isInternet) {

      try {


        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );
        // console.log('Apple loginResponse', JSON.stringify(appleAuthRequestResponse))

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          let givenName = appleAuthRequestResponse.fullName?.givenName != null ? appleAuthRequestResponse.fullName?.givenName : '';
          let familyName = appleAuthRequestResponse.fullName?.familyName != null ? appleAuthRequestResponse.fullName?.familyName : '';
          let email = appleAuthRequestResponse.email != null ? appleAuthRequestResponse.email : appleAuthRequestResponse.user;
          this.setState({ name: givenName + ' ' + familyName })
          let params = {
            name: givenName + ' ' + familyName,
            email: email,
            token:appleAuthRequestResponse.user,
            image:'',
            role: "user",
            providerId: appleAuthRequestResponse.user,
            provider: 'Apple',
            fcmToken: this.state.fcmToken,
          }
          this.props.socialSignup(params)
          console.log('Apple loginResponse', JSON.stringify(appleAuthRequestResponse))


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

  checkBoxHandler = () => {
    
}

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={style.container}>
        <View style={style.headerVw}/>
        
        
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={style.mainVw}>
            <Text style={style.createTx}>{'CREATE AN ACCOUNT'}</Text>
            <View style={style.socalVw}>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity style={style.appleVw}>
                  <Image source={Images.apple} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={style.googleVw}
                onPress={() => this.googleSignIn()}>
                <Image source={Images.google} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={style.facebookVw} onPress={() => this.facebookSignIn()}>
                <Image source={Images.facebook} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>
            <Text style={style.orTx}>{'Or'}</Text>
            <View style={style.inputVw}>
            <CustomTextInputView
                height={48}
                image={Images.user}
                value={this.state.name}
                onchangeText={(text: any) => this.setState({ ...this.state,name: text })}
                placeholder={'First name'}
                keyboardType={'email-address'}
                secureTextEntry={false}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{}}
              />
              <CustomTextInputView
                height={48}
                image={Images.user}
                value={this.state.lname}
                onchangeText={(text: any) => this.setState({ ...this.state,lname: text })}
                placeholder={'Last name'}
                keyboardType={'email-address'}
                secureTextEntry={false}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{}}
              />
              <CustomTextInputView
                height={48}
                image={Images.email}
                value={this.state.email}
                onchangeText={(text: any) => this.setState({ email: text })}
                placeholder={'Email'}
                keyboardType={'email-address'}
                secureTextEntry={false}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{}}
              />
              <CustomTextInputView
                height={48}
                image={Images.lock}
                value={this.state.password}
                onchangeText={(text: any) => this.setState({ password: text })}
                placeholder={'Password'}
                keyboardType={'default'}
                secureTextEntry={true}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{}}
              />
              <CustomTextInputView
                height={48}
                image={Images.lock}
                value={this.state.confirmPassword}
                onchangeText={(text: any) =>
                  this.setState({ confirmPassword: text })
                }
                placeholder={'Confirm Password'}
                keyboardType={'default'}
                secureTextEntry={true}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{}}
              />
            </View>
            <View style={style.checkboxContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                { 
                  <TouchableOpacity onPress={() => this.setState({
                    ...this.state,
                    checkVal: !this.state.checkVal
                })} style={[style.checkBoxView,{ borderWidth:1 }]}>
                  {this.state.checkVal ?
                    <Image source={require('./Assets/check.png')} style={style.checkImg} /> : null
                  }
                  
                </TouchableOpacity> 
           
                }
                <Text style={style.agreeMsg}>{'I read & agree to '}<Text style={style.agreeLink}>{'Terms & Conditions.'}</Text></Text>
              </View>
             
            </View>
            <Text style={style.alreadyTx}>{'Already have an account?'}</Text>
            <Text
              onPress={() => {
                this.isCurrentView = false;
                this.props.navigation.navigate('Login')
                this.setState({ isLoading: false, email: '', password: '', confirmPassword: '' })
              }}
              style={style.loginTx}>
              {'LOG IN'}
            </Text>
            <TouchableOpacity
              style={style.saveBt}
              onPress={() => this.signup()}>
              <Text style={style.saveTx}>{'CONTINUE WITH EMAIL'}</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animated={true}
            animationType={'fade'}
            transparent={true}
            visible={this.state.isLoading}>
            <View style={style.popupView}>
              {this.state.isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : null}

            </View>
          </Modal>
        </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {
  // console.log('all data', state.LoginReducer.loginInfo)
  return {
    signupResponse: state.LoginReducer.loginInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    socialSignup: (data: any) => dispatch(socialLoginApi(data)),
    saveLoginData: (data: any) => dispatch(saveLoginApi(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
