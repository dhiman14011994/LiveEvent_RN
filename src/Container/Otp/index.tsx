/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import {NavigationScreenProp,} from 'react-navigation';
import {style} from './style';
import OtpTxtField from '../../Components/OtpTxtField';
import RequestManager from '../../APIManager';
import api from '../../Resources/APIs';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  route:any;
}

class Otp extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    isLoading: false,
    isInternet: true,
  };
  inputRefs: any = {};
  isCurrentView = true;
  

  componentDidMount() {
    this.props.navigation.addListener('willBlur', (event: any) => {
      if (event.lastState.routeName == 'OTP') {
        this.isCurrentView = false;
        internetcheck().then((res) => {
          console.log('internet check', res)
          this.setState({ isInternet: res })
        }).catch((error) => {
          this.setState({ isInternet: error })
          Toast.show('Internet not Working');
        })
      }
    });
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'OTP') {
        internetcheck().then((res) => {
          console.log('internet check', res)
          this.setState({ isInternet: res })
        }).catch((error) => {
          this.setState({ isInternet: error })
          Toast.show('Internet not Working');
        })
        this.isCurrentView = true;
      }
    });
  }

  handleInput = (text: string, id: any, ref: string) => {
    switch (id) {
      case 1:
        this.setState({otp1: text});
        break;

      case 2:
        this.setState({otp2: text});
        break;

      case 3:
        this.setState({otp3: text});
        break;

      case 4:
        this.setState({otp4: text});
        break;
    }
    if (ref != '') {
      this.inputRefs[ref].focus();
    }

    setTimeout(() => {
      this.checkIfOtpFilled();
    }, 10);
  };
  checkIfOtpFilled() {
    if (
      this.state.otp1 != '' &&
      this.state.otp2 != '' &&
      this.state.otp3 != '' &&
      this.state.otp4 != ''
    ) {
      this.setState({unFilled: false});
    } else {
      this.setState({unFilled: true});
    }
  }

  setInputRef = (id: string, input: TextInput) => {
    this.inputRefs[id] = input;
  };
  verifyOtp = async () => {
    if (this.vaildateDetails()) {
      if (this.state.isInternet) {
      this.setState({isLoading:true})
      let errorMessage = '';
      let that = this;
      Keyboard.dismiss();
      let otp =
        this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4;
      let header = {
        'Content-Type': 'application/json',
      };

      await RequestManager.postRequest(
        api.OTP,
        {
          id: this.props.route.params.id,
          verificationCode: otp,
        },
        header,
      )
        .then(function (response: any) {
          console.log('start>>', response);
          that.setState({isLoading:false,otp1: '',
          otp2: '',
          otp3: '',
          otp4: ''})
          that.props.navigation.navigate('ChangePassword', {
            id: that.props.route.params.id,
          });
          
        })
        .catch(function (error: any) {
          Toast.show('Error: '+ error.message,Toast.SHORT);
          that.setState({isLoading:false,otp1: '',
          otp2: '',
          otp3: '',
          otp4: ''})
        });
      }
      else {
        Toast.show('Internet not Working');
      }
    }
  };

  private vaildateDetails() {
    if (
      this.state.otp1 &&
      this.state.otp2 &&
      this.state.otp3 &&
      this.state.otp4 == ''
    ) {
      Toast.show('Please enter otp.',Toast.SHORT);
      return false;
    }
    return true;
  }

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
        <NavigationHeader
          isMultiple={true}
          leftBtnActn={()=> this.props.navigation.goBack() }
          btnImage={Images.backArrow}
          title={''}
          rightBtnActn={() => {}}
        />
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          //@ts-ignore
          flexGrow={1}
          enableAutomaticScroll={true}
          resetScrollToCoords={{x: 0, y: 0}}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{flexGrow: 1}}>
          <View style={style.mainVw}>
            <Text style={style.createTx}>{'ENTER PIN'}</Text>
            <Text style={style.orTx}>{'Please Enter the PIN'}</Text>
            <Text style={style.verificationTx}>
              {'Set a PIN for your account.'}
            </Text>
            <View style={style.inputVw}>
              <OtpTxtField
                value={this.state.otp1}
                onTextChange={(text: string) =>
                  this.handleInput(text, 1, 'field2')
                }
                inputRef={(input: TextInput) => {
                  this.setInputRef('field1', input);
                }}
              />
              <OtpTxtField
                value={this.state.otp2}
                onTextChange={(text: string) =>
                  this.handleInput(text, 2, 'field3')
                }
                inputRef={(input: TextInput) => {
                  this.setInputRef('field2', input);
                }}
              />
              <OtpTxtField
                value={this.state.otp3}
                onTextChange={(text: string) =>
                  this.handleInput(text, 3, 'field4')
                }
                inputRef={(input: TextInput) => {
                  this.setInputRef('field3', input);
                }}
              />
              <OtpTxtField
                value={this.state.otp4}
                onTextChange={(text: string) => this.handleInput(text, 4, '')}
                inputRef={(input: TextInput) => {
                  this.setInputRef('field4', input);
                }}
              />
            </View>
            <TouchableOpacity
              style={style.saveBt}
              onPress={() => this.verifyOtp()}>
              <Text style={style.saveTx}>{'NEXT'}</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animated={true}
            animationType={'fade'}
            transparent={true}
            visible={this.state.isLoading}>
            <View style={style.popupView}>
            {this.state.isLoading? <ActivityIndicator size="large" color="#ffffff" />: null}
              
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default Otp;
