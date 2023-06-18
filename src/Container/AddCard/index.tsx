/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import RequestManager from '../../APIManager';
import api from '../../Resources/APIs';
import * as navigation from '../../Navigation/NavigatorService';
import { styles } from '../../Components/Header/style';
export interface Props {
  navigation: any;
  userResponse: any;
  loginResponse: any;
}
let header = {
  'Content-Type': 'application/json',
};
// const stripe = require('stripe')('sk_test_nM9JhyAFI3cpv0BFC5wLjt8L');

class AddCard extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    value: '',
    month: '',
    cvv: '',
    number: '',
    isSelected: true,
    isLoading:false,
    backSpacePress:false
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

  private vaildateDetails() {
    if (this.state.value.length <= 0) {
      Toast.show('Please enter card holder name.',Toast.SHORT);
      return false;
    } else if (this.state.number.length <= 0) {
      Toast.show('Please enter card number.',Toast.SHORT);
      return false;
    } else if (this.state.month.length <= 0) {
      Toast.show('Please enter card  month and year.',Toast.SHORT);
      return false;
    } else if (this.state.cvv.length <= 0) {
      Toast.show('Please enter card cvv number.',Toast.SHORT);
      return false;
    }
    return true;
  }

  addCardData = async () => {

    if (this.vaildateDetails()) {
this.setState({...this.state,isLoading:true})
    let errorMessage = '';
    let that = this;
   try{

   
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
      .then(async function (response: any) {
        console.log('CREATECUSTOMER>>', response);

        await RequestManager.postRequest(
          api.ADDCARD,
          {
            paymentId: response.data.id,
            customerId: that.props.userResponse.subscription_customerId
          },
          header,
        )
        .then((res)=>{
          console.log('CREATE card>>', res);
          that.setState({
                    ...that.state,
                    value: '',
                    month: '',
                    cvv: '',
                    number: '',
                    isLoading:false
                  })
                  that.props.navigation.navigate('Payment')
        }).catch((error)=>{
          console.log('CREATE card error>>', error);
          that.setState({
            ...that.state,
            value: '',
            month: '',
            cvv: '',
            number: '',
            isLoading:false
          })
        })


        
      })
    }
    catch(error){
      console.log('CREATE card error>>', error);
      Toast.show(error.error.data.message)
      that.setState({
        ...that.state,
        value: '',
        month: '',
        cvv: '',
        number: '',
        isLoading:false
      })
    }
    }

    

  }






  private cardDateManager(isMonth: boolean, text: string) {
    const { backSpacePress} = this.state
if(backSpacePress == false){
  let lastIndex=text.charAt(text.length-1)
    let date = text;
    if(lastIndex=='/'){
      date = text.slice(0,2)
      // this.setState({ month: date });
      // 
    }
    else{
      
      if (text.length == 2) {
        
        date = text + '/';
      }
    }
   
    
    // else{
    //   date=text
    // }
    // if(text.length == 3){
    //   date = (text.slice(0,2))+'/';
    // }
     this.setState({ month: date });}
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

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const month_ = this.state.month.length <= 1 ? this.state.month : `${this.state.month.slice(0,2)}${this.state.month.length > 2 ? "/" : ''}${this.state.month.slice(3,5)}`
console.log(this.state.month.length)
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.openDrawer()}
            title={'ADD CARD'}
            btnImage={Images.menu_icon}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            rightBtnActn={() => navigation.reset('Profile')}
          />
        </View>
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
          <View style={style.mainVw}>
            <View style={style.cardVw}>
              <Image style={style.cardVwImg} source={Images.visa} />
              <Image style={style.cardVwImg} source={Images.master} />
              <Image style={style.cardVwImg} source={Images.american} />
            </View>
            <View style={style.inputVw}>
              <CustomTextInputView
                height={48}
                image={Images.user_icon}
                value={this.state.value}
                onchangeText={(text: any) => this.setState({ value: text })}
                placeholder={'Card Holder Name'}
                keyboardType={'default'}
                secureTextEntry={false}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={50}
                onKeyPress={()=>{  
                }}
                autoCapitalize={'words'}
              />
              <CustomTextInputView
                height={48}
                image={Images.user_icon}
                value={this.state.number}
                onchangeText={(text: any) => this.handlingCardNumber(text)}
                placeholder={'Card Number'}
                keyboardType={'numeric'}
                secureTextEntry={false}
                isCvv={false}
                onEndEditing={() => { }}
                maxLength={19}
                onKeyPress={()=>{  
                }}
                autoCapitalize={'words'}
              />
              <View style={style.cvvVw}>
                <CustomTextInputView

                  height={48}
                  image={null}
                  value={this.state.month}
                  onchangeText={(text: string) =>
                    this.cardDateManager(true, text)
                  }
                  autoCapitalize={'words'}
                  placeholder={'MM / YY'}
                  keyboardType={'numeric'}
                  secureTextEntry={false}
                  isCvv={true}
                  maxLength={5}
                  onKeyPress={(test:any)=>{
                   console.log("check back press >>> ", test._dispatchInstances.alternate.memoizedProps.text)
                   if(test.nativeEvent.key=='Backspace'){
                     this.setState({...this.state, backSpacePress : true})
                    let lastIndex=test._dispatchInstances.alternate.memoizedProps.text.charAt(test._dispatchInstances.alternate.memoizedProps.text.length-1)
                    console.log('here',this.state.month.length)
                    if(lastIndex=='/'){
                      let data=test._dispatchInstances.alternate.memoizedProps.text.slice(0,2)
                      this.setState({...this.state,month:data})
                      console.log('here',data)
                    }
                    else{
                      this.setState({...this.state,month:test._dispatchInstances.alternate.memoizedProps.text})
                    }

                   }
                   else{
                     let date=test._dispatchInstances.alternate.memoizedProps.text
                    if (test._dispatchInstances.alternate.memoizedProps.text.length == 2) {
        
                      date = test._dispatchInstances.alternate.memoizedProps.text + '/';
                    }
                    this.setState({...this.state, backSpacePress : false,month:test._dispatchInstances.alternate.memoizedProps.text})
                   }
                  }}
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
                  secureTextEntry={false}
                  isCvv={true}
                  maxLength={3}
                  onEndEditing={() => { }}
                  onKeyPress={()=>{  
                  }}
                  autoCapitalize={'words'}
                />
              </View>
            </View>
            <View style={style.empVw}/>
            <TouchableOpacity
              style={style.saveBt}
              onPress={() => this.addCardData()}>
              <Text style={style.saveTx}>{'SAVE'}</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isLoading}>
          <View style={style.popupView}>
            {this.state.isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : null}

          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {
  console.log('hersesed', state.LoginReducer.loginInfo.login.data)
  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,
    userResponse: state.LoginReducer.userInfo.userData,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
