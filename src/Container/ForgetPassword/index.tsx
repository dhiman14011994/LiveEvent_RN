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
  
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp} from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
import validator from 'validator';
import RequestManager from '../../APIManager';
import api from '../../Resources/APIs';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
export interface Props {
  navigation: NavigationScreenProp<any, any>;
}
const url = 'https://www.youtube.com/watch?v=xvh7KZGVuXY'
class ForgetPassword extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    email: '',
    isSelected: false,
    isLoading: false,
    isInternet: true,
    thumbnailUrl:'',
    videoUrl:'',
    video:''
  };

  componentDidMount() {
    

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
    
      // const VIMEO_ID = data.split('https://vimeo.com/');
      global.fetch(`https://player.vimeo.com/video/${Number(476053569)}/config`)
          .then(res => res.json())
          .then(res => {
            console.log('uri',res)
              this.setState({
                  ...this.state,
                  thumbnailUrl: res.video.thumbs['640'],
                  videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
                  video: res.video,
              })
          });
  
  }
  forgetPassword = async () => {

    if (this.vaildateDetails()) {
      if (this.state.isInternet) {
        this.setState({ isLoading: true })
        let errorMessage = '';
        let that = this;
        Keyboard.dismiss();
        let header = {
          'Content-Type': 'application/json',
        };

        await RequestManager.postRequest(
          api.FORGETPASSWORD,
          {
            email: this.state.email,
          },
          header,
        )
          .then(function (response: any) {
            that.setState({ isLoading: false, email: '' })
            that.props.navigation.navigate('Otp', {
              id: response.data.id,
            });

          })
          .catch(function (error: any) {
            Toast.show( JSON.stringify(error.error.data.message), Toast.SHORT);
            that.setState({ isLoading: false, email: '' })
          });
      }
      else {
        Toast.show('Internet not Working');
      }
    }
  };

  private vaildateDetails() {
    if (this.state.email.length <= 0) {
      Toast.show('Please enter email.', Toast.SHORT);
      this.setState({ isLoading: false })
      return false;
    } else if (!validator.isEmail(this.state.email)) {
      Toast.show('Please enter valid email.', Toast.SHORT);
      this.setState({ isLoading: false })
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
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
            
          <View style={style.mainVw}>
            <Text style={style.createTx}>{'FORGOT PASSWORD'}</Text>
            <Text style={style.orTx}>
              {'Please Enter your registered email id'}
            </Text>
            <Text style={style.verificationTx}>
              {'We will send a verification code to your registered email id.'}
            </Text>
            <View style={style.inputVw}>
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
                onKeyPress={()=>{  
                }}
                autoCapitalize={'none'}
              />
            </View>
            <TouchableOpacity
              style={style.saveBt}
              onPress={() => this.forgetPassword()}>
              <Text style={style.saveTx}>{'NEXT'}</Text>
            </TouchableOpacity>
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
        </KeyboardAvoidingView>
        
        
      </SafeAreaView>
    );
  }
}
export default ForgetPassword;
