/* eslint-disable consistent-this */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp } from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
import RequestManager from '../../APIManager';
import api from '../../Resources/APIs';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import CustomPlanview from '../../Components/CustomPlanview';
import { createCustomer, getProductsList } from '../../Redux/ReduxAPIHandler/PaymentApis';
import { PlansModl } from '../../Modals/PaymentModl';
import { styles } from '../../Components/Header/style';
import {connect} from 'react-redux';
import {PaymentApi, saveLoginApi} from '../../Redux/Actions/LoginActions'
import {PaymentMod} from '../../Modals/PaymentModl'
import AsyncStorage from '@react-native-community/async-storage';
import { internetcheck } from '../../Constants/InternetCkeck';
import * as navigation from '../../Navigation/NavigatorService';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { getUserData } from '../../Redux/ReduxAPIHandler/UserAPis';
import firestore from '@react-native-firebase/firestore';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  route: any;
  paymentUser: any;
  paymentResponse: PaymentMod;
  saveLoginData: any;
  userResponse: any
}

class PlanPayment extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    name: '',
    month: '',
    cvv: '',
    number: '',
    isSelected: false,
    monthlyId: '',
    yearlyId: '',
    isactive: true,
    planAmount: '',
    yearAmount: '20',
    signupId: '',
    signupEmail: '',
    customerId: '',
    paymentMethodId: '',
    bothPlan: true,
    planData: [] as PlansModl[],
    planId: '',
    isLoading: false,
    isInternet: true,
    checkVal:false,
  };
  isCurrentView = false;
  

  componentDidMount() {   
    console.log('this.isCurrentViewpayment',this.isCurrentView)
    this.getStripeProducts();
    this.createCustomer();
    this.setCurrentScreen();
  }
  setCurrentScreen(){
    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ ...this.state,isInternet: res })
      }).catch((error) => {
        this.setState({ ...this.state,isInternet: error })
        Toast.show('Internet not Working');
      })
        this.isCurrentView = false;

    });
    this.props.navigation.addListener('focus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'PlanPayment') {
        internetcheck().then((res) => {
          console.log('internet check', res)
          this.setState({ ...this.state,isInternet: res })
        }).catch((error) => {
          this.setState({ ...this.state,isInternet: error })
          Toast.show('Internet not Working');
        })
        this.isCurrentView = true;
      }
    });
  }

  componentDidUpdate() {
    // console.log('SignUp data',this.props.route.params)
  }

  componentWillReceiveProps(props: any) {
    console.log('payment data',props.paymentResponse)
    this.setState({...this.state,isLoading: false})
   
    if(props.paymentResponse!=undefined){
      if(  props.paymentResponse.payment!=undefined){

        this.saveLoginInfo({data:props.paymentResponse.payment,type:'login'});
        this.setState({...this.state,isLoading: false})
      }
      else{
        this.setState({...this.state,isLoading: false})
      }
      
    }
    else{
      this.setState({...this.state,isLoading: false})
    }
  

  }
  private saveLoginInfo = async (response: any) => {
    try {
      if(response.type == 'login'){
        await AsyncStorage.setItem('loginData', JSON.stringify(response.data));
        const value = await AsyncStorage.getItem('loginData');
        console.log('payment data',response.data)
        this.setState({isLoading: false,name: '',
        month: '',
        cvv: '',
        number: ''})
        
        navigation.reset('HomeStackScreen');
        
        
        // 
         
      }
      else{
        console.log('response',response)
        this.setState({isLoading: false})
      }
      }
      
     catch (error) {
      Toast.show(error,Toast.SHORT);
      
    }
  };

  getStripeProducts = async () => {
    let data: PlansModl[] = await getProductsList() as PlansModl[];
    console.log('Resp: ', data)
    this.setState({
      planId: data[0].id.toString(),
      planData: data,
      planAmount:Number(data[0].amount)/100,
    });
  };

  private cardDateManager(isMonth: boolean, text: string) {
    let date = text;
    if (text.length == 2) {
      date = text + '/';
    }
    console.log('Date ', Number(date));
    this.setState({ month: date });
  }

  //payment method
  payNow = async () => {
    if (this.vaildateDetails()) {
      this.getPaymentid();
    }
  };

  private vaildateDetails() {
    if (this.state.name.length <= 0) {
      Toast.show('Please enter card holder name.',Toast.SHORT);
      return false;
    } else if (this.state.number.length <= 0) {
      Toast.show('Please enter card number.',Toast.SHORT);
      return false;
    } else if (this.state.month.length <= 0) {
      Toast.show('Please enter card exp month and year.',Toast.SHORT);
      return false;
    } else if (this.state.cvv.length <= 0) {
      Toast.show('Please enter card cvv number.',Toast.SHORT);
      return false;
    }
    return true;
  }

  //createCustomer api
  createCustomer = async () => {
    let errorMessage = '';
    let weak = this;
    let header = {
      'Content-Type': 'application/json',
    };
    if (this.props.route.params.id == undefined) {
      // console.log('id', this.props.route.params.id);
      let params = { userId: this.props.userResponse.id };
      let id: any = await createCustomer(params);
      console.log('customerId',id)
      weak.setState({ customerId: id.toString() });
    } else {
      let params = { userId: this.props.route.params.id };
      let id: any = await createCustomer(params);
      console.log('customerId',id)
      weak.setState({ customerId: id.toString() });
    }
  };

  getPaymentid = async () => {
    let errorMessage = '';
    let weakSelf = this;
    let header = {
      'Content-Type': 'application/json',
    };
    await RequestManager.postRequest(
      api.CREATEPAYMENTMETHOD,
      {
        paymentType: 'card',
        cardNumber: this.state.number,
        expiryMonth: Number(this.state.month.split('/')[0]),
        expiryYear: Number(this.state.month.split('/')[1]),
        cvc: this.state.cvv,
      },
      header,
    )
      .then(function (response: any) {
        console.log('CREATECUSTOMER>>', response);
        weakSelf.managePayment(response);
      })
      .catch(function (error: any) {
        console.log('Error:',error)
        Toast.show( error.error.data.message,Toast.SHORT);
      });
  };

  private managePayment(response: any) {
    if (response.status == 'Not Finished') {
      setTimeout(function () {
        Toast.show(
          'Your profile is in process of moderation.\nPlease get payment method id',Toast.SHORT
        );
      }, 100);
    } else {
      console.log('start111111>>', response.data.id);
      this.setState({ paymentMethodId: response.data.id.toString() });
      if (this.state.planId == '') {
        Toast.show('Please select the plan',Toast.SHORT);
      }
      this.createSubscription();
    }
  }

  createSubscription = async () => {
    if(this.props.route.params.email==undefined){
      Keyboard.dismiss();
      this.props.paymentUser({
        email: this.props.userResponse!=undefined?this.props.userResponse.email!=undefined?this.props.userResponse.email:'abc@gmail.com':'abc@gmail.com',
        customerId: this.state.customerId,
        subscriptionPlanId: this.state.planId,
        paymentMethodId: this.state.paymentMethodId,
      });
      this.setState({isLoading:true})

    }
    else{
      
      Keyboard.dismiss();
      this.props.paymentUser({
        email: this.props.route.params.email!=undefined?this.props.route.params.email:'abc@gmail.com',
        customerId: this.state.customerId,
        subscriptionPlanId: this.state.planId,
        paymentMethodId: this.state.paymentMethodId,
      });
      this.setState({isLoading:true})
    }
    

  
  };

  //Creating recommended workouts plan
  private renderPaymentTabs = (data: any) => {
    let item = data.item;
    return (
      <CustomPlanview item={item} isselect={true} setectdata={() => this.setState({ planId: item.id, planAmount: Number(item.amount)/100 })} id={this.state.planId} />
    )
  }

  //Managing spaces for card number
  private handlingCardNumber(number: string) {
    if (number.length < 20) {
      this.setState({
        number: number
          .replace(/\s?/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim(),
      });
    }
  }

  checkBoxHandler = () => {
    this.setState({
        ...this.state,
        checkVal: !this.state.checkVal
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
          leftBtnActn={() => this.props.navigation.goBack()}
          title={'PAYMENT'}
          btnImage={Images.backArrow}
          rightImage={null}
          right2Image={null}
          rightBtnActn={() => { }}
        />
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={style.mainVw}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={styles.tblVw}
              extraData={this.state}
              data={this.state.planData}
              renderItem={this.renderPaymentTabs}
              horizontal={true}
            />
            <View style={style.subVw}>
              <View style={style.cardVw}>
                <Image style={style.cardVwImg} source={Images.visa} />
                <Image style={style.cardVwImg} source={Images.master} />
                <Image style={style.cardVwImg} source={Images.american} />
              </View>
              <View style={style.inputVw}>
                <CustomTextInputView
                  height={48}
                  image={Images.user_icon}
                  value={this.state.name}
                  onchangeText={(text: any) => this.setState({ name: text })}
                  placeholder={'Card Holder Name'}
                  keyboardType={'default'}
                  onKeyPress={()=>{  
                  }}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={50}
                />
                <CustomTextInputView
                  height={48}
                  image={require('./Assets/cardIcon.png')}
                  value={this.state.number}
                  onchangeText={(text: any) => this.handlingCardNumber(text)}
                  onKeyPress={()=>{  
                  }}
                  placeholder={'Card Number'}
                  keyboardType={'numeric'}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={19}
                />
                <View style={style.cvvVw}>
                  <CustomTextInputView
                    height={48}
                    image={null}
                    value={this.state.month}
                    onchangeText={(text: string) =>
                      this.cardDateManager(true, text)
                    }
                    onKeyPress={()=>{  
                    }}
                    placeholder={'MM / YY'}
                    keyboardType={'numeric'}
                    secureTextEntry={false}
                    isCvv={true}
                    maxLength={5}
                    onEndEditing={() => {
                      this.setState({
                        month:
                          this.state.month.length == 1
                            ? 0 + this.state.month
                            : this.state.month,
                      });
                    }}
                  />
                  <CustomTextInputView
                    height={48}
                    image={null}
                    value={this.state.cvv}
                    onchangeText={(text: any) => this.setState({ cvv: text })}
                    placeholder={'CVV'}
                    keyboardType={'numeric'}
                    onKeyPress={()=>{  
                    }}
                    secureTextEntry={false}
                    isCvv={true}
                    maxLength={3}
                    onEndEditing={() => { }}
                  />
                </View>
              </View>
              <View style={style.checkboxContainer}>
              { 
                  <TouchableOpacity onPress={() => this.checkBoxHandler()} style={[style.checkBoxView,{ borderWidth:1 }]}>
                  {this.state.checkVal ?
                    <Image source={require('../../Resources/Assets/check.png')} style={style.checkImg} /> : null
                  }
                  
                </TouchableOpacity> 
           
                }
                <Text style={style.label}>
                  {'Saved card will be charged monthly for renewal.'}
                </Text>
              </View>
              <Text style={[style.allTx, { fontSize: 14, marginTop: 50 }]}>
                {'All Access Pass'}
              </Text>
              <Text style={[style.allTx, { fontSize: 14 }]}>
                {'TOTAL BILLED TODAY'}
              </Text>
              <Text style={[style.allTx, { fontSize: 27 }]}>
                {this.state.planAmount == ''
                  ? null
                  : '$ ' + this.state.planAmount}
              </Text>
              <TouchableOpacity
                style={style.saveBt}
                onPress={() => this.payNow()}>
                <Text style={style.saveTx}>{'PAY NOW'}</Text>
              </TouchableOpacity>
            </View>
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
function mapStateToProps(state: any) {
  console.log('state.LoginReducer.userInfo.userData111',state.LoginReducer.userInfo.userData)
  return {
    paymentResponse: state.LoginReducer.loginInfo,
    userResponse: state.LoginReducer.userInfo.userData,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    paymentUser: (data: any) => dispatch(PaymentApi(data)),
    saveLoginData: (data : any) => dispatch(saveLoginApi(data))
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanPayment);
