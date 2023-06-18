/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp } from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
import RequestManager from '../../APIManager';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { saveLoginApi } from '../../Redux/Actions/LoginActions';
import * as navigation from '../../Navigation/NavigatorService';

export interface Props {
  navigation: any;
  route: any;
  saveLoginData: any;
}

class UserChangePassword extends React.Component<Props, object> {
  
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    password: '',
    confirmPassword: '',
    currentPwd: '',
    isSelected: false,
    isLoading: false,
    isInternet: true,
    id: ''
  };

  async componentDidMount() {

    await AsyncStorage.getItem('loginId').then((res) => {
      console.log('id, event name', res)
      this.setState({ ...this.state, id: res })
    })

    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
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
    });
  }

  changePassword = async () => {
    try {
      if (this.vaildateDetails()) {
        if (this.state.isInternet) {
          this.setState({ isLoading: true })
          let errorMessage = '';
          let that = this;
          Keyboard.dismiss();
          let header = {
            'Content-Type': 'application/json',
          };

          await RequestManager.putRequest(
            'https://livesmartvideochat.iphoneapps.co.in:4000/users/changePassword',
            {
              id: this.state.id,
              password: this.state.password,
            },
            header,
          )
            .then(function (response: any) {
              that.setState({
                isLoading: false, password: '',
                confirmPassword: '',
              })
              that.logOut();

            })
            .catch(function (error: any) {
              Toast.show('Error:' + error, Toast.SHORT);
              that.setState({ isLoading: false })
            });
        }
        else {
          Toast.show('Internet not Working');
        }
      }
    } catch (error) {
      console.log('here', error);
      this.setState({ isLoading: false })
    }
  };

  private vaildateDetails() {
    if (this.state.password.length <= 0) {
      Toast.show('Please enter password.', Toast.SHORT);
      return false;
    } else if (this.state.confirmPassword.length <= 0) {
      Toast.show('Please enter confirmPassword.', Toast.SHORT);
      return false;
    } else if (this.state.confirmPassword != this.state.password) {
      Toast.show('ConfirmPassword not match', Toast.SHORT);
      return false;
    }
    return true;
  }

  async logOut() {
    await AsyncStorage.multiGet(['loginId', 'eventId']).then(async (res: any) => {
      let id = res[0][1];
      let eventname = '';
      if (id == null && id == '') {
        await AsyncStorage.setItem('loginData', '')
        this.props.saveLoginData('');
        navigation.reset('Login')
      }
      else {
        firestore().collection('liveTalks').doc(eventname).get().then(async (onResult: any) => {
          if (onResult.data() == undefined) {
            await AsyncStorage.setItem('loginData', '')
            this.props.saveLoginData('');
            navigation.reset('Login')
          }
          else {
            if (onResult.data().participants != undefined) {

              let deleteUser: any = await onResult.data().participants
              let deteteModerator: any = await onResult.data().moderators

              let index = deleteUser.indexOf(id)
              let moderatorIndex = deteteModerator.indexOf(id)

              if (index == -1 && moderatorIndex == -1) {
                await AsyncStorage.setItem('loginData', '')
                this.props.saveLoginData('');
                navigation.reset('Login')
              }
              else {
                if (index != -1) {
                  deleteUser.splice(index, 1)
                  console.log('deleteUser index', deleteUser)

                  firestore()
                    .collection('liveTalks')
                    .doc(eventname)
                    .update({
                      participants: deleteUser
                    })
                    .then(async (res) => {
                      console.log('update data')
                    
                      firestore().collection('eventUser').doc(id).update({
                        status: 'offline'
                      }).then(async () => {
                        await AsyncStorage.setItem('loginData', '')
                        this.props.saveLoginData('');
                        navigation.reset('Login')
                      })
                    })
                }
                if (moderatorIndex != -1) {
                  deteteModerator.splice(moderatorIndex, 1)
                  console.log('deleteUser index', deteteModerator)

                  firestore()
                    .collection('liveTalks')
                    .doc(eventname)
                    .update({
                      moderators: deteteModerator
                    })
                    .then(async (res) => {
                      console.log('update data')
                      
                      firestore().collection('eventUser').doc(id).update({
                        status: 'offline'
                      }).then(async () => {
                        await AsyncStorage.setItem('loginData', '')
                        this.props.saveLoginData('');
                        navigation.reset('Login')
                      })
                    })
                }
              }
            }
          }
        })
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.openDrawer()}
            btnImage={Images.menu_icon}
            title={'CHANGE PASSWORD'}
            right2BtnActn={() => this.props.navigation.navigate('Notification')}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            rightBtnActn={() => this.props.navigation.navigate('Profile')}
          />
        </View>
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
          <View style={style.mainVw}>
            <View style={style.inputVw}>
              <CustomTextInputView
                height={48}
                image={Images.lock}
                value={this.state.currentPwd}
                onchangeText={(text: any) => this.setState({ currentPwd: text })}
                placeholder={'Current Password'}
                keyboardType={'default'}
                secureTextEntry={true}
                isCvv={false}
                maxLength={50}
              />
              <CustomTextInputView
                height={48}
                image={Images.lock}
                value={this.state.password}
                onchangeText={(text: any) => this.setState({ password: text })}
                placeholder={'New Password'}
                keyboardType={'default'}
                secureTextEntry={true}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{  
                }}
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
                onKeyPress={()=>{  
                }}
              />
            </View>
            <TouchableOpacity
              style={style.saveBt}
              onPress={() => this.changePassword()}>
              <Text style={style.saveTx}>{'SAVE'}</Text>
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {
    saveLoginData: (data: any) => dispatch(saveLoginApi(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChangePassword);