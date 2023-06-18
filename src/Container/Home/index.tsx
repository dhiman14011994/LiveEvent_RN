/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  StatusBar,
  BackHandler,
  DeviceEventEmitter
} from 'react-native';
import { style } from './style';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import AppIntroSlider from 'react-native-app-intro-slider';
import Videoview from '../../Components/Videoview';
import FlatListView from '../../Components/FlatListView';
import ViewFlatList from '../../Components/ViewFlatList';
import { CategoryModl, FeatureModl, TrendingModl, WatchingModl } from '../../Modals/CategoryModl'
import { getCourseFeatureList, getCourseTrendingList, getCourseWatching, getCourseWatchingList, getPopularTopicList } from '../../Redux/ReduxAPIHandler/CategoryAPis';
import { connect } from 'react-redux';
import { setFavourite } from '../../Redux/ReduxAPIHandler/CourseApis';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import { NoInternetFoundView } from '../../Components/CustomComponent';
import { fcmService } from '../../Constants/Firebase/FCMService';
import { localNotificationservice } from '../../Constants/Firebase/LocalNotificationService';
import messaging from '@react-native-firebase/messaging';
import { getFirebaseToken, registerHandler } from '../../Constants/FCMTOKEN';
import AsyncStorage from '@react-native-community/async-storage';
import { userDataApi } from '../../Redux/Actions/UserActions';
import color from '../../Resources/Colors';
import { goBack } from '../../Navigation/NavigatorService';
import * as navigation from '../../Navigation/NavigatorService';


export interface Props {
  navigation: any;
  loginResponse: any;
  currentUser: any;
}


class Home extends Component<Props> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    popularData: [] as CategoryModl[],
    featureData: [] as FeatureModl[],
    watchingData: [] as WatchingModl[],
    trendingData: [] as TrendingModl[],
    releasesingData: [] as WatchingModl[],
    trendingData11:[],
    popular: [],
    isLoading: false,
    isView: false,
    isInternet: true,
    isErrorData: false,
    isErrorCW: false,
    isErrorTr: false,
    isErrorNr: false,
    isErrorPt: false,
    isShowMore: false,
    role: '',
    isJoin: false,
  }

  _keyExtractor = (item: any) => item.title;

  componentDidMount = async () => {
    
    this.setState({ ...this.state, isLoading: true });
    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {

        this.setState({ isInternet: false })
        // Toast.show('Internet not Working');
      })
    })

    this.props.navigation.addListener('focus', (event: any) => {
      this.checkuser()
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })

        // Toast.show('Internet not Working');
      })

      AsyncStorage.setItem("ScreenName", "Home")
    });
    this.getFeatureData();
    this.getPopularTopics();
    this.getcontinueWatching();
    this.gettrendingWatching();
    this.getreleasesingWatching();
    this.getUserData()

    this.registerHandler();
    // this.notificationSetup();
    getFirebaseToken().then((data) => {
      console.log('get Firebase token', data)
    })
      .catch(error => {
        console.log('get Firebase token error', error)
        // this.setState({ isLoading: false,});
      })
  }

  checkuser=()=>{
    AsyncStorage.getItem('loginData').then((res: any) => {
      let data = JSON.parse(res)
      if(data.role=='guest'){
        this.setState({ ...this.state, role: data.role, isLoading: false,isJoin:true })
      }
      else{
        this.setState({ ...this.state, role: data.role,  })
      }
      
      
    })
  }

  componentWillMount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    goBack();
    return true;
  }

  // ************************************************* Get User Data ***************************************************************

  getUserData = () => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      AsyncStorage.getItem('loginId').then((res) => {
        console.log('currentuserId', res)
        this.props.currentUser({ token: this.props.loginResponse.token, id: res })
      })
    }

  }


  // ****************************************************************************************************************

  notificationSetup = async () => {
    const tokenPush = await messaging().getToken();
    console.log('tokenPush', tokenPush)
  }

  registerHandler() {
    fcmService.registerAppWithFCM();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );

    localNotificationservice.temp();
    localNotificationservice.configure(this.onOpenNotification);
  };

  onRegister = (token: any) => {
  };

  onNotification = (notify: any) => {
    console.log('[App] On Notifications: ', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };

    localNotificationservice.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    );
  };

  onOpenNotification = (notificationOpen: any) => {
    console.log('[App] On Open Notifications: ', notificationOpen);
    console.log(
      'message Listener called notificationOpen >>>>>>>',
      notificationOpen,
    );
  };

  /**
   * @function manageRedirection() function used for redirection navigation
   */
  manageRedirection() {
    this.props.navigation.navigate('Notification', { type: 1 });
  }

  getFeatureData = async () => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      try {
        let data: FeatureModl[] = await getCourseFeatureList(this.props.loginResponse.token) as FeatureModl[];
        this.setState({ featureData: data })
      }
      catch (error) {
        if (error != undefined && error != '' && error != null) {
          // Toast.show('No data found ')
          this.setState({ isErrorData: true, isLoading: false })
        }
        else {
          this.setState({ isErrorData: true, isLoading: false })
        }
      }
    }
  }

  getPopularTopics = async () => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      try {
        let data: CategoryModl[] = await getPopularTopicList() as CategoryModl[];
        if (data.length >= 6) {
          let feature = [];
          for (let i = 0; i < 6; i++) {
            feature.push(data[i])
          }
          this.setState({ popularData: data, popular: feature, isLoading: false })
        }
        else {
          this.setState({ popularData: data, isLoading: false })
        }
      }
      catch (error) {
        if (error != undefined && error != '' && error != null) {
          // Toast.show('No data found ')
          this.setState({ isErrorPt: true, isLoading: false })
        }
        else {
          this.setState({ isErrorPt: true, isLoading: false })
        }
      }


    }
    else {
      this.setState({ isLoading: false, });
    }

  }

  getcontinueWatching = async () => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      try {
        let data: WatchingModl[] = await getCourseWatching({ token: this.props.loginResponse.token, type: 1 }) as WatchingModl[];
        if (data == null) {
          this.setState({ watchingData: [] })
        }
        else {
          // console.log('getCourseWatching>>>>>>>>>', data)
          this.setState({ watchingData: data })
        }
      }
      catch (error) {
        if (error != undefined && error != '' && error != null) {
          console.log('error data continue watching', JSON.stringify(error))
          // Toast.show('No data found ')
          this.setState({ isErrorCW: true })
        }
        else {

          this.setState({ isErrorCW: true })
        }
      }
    }
  }

  gettrendingWatching = async () => {

    try {
      if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      let data: TrendingModl[] = await getCourseTrendingList({ token: this.props.loginResponse.token, type: 2 }) as TrendingModl[];
      //  console.log('TrendingModl123456',data)
      this.setState({ ...this.state,trendingData: data,trendingData11:data })
      }
      // this.setState({ isErrorTr: true })
    }

    catch (error) {
      if (error != undefined && error != '' && error != null) {
        // Toast.show('No data found ')
        this.setState({ isErrorTr: true })
      }
      else {
        this.setState({ isErrorTr: true })
      }
    }
  }

  getreleasesingWatching = async () => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      try {
        let data = await getCourseWatchingList({ token: this.props.loginResponse.token, type: 3 });
        this.setState({ releasesingData: data })
        // console.log('getreleasesingWatching data123', data)
      }
      catch (error) {
        if (error != undefined && error != '' && error != null) {

          this.setState({ isErrorNr: true })
        }
        else {
          this.setState({ isErrorNr: true })
        }


      }
    }
  }

  openMenu = () => {

  }

  onHitLike = async (item: any) => {
    // console.log('item  onHitLike', item)
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      let data = await setFavourite({
        token: this.props.loginResponse.token, data: {
          courseId: item._id,
          favourite: item.favourite != undefined &&
            item.favourite != [] ?
            item.favourite[0] != undefined ?
              item.favourite[0].favourite != undefined ?
                item.favourite[0].favourite ?
                  false :
                  true :
                item.favourite ?
                  false :
                  true :
              item.favourite.favourite != undefined ? item.favourite.favourite ? false : true :
                true :
            true

        }
      });
      console.log('item.favourite 142536', item)
      console.log('item 142536', data)
      this.getcontinueWatching();
      this.gettrendingWatching();
      this.getreleasesingWatching();
    }
    else {

    }
  }







  playvideo = (data: any) => {
    AsyncStorage.setItem('courseId', data)
    this.props.navigation.navigate('Player', { id: data, continueWatching: '0' })
  }

  render(): JSX.Element {
    

    return (

      !this.state.isInternet ? <NoInternetFoundView func={() => {
        this.getFeatureData();
        this.getPopularTopics();
        this.getcontinueWatching();
        this.gettrendingWatching();
        this.getreleasesingWatching();
        this.getUserData()
      }} />
        :
        <SafeAreaView style={style.container}>
          <StatusBar backgroundColor={color.APP_Splash_BG_COLOR2}></StatusBar>
          <View style={style.headerVw}>
            <NavigationHeader
              isMultiple={true}
              leftBtnActn={() => this.state.role != 'guest' ? this.props.navigation.openDrawer() : {}}
              btnImage={Images.menu_icon}
              title={''}
              right2BtnActn={() => this.state.role != 'guest' ? this.props.navigation.navigate('Notification') : {}}
              rightImage={Images.user_icon}
              right2Image={Images.bell_icon}
              rightBtnActn={() => this.state.role != 'guest' ? this.props.navigation.navigate('Profile') : {}}
            />
          </View>

          {!this.state.isInternet ?
            <View style={style.noDataVw}>
              <Text style={style.noDataTx} >{'Internet not Woking'}</Text>
            </View> :
            this.state.isErrorData ?
              <View style={style.noDataVw}>
                <Text style={style.noDataTx} >{'No data Found'}</Text>
              </View> :
              this.state.role != 'guest' ?

                <ScrollView style={style.scrollVw} showsVerticalScrollIndicator={false}>



                  <AppIntroSlider
                    keyExtractor={this._keyExtractor}
                    dotStyle={style.dotStyle}
                    activeDotStyle={style.activeDotStyle}
                    renderItem={({ item }: any) => <Videoview
                      item={item}
                      onPress={(id: any) => this.playvideo(id)} />}
                    data={this.state.featureData}
                    showDoneButton={false}
                    showNextButton={false}
                  />
                  {this.state.watchingData.length != 0 ?
                    <View style={[style.commonVw,]}>
                      <Text style={style.txtcommon}>{'CONTINUE WATCHING'}</Text>
                    </View> :
                    null
                  }
                  {
                    this.state.isErrorCW ? null

                      :
                      this.state.watchingData.length != 0 ?
                        <FlatList
                          style={{ marginTop: 10 }}
                          data={this.state.watchingData}
                          renderItem={({ item }: any) =>
                            <FlatListView
                              onHitLike={() => this.onHitLike(item)}
                              item={item}
                              text={false}
                              onPress={(id: any) => this.props.navigation.navigate('Player', { id: id, continueWatching: '1' })}
                              isView={false}
                              isNew={false}
                              tempImg={Images.dummy}
                              isseek={true} />}
                          horizontal={true}
                        />
                        : null
                  }

                  <View style={style.commonVw}>
                    <Text style={style.txtcommon}>{'TRENDING'}</Text>
                  </View>
                  {
                    
                      
                      <FlatList
                        style={{ marginTop: 10 }}
                        data={this.state.trendingData11}
                        renderItem={({ item }: any) =>
                          <FlatListView
                            item={item}
                            onPress={(id: any) => this.props.navigation.navigate('Player', { id: id, continueWatching: '0' })}
                            onHitLike={() => this.onHitLike(item)}
                            isseek={false}
                            text={false}
                            isView={false}
                            tempImg={Images.dummy}
                            isNew={false} />}
                        horizontal={true}
                      />
                  }
                  <View style={style.commonVw}>
                    <Text style={style.txtcommon}>{'NEW RELEASES'}</Text>
                  </View>
                  {
                    this.state.isErrorNr ?
                      <View style={style.noDataVw}>
                        <Text style={style.noDataTx} >{'No data Found'}</Text>
                      </View> :
                      <FlatList
                        style={{ marginTop: 10, marginBottom: 20 }}
                        data={this.state.releasesingData}
                        renderItem={({ item }: any) => (
                          <FlatListView
                            isNew={true}
                            isseek={false}
                            onPress={(id: any) => this.props.navigation.navigate('Player', { id: id, continueWatching: '0' })}
                            item={item}
                            onHitLike={() => this.onHitLike(item)}
                            text={false}
                            isView={false}
                            tempImg={Images.dummy} />
                        )}
                        horizontal={true}
                      />
                  }
                  <View style={style.commonVw}>
                    <Text style={style.txtcommon}>{'POPULAR TOPICS'}</Text>
                  </View>
                  {
                    this.state.isErrorPt ?
                      <View style={style.noDataVw}>
                        <Text style={style.noDataTx} >{'No data Found'}</Text>
                      </View> :
                      <FlatList
                        style={{ marginTop: 20, marginBottom: 20, }}
                        data={this.state.isShowMore ? this.state.popularData : this.state.popular}
                        renderItem={({ item }: any) => (
                          <ViewFlatList item={item} getData={(item:any)=>this.props.navigation.navigate('Categories',{id:item.id,title:item.category})} />
                        )}
                        horizontal={false}
                        numColumns={2}
                      />
                  }
                  {
                    this.state.popularData.length == this.state.popular.length ? null :
                      <TouchableOpacity style={style.moreVw} onPress={() => this.setState({ isShowMore: !this.state.isShowMore })}>
                        <Text style={style.moreTx}>{this.state.isShowMore ? 'Show Less' : 'Show more'}</Text>
                        <Image style={style.moreImg} source={this.state.isShowMore ? Images.uparrow : Images.downarrow} />
                      </TouchableOpacity>
                  }
                </ScrollView> :
                <View style={style.noDataVw}/>
                 
               
          }
          <Modal
            animated={true}
            animationType={'fade'}
            transparent={true}
            visible={this.state.isLoading}>
            <View style={style.popupView}>
              {this.state.isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : null}

            </View>
          </Modal>


          <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isJoin}>
          <View style={style.permissionMainVw}>
            <View style={style.permissionMsgVw1}>
            <TouchableOpacity style={style.crossIcon} onPress={() => this.setState({ ...this.state, isViewUser: false,isJoin:false },()=>this.props.navigation.goBack())}>
                <Image style={style.crossIconImg} source={require('../LiveTalks/Assets/close.png')} />
              </TouchableOpacity>
              <Text style={style.InvTx}>{'Explore?'}</Text>
              <Text style={style.userNmTx}>{'Want to explore more of it? JOIN US Now!!'}</Text>
              
                <TouchableOpacity style={[style.permissionBtn1, { borderRadius: 15, marginLeft: '2%' }]} onPress={() => this.setState({...this.state,isJoin:false},()=>navigation.reset('Login'))}>
                  <Text style={style.btnTx}>{'JOIN NOW'}</Text>
                </TouchableOpacity>
              
            </View>
          </View>

        </Modal>
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
    currentUser: (data: any) => dispatch(userDataApi(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);