/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Profiler} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import {NavigationScreenProp, NavigationActions} from 'react-navigation';
import {style} from './style';
import CustomCourseView from '../../Components/CustomCourseView';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import { AllCourseModl } from '../../Modals/CourseModl';
import { getAllCourse } from '../../Redux/ReduxAPIHandler/CourseApis';
import { connect } from 'react-redux';
import { getAllUser } from '../../Redux/ReduxAPIHandler/UserAPis';
import { UserModl } from '../../Modals/UserModl';
import CustomAllUserData from '../../Components/CustomAllUserData';
import * as navigation from '../../Navigation/NavigatorService';
import { getCategoryData } from '../../Redux/ReduxAPIHandler/CategoryAPis';
export interface Props {
  navigation:  any;
  loginResponse: any;
  route:any;
}


class Categories extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  state={
    isInternet: true,
    isLoading:false,
    allData:[],
    isErrorData:false,
  }
  componentDidMount() {
    this.getInstructorsData();
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
      this.setState({ isLoading: false });


    });
    
  }
  getInstructorsData = async () => {
    try {
      if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      let data: UserModl[] = await getCategoryData({ token: this.props.loginResponse.token, id: this.props.route.params.id }) as UserModl[];
      console.log('CategoryData Data', data);
      this.setState({ allData: data })
      }
      this.setState({ isErrorData: true })
    }
    catch (error) {
      this.setState({ isErrorData: true })
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
          title={''}
          rightImage={Images.user_icon}
          right2Image={Images.bell_icon}
          right2BtnActn={()=>this.props.navigation.navigate('Notification')}
          rightBtnActn={() => this.props.navigation.navigate('Profile')}
        />
        </View>
        {
          this.state.isInternet != true ?
            <View style={style.noDataVw}>
              <Text style={style.noDataTx} >{'Internet not Woking'}</Text>
            </View> :
            this.state.isErrorData ?
              <View style={style.noDataVw}>
                <Text style={style.noDataTx} >{'No data Found'}</Text>
              </View> :
        <View style={style.mainVw}>
          <Text style={style.allTx}>{this.props.route.params.title}</Text>
          <FlatList
            style={style.insVw}
            data={this.state.allData}
            renderItem={({item, index}: any) => (
              <CustomAllUserData 
              isLesson = {false}
              playVideo = {() => {}}
              index = {index}
              selectbookmark = {(data:any) => console.log('instructors id',data)}
              item={item} 
              category={true}
              isImage={true}
              getPlayerData={(data:any)=>this.props.navigation.navigate('Player',{id:data.id})}
              isViewImage={false} />
            )}
          />
        </View>
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Categories);

// export default Instructors;
