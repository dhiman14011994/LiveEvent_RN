/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp } from 'react-navigation';
import { style } from './style';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import { connect } from 'react-redux';
import { getDetailscard } from '../../Redux/ReduxAPIHandler/PaymentApis';
import RequestManager from '../../APIManager';
import api from '../../Resources/APIs';
export interface Props {
  navigation: any;
  userResponse: any;
  loginResponse: any;
}

let header = {
  'Content-Type': 'application/json',
};

class Payment extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    isInternet: true,
    cardNo: '',
    cardDetails: [],
    paymentId: '',
    last4: '',
    showPayment: false,
    index:'',

  }
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
      this.getCardDetails()
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
      this.setState({ isLoading: false, email: '', password: '' });


    });
    this.getCardDetails()

    
  }


  //*************************************** Get Card Details **************************************** */
  getCardDetails = () => {
    fetch('https://api.stripe.com/v1/payment_methods?customer=' + this.props.userResponse.subscription_customerId + '&type=card', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + 'sk_test_nM9JhyAFI3cpv0BFC5wLjt8L'
      }
    }).then(response => {
      return response.json()
    }).then(result => {
      console.log("Stripe result>>>>", result)
      this.setState({ ...this.state, cardNo: result.data[0].card.last4, cardDetails: result.data })
      if (result.error) {
      } else {
      }
    }).catch(err => {
      console.log("Stripe err>>>>", err)
      // Toast.show(err.message,Toast.SHORT)
    })


  }

  //*************************************** Delete Card **************************************** */
  deleteCard = async () => {
    await RequestManager.postRequest(
      api.DELETECARD,
      {
        paymentId: this.state.paymentId,
      },
      header,
    )
      .then((res) => {
        // this.getCardDetails()
        let cardData=[]
        cardData=this.state.cardDetails
        cardData.splice(Number(this.state.index),1)
        this.setState({ ...this.state, showPayment: false,cardDetails:cardData })
      }).catch((error) => {
        console.log('CREATE card error>>', error);
        this.setState({ ...this.state, showPayment: false })
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
            title={'PAYMENT'}
            btnImage={Images.menu_icon}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            right2BtnActn={() => this.props.navigation.navigate('Notification')}
            rightBtnActn={() => this.props.navigation.navigate('Profile')}
          />
        </View>
        <ScrollView
          style={style.scrollVw}
          showsVerticalScrollIndicator={false}
        />
        <View style={style.mainVw}>
          {this.state.cardDetails.length != 0 ? this.state.cardDetails.map((item: any,i:any) => (
            <TouchableOpacity activeOpacity={0.8} style={style.cardView} onPress={() => this.setState({ ...this.state, paymentId: item.id, showPayment: true, last4: item.card.last4,index:i })}>
              <Image source={Images.card} style={style.cardImg} />
              <Text style={style.cardTxt}>{'XXXX XXXX XXXX ' + item.card.last4}</Text>
              <Image source={Images.cross} style={style.deleteImg} />
            </TouchableOpacity>
          )
          ) : null}
          <TouchableOpacity
            style={style.saveBt}
            onPress={() => this.props.navigation.navigate('AddCard')}>
            <Text style={style.saveTx}>{'ADD CARD'}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.showPayment}>
          <View style={style.popupView}>
            <View style={style.cancelVw}>
              <Text style={style.cancelTx}>{'Delete Card'}</Text>
              <View style={[style.cardView1,{marginTop:'20%'}]} >
                <Image source={Images.card} style={style.cardImg} />
                <Text style={style.cardTxt1}>{'XXXX XXXX XXXX ' + this.state.last4}</Text>
              </View>
              <View style={style.buttomBtnVw}>
                <TouchableOpacity
                  style={style.confirmBt}
                  onPress={() => this.deleteCard()}>
                  <Text style={style.saveTx}>{'CONFIRM'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.confirmBt}
                  onPress={() => this.setState({ ...this.state, showPayment: false })}>
                  <Text style={style.saveTx}>{'CANCEL'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
