/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { NavigationScreenProp, } from 'react-navigation';
import { style } from './style';
import CustomCourseView from '../../Components/CustomCourseView';
import { AllCourseModl } from '../../Modals/CourseModl';
import { connect } from 'react-redux';
import { getAllCourse, setFavourite } from '../../Redux/ReduxAPIHandler/CourseApis';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import { WatchingModl } from '../../Modals/CategoryModl';
import { getCourseWatchingList } from '../../Redux/ReduxAPIHandler/CategoryAPis';
import * as navigation from '../../Navigation/NavigatorService';
export interface Props {
  navigation: any;
  loginResponse: any;
}

class AllCourse extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state = {
    allData: [],
    isInternet: true,
    isErrorData:false
  }

  componentDidMount() {
    this.getAllCourseData();
    console.log('this.props.loginResponse.token', this.props.loginResponse);
    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        // console.error('error internet check',error)
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
        this.setState({ isLoading: false, });
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
      this.setState({ isLoading: false, });

    });
  }



  getAllCourseData = async () => {
    try {
      if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      let data: WatchingModl[] = await getCourseWatchingList({token:this.props.loginResponse.token,type:1}) as WatchingModl[];
      this.setState({allData:data})
      }
    }
    catch (error) {
      this.setState({isErrorData:true,isLoading: false})
    }
    

  }
  onHitLike = async (item: any) => {
    console.log( 'item.favourite 142536',item)
    if (this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined) {
      let data = await setFavourite({
        token: this.props.loginResponse.token, data: {
          courseId: item.id,
          favourite: item.bookmark
        }
      });
      console.log( 'item.favourite 142536',item.favourite)
      console.log('item 142536',data)
      this.getAllCourseData()
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
            title={''}
            isMultiple={true}
            leftBtnActn={() => this.props.navigation.openDrawer()}
            btnImage={Images.menu_icon}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            right2BtnActn={()=>this.props.navigation.navigate('Notification')}
            rightBtnActn={() => this.props.navigation.navigate('Profile')}
          />
        </View>
        {
                   this.state.isInternet!=true? 
                    <View style={style.noDataVw}>
                        <Text style={style.noDataTx} >{'Internet not Woking'}</Text>
                    </View>:
                    this.state.isErrorData?
                    <View style={style.noDataVw}>
                        <Text style={style.noDataTx} >{'No data Found'}</Text>
                    </View>:
        <View style={style.mainVw}>
          <Text style={style.allTx}>{'ALL COURSES'}</Text>
          <FlatList
            style={style.allVw}
            data={this.state.allData}
            renderItem={({ item, index }: any) => <CustomCourseView
              isImage={null}
              isLesson={false}
              playVideo={(data:any) => this.props.navigation.navigate('Player',{id:data.data._id})}
              index={index}
              istime={true}
              selectbookmark={(data:any) => this.onHitLike(data)}
              item={item}
              isViewImage={false}
              dataIndex={null} />}
              keyExtractor={(item: any) => item.id}
          />
        </View>
  }
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {
  console.log('here', state.LoginReducer.loginInfo)
  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCourse);
