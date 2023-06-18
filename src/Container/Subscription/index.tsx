/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,

} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp, } from 'react-navigation';
import { style } from './style';
import CustomSubsciptionView from '../../Components/CustomSubscriptionview';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { changePlan, cancelSubscription } from '../../Redux/ReduxAPIHandler/PaymentApis';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

export interface Props {
  navigation: any;
  userResponse: any;
  loginResponse: any
}

class Subscription extends React.Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    showLoader: false,
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
      AsyncStorage.setItem("ScreenName", "Subscription")
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


  //********************************* Change subscription **************************************************

  changeSubsci = async () => {
    try {
      let data: any = await cancelSubscription(this.props.userResponse.subscription_subscriptionId)
      this.setState({ showLoader: false })
    }
    catch (error) {
      Toast.show(error.error.data.message)
      this.setState({ showLoader: false })
    }
  }


  //********************************* Change plan **************************************************


  planChange = async () => {
    
    this.props.navigation.navigate('Pay', {
      id: this.props.userResponse.id,
      email: this.props.userResponse.email,
    })
  }


  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.openDrawer()}
            title={'MY SUBSCRIPTION'}
            btnImage={Images.menu_icon}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            right2BtnActn={() => this.props.navigation.navigate('Notification')}
            rightBtnActn={() => this.props.navigation.navigate('Profile')}
          />
        </View>
        <View style={style.mainVw}>
          <CustomSubsciptionView text1={'My Plan:'} text2={this.props.userResponse.subscription_planName + ' $' + this.props.userResponse.subscription_amount} />
          <CustomSubsciptionView
            text1={'Plan Start Date:'}
            text2={moment(this.props.userResponse.subscription_createdDate).format("DD MMMM yyyy")}
          />
          <CustomSubsciptionView
            text1={'Billing Cycle:'}
            text2={moment(this.props.userResponse.subscription_createdDate).format("DD MMMM yyyy") + ' - ' + moment(this.props.userResponse.subscription_expiryDate).format("DD MMMM yyyy")}
          />
          <CustomSubsciptionView
            text1={'Saved Card For Billing:'}
            text2={'XXXX XXXX XXXX 1234'}
          />
          <View style={style.addCardVw}>
            <TouchableOpacity
              style={style.addCardBt}
            >
              <Text style={style.textCard} onPress={() => this.setState({ showLoader: true })}>{'Cancel Subscription'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.deleteCardBt} onPress={() => this.planChange()}>
              <Text style={style.textCard}>{'Change Plan'}</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animated={true}
            animationType={'fade'}
            transparent={true}
            visible={this.state.showLoader}>
            <View style={style.popupView}>
              <View style={style.cancelVw}>
                <Text style={style.cancelTx}>{'Cancel Subscription'}</Text>
                <Text style={style.subTx}>
                  {
                    '"Your subscription will be cancelled for next billing cycle. You may continue using the platform until your current subscription end date. Your card will not be charged for next payment"'
                  }
                </Text>
                
                <TouchableOpacity
                  style={style.confirmBt}
                  onPress={() => this.changeSubsci()}>
                  <Text style={style.saveTx}>{'CONFIRM'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.confirmBt}
                  onPress={() => this.setState({ showLoader: false })}>
                  <Text style={style.saveTx}>{'CANCEL'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
        <TouchableOpacity
          style={style.saveBt}
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Text style={style.saveTx}>{'SAVE'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,
    userResponse: state.LoginReducer.userInfo.userData,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
