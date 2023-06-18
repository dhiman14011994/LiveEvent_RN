/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp } from 'react-navigation';
import { style } from './style';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { saveLoginApi } from '../../Redux/Actions/LoginActions';
import * as navigation from '../../Navigation/NavigatorService';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
//  import {end} from '../JoinCall/index'

export interface Props {
  navigation: any;
  saveLoginData: any;
  userResponse: any;
  loginResponse: any;
}

class Profile extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    isInternet: true,
    id: '',
    eventname: '',
    role:''
  };
  async componentDidMount() {
    await AsyncStorage.multiGet(['loginId', 'eventId','loginData']).then((res: any) => {
      let data=JSON.parse(res[2][1])
      // console.log('moderator data',data.data.role)
      if(data!=undefined){
        this.setState({ ...this.state, id: res[0][1], eventname: res[1][1], role: data.data!=undefined && data.data.role!=undefined?data.data.role:'' })
      }
     
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
      AsyncStorage.setItem("ScreenName", "Profile")
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

  //Render setting dark text views
  renderDarkTextVw(image: any, index: any, title: string) {
    return (
      <View>
        <TouchableOpacity
          style={style.settingBtn}
          activeOpacity={0.8}
          onPress={() => this.handleTap(index)}>
          <Image source={image} style={style.settingImg} />
          <Text style={style.settingTxt}>{title}</Text>
        </TouchableOpacity>
        <View style={[style.borderVw, { height: 1 }]} />
      </View>
    );
  }

  private handleTap(index: any) {
    switch (index) {
      case 1:
        this.props.navigation.navigate('MyProfile');
        break;

      case 2:
        this.props.navigation.navigate('Subscription');
        break;

      case 3:
        this.props.navigation.navigate('Payment');
        break;

      case 5:
        this.props.navigation.navigate('UserChangePassword');
        break;

      case 7:
        //this.props.navigation.navigate('Help');
        break;

      case 8:
        this.logoutBtn();
        break;

      default:
        break;
    }
  }

  //Logout action
  private logoutBtn() {
    Alert.alert(
      'Do you want to Log Out?',
      '',
      [
        {
          text: 'NO',
          onPress: () => { },
        },
        {
          text: 'YES',
          onPress: () => this.logout(),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }

  private async logout() {
    if (this.state.id == null && this.state.id == '') {
      await AsyncStorage.setItem('loginData', '')
      await AsyncStorage.setItem('guestData','')
      this.props.saveLoginData('');
      navigation.reset('Login')
    }
    else {
      if(this.props.loginResponse!=undefined||this.props.loginResponse.role != undefined){
        if(this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator'){
          firestore().collection('eventUser').doc(this.state.id).update({
            eventId:''
          })
          await AsyncStorage.setItem('loginData', '')
                  this.props.saveLoginData('');
                  navigation.reset('Login')
        }
        else{

        
      firestore().collection('liveTalks').doc(this.state.eventname).get().then(async (onResult: any) => {
        if (onResult.data() == undefined) {
          await AsyncStorage.setItem('loginData', '')
          this.props.saveLoginData('');
          navigation.reset('Login')
        }
        else {
          if (onResult.data().participants != undefined) {

            let deleteUser: any = await onResult.data().participants
            let deteteModerator: any = await onResult.data().moderators
      
            let index = deleteUser.indexOf(this.state.id)
           

            if (index == -1 ) {
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
                  .doc(this.state.eventname)
                  .update({
                    participants: deleteUser
                  })
                  .then(async (res) => {
                    console.log('update data')
                    // Alert.alert('End')
                    firestore().collection('eventUser').doc(this.state.id).update({
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
  }
    }
  }
  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const fName = this.props.userResponse != undefined && this.props.userResponse.name != undefined ? this.props.userResponse.name : 'Username';
    const lName = this.props.userResponse != undefined && this.props.userResponse.lastName != undefined ? this.props.userResponse.lastName : ''
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.goBack()}
            title={'PROFILE'}
            btnImage={Images.backArrow}
            rightImage={Images.bell_icon}
            right2BtnActn={() => {}}
            // right2Image={Images.bell_icon}
            rightBtnActn={() => { this.props.navigation.navigate('Notification') }}
          />
        </View>
        <ScrollView
          style={style.scrollVw}
          showsVerticalScrollIndicator={false}
        />
        <View style={style.mainVw}>
          <Image source={ this.props.userResponse != undefined && this.props.userResponse.image != undefined && this.props.userResponse.image != '' ? { uri: this.props.userResponse.image } : Images.placeholder_circle} style={style.profileImg} />
          <Text style={style.userTx}>{fName + ' ' + lName}</Text>
          <View style={style.optnCntnr}>
            {this.renderDarkTextVw(Images.user, 1, 'My Profile')}
            {this.state.role=='moderator'?null:this.renderDarkTextVw(Images.dollarsign, 2, 'My Subscription')}
            {this.state.role=='moderator'?null:this.renderDarkTextVw(Images.payment, 3, 'Payment')}
            {this.renderDarkTextVw(Images.password, 5, 'Change Password')}
            {this.renderDarkTextVw(Images.help_center, 7, 'Help Center')}
            {this.renderDarkTextVw(Images.power, 8, 'Sign Out')}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  console.log('hersesed', state.LoginReducer.userInfo.userData)
  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,
    userResponse: state.LoginReducer.userInfo.userData,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    saveLoginData: (data: any) => dispatch(saveLoginApi(data))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
