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
  ActivityIndicator
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


export interface Props {
  navigation: NavigationScreenProp<any, any>;
  route: any;
}

class ChangePassword extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    password: '',
    confirmPassword: '',
    isSelected: false,
    isLoading: false,
    isInternet: true,
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
              id: this.props.route.params.id,
              password: this.state.password,
            },
            header,
          )
            .then(function (response: any) {
              that.setState({
                isLoading: false, password: '',
                confirmPassword: '',
              })
              that.props.navigation.navigate('Successful');

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

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.goBack()}
            btnImage={Images.backArrow}
            title={''}
            rightBtnActn={() => { }}
          />
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          // flexGrow={1}
          enableAutomaticScroll={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={style.mainVw}>
            <Text style={style.createTx}>{'CHANGE PASSWORD'}</Text>
            <Text style={style.orTx}>{'Please Enter a new password'}</Text>
            <View style={style.inputVw}>
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
                onKeyPress={() => { }}
                autoCapitalize={'words'}
              />
              <CustomTextInputView
                height={48}
                image={Images.lock}
                value={this.state.confirmPassword}
                onchangeText={(text: any) =>
                  this.setState({ confirmPassword: text })
                }
                placeholder={'Re-enter Password'}
                keyboardType={'default'}
                secureTextEntry={true}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={() => {}}
                autoCapitalize={'words'}
              />
            </View>
            <View style={{ height: '30%' }} />
            <TouchableOpacity
              style={style.saveBt}
              onPress={() => this.changePassword()}>
              <Text style={style.saveTx}>{'CONFIRM'}</Text>
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
      </SafeAreaView>
    );
  }
}

export default ChangePassword;
