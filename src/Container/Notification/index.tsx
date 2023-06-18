import React from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { internetcheck } from '../../Constants/InternetCkeck';
import { style } from './style';
import Toast from 'react-native-simple-toast';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { connect } from 'react-redux';
import { getNotification } from '../../Redux/ReduxAPIHandler/UserAPis'
import moment from 'moment';
import * as navigation from '../../Navigation/NavigatorService';
import { ScrollView } from 'react-native-gesture-handler';
export interface Props {
  navigation: any;
  loginResponse: any
}

class Notification extends React.Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    isSelected: false,
    isInternet: true,
    notificationData: []
  };

  componentDidMount() {
    this.getNotificationData();

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
      AsyncStorage.setItem("ScreenName", "Chat")
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
    });
  }

  //************************************* Get Notification Data ************************************* 
  getNotificationData = async () => {
    if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {

      let data: any = await getNotification(this.props.loginResponse.token)
        .then(async (res: any) => {
          console.log('notification', res.data)
          let faqData = res.data
          //  var temp = []
          // let faqData= await res.data.sort(function(a:any,b:any){
          //   return new Date(b.createdDate) - new Date(a.createdDate);
          // });

          console.log('notification1233', faqData)
          let todayArr: any[] = [];
          let yesterdayArr: any[] = [];
          let restArr: any[] = [];

          for (let i = 0; i < faqData.length; i++) {
            let createdDate = faqData[i].createdDate;
            if (this.isToday(new Date(createdDate))) {
              todayArr.push(faqData[i]);
            } else if (this.isYesterDay(new Date(createdDate))) {
              yesterdayArr.push(faqData[i]);
            } else {
              restArr.push(faqData[i]);
            }
          }

          let allDateArr: any[] = [];

          todayArr.length > 0 && allDateArr.push({ title: "Today", data: todayArr });
          yesterdayArr.length > 0 && allDateArr.push({ title: "Yesterday", data: yesterdayArr });
          restArr.length > 0 && allDateArr.push({ title: "Others", data: restArr });

          console.log('notificationsfd111', allDateArr);
          //  console.log('notificationsfd22', short)
          this.setState({ ...this.state, notificationData: allDateArr })
        })
    }
  }

  isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
  }

  isYesterDay = (date: Date) => {
    const today = new Date()
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    return date.getDate() == yesterday.getDate() &&
      date.getMonth() == yesterday.getMonth() &&
      date.getFullYear() == yesterday.getFullYear()
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.goBack()}
            title={'NOTIFICATIONS'}
            btnImage={Images.backArrow}
            rightImage={Images.user_icon}
            right2BtnActn={() => {}}
            // right2Image={Images.bell_icon}
            rightBtnActn={() => {this.props.navigation.navigate('Profile') }}
          />
        </View>
        <ScrollView>
          {this.state.notificationData.map((res: any) =>
            <View>
              <View style={{
                flexDirection: 'row', alignItems: 'center', width: '70%',
                marginLeft: '15%',
                marginRight: '15%',
                marginTop: '5%',
                marginBottom: '5%',
              }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                <Text style={style.sectionTxt}>{res.title}</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
              </View>
              {res.data.map((res: any) =>
                <View style={style.notifyView}>
                  
                  <Text style={style.notifyTx}>{res.notification}</Text>
                  <Text style={[style.soonTxt, { textAlign: 'right' }]}>{moment(res.createdDate).format(" HH:MM a")}</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {

  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,

  };
}
function mapDispatchToProps(dispatch: any) {
  return {

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification);
