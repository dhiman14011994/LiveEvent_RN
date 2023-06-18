import React, { Component } from 'react';
import { View, Animated, BackHandler, Alert } from 'react-native';
import Images from '../../Resources/Images';
import { style } from './style';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { saveLoginApi } from '../../Redux/Actions/LoginActions';
import * as navigation from '../../Navigation/NavigatorService';
import requestCameraAndAudioPermission from '../../Constants/Permission';
import { goBack } from '../../Navigation/NavigatorService';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  loginResponse: any;
  saveLoginData: any;
}

class Splash extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    isIcon: false,
    opacity: new Animated.Value(0),
  };

  isCurrentView = true;
  firstTimeLoaded = true;

  componentDidMount = () => {

    this.props.navigation.addListener('blur', (event: any) => {
      this.isCurrentView = false;
    });
    
    this.props.navigation.addListener('focus', (event: any) => {

      BackHandler.removeEventListener('hardwareBackPress', () => { return true });

      if (!this.firstTimeLoaded) {
        BackHandler.exitApp();
      }

      this.firstTimeLoaded = false;

      this.isCurrentView = true;
      NetInfo.addEventListener(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (state.isConnected === true) {

        }
        else {
          Toast.show('Internet not Working');
        }
      });
    });

    this.onLoad()
  }

  private checkUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem('loginData');
      console.log('value', value)

      if (value != null && value != '' && value != undefined) {
        setTimeout(() => {
          this.props.saveLoginData(JSON.parse(value));


          if (this.isCurrentView) {
            this.isCurrentView = false;
            this.props.navigation.navigate('HomeStackScreen');
          }
        }, 3000);
      }
      else {
        setTimeout(() => {
          requestCameraAndAudioPermission().then(() => {
            // this.props.navigation.navigate('');
            navigation.reset('Login')
            console.log('requested!');
          });

        }, 3000);
      }
    }
    catch (error) {
      Toast.show(error)
    }
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      //  console.log('finished',finished)
      this.checkUserSession();
    });

  };

  render() {
    return (
      <View style={style.container}>
        <Animated.Image
          source={Images.SPLASH_ICON}
          // onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 1],
                  }),
                },
              ],
            },
            style.image
          ]}
        />
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  console.log('here', state)
  return {
    loginResponse: state.LoginReducer.loginInfo.login,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    saveLoginData: (data: any) => dispatch(saveLoginApi(data))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
