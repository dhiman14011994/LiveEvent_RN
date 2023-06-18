/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Profiler} from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  Clipboard,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {NavigationScreenProp, NavigationActions} from 'react-navigation';
import {style} from './style';
import CustomCourseView from '../../Components/CustomCourseView';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import { TrendingModl } from '../../Modals/CategoryModl';
import { getCourseTrendingList } from '../../Redux/ReduxAPIHandler/CategoryAPis';
import { connect } from 'react-redux';
import { setFavourite } from '../../Redux/ReduxAPIHandler/CourseApis';
import * as navigation from '../../Navigation/NavigatorService';
export interface Props {
  navigation:  any;
  loginResponse: any
}


class Trending extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    isInternet: true,
    trendingData:[],
    isErrorData:false
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
    this.gettrendingWatching();
  }

  gettrendingWatching = async ()=>{
    try{
      if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){ 
    let data: TrendingModl[] = await getCourseTrendingList({token:this.props.loginResponse.token,type:2}) as TrendingModl[];
    this.setState({trendingData:data})
      }
    }
    catch(error){
      this.setState({isErrorData:true})
    }
  }
  onHitLike = async (item: any) => {
    console.log( 'item.favourite 142536',item)
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      let data = await setFavourite({
        token: this.props.loginResponse.token, data: {
          courseId: item.id,
          favourite: item.bookmark
        }
      });
      console.log( 'item.favourite 142536',item.favourite)
      console.log('item 142536',data)
      this.gettrendingWatching()
    }
    else {
      // Toast.show('Internet not Working');
    }
  }

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
        <NavigationHeader
          isMultiple={true}
          leftBtnActn={()=>  this.props.navigation.openDrawer() }
          btnImage={Images.menu_icon}
          rightImage={Images.user_icon}
          right2Image={Images.bell_icon}
          right2BtnActn={()=>this.props.navigation.navigate('Notification')}
          rightBtnActn={() =>this.props.navigation.navigate('Profile')}
        />
        </View>

        <View style={style.mainVw}>
          <Text style={style.allTx}>{'TRENDING'}</Text>
          {
          this.state.isInternet != true ?
            <View style={style.noDataVw}>
              <Text style={style.noDataTx} >{'Internet not Woking'}</Text>
            </View> :
            this.state.isErrorData ?
              <View style={style.noDataVw}>
                <Text style={style.noDataTx} >{'No data Found'}</Text>
              </View> :
          <FlatList
            style={style.allVw}
            data={this.state.trendingData}
            renderItem={({item,index}: any) => <CustomCourseView 
            item={item}
            isImage={null}
             isLesson = {false}
             playVideo={(data:any) => this.props.navigation.navigate('Player',{id:data.data._id})}
            index = {index}
            selectbookmark={(data:any) => this.onHitLike(data)}
            isViewImage={false}/>}
            keyExtractor={(item: any) => item.id}
          />
  }
        </View>
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
  return {};
}
export default connect(mapStateToProps,mapDispatchToProps)(Trending);
