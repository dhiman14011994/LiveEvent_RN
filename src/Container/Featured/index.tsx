/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';
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
import { NavigationScreenProp, } from 'react-navigation';
import { style } from './style';
import CustomCourseView from '../../Components/CustomCourseView';
import { connect } from 'react-redux';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import { getCourseFeatureList } from '../../Redux/ReduxAPIHandler/CategoryAPis';
import { FeatureModl } from '../../Modals/CategoryModl';
import { setFavourite } from '../../Redux/ReduxAPIHandler/CourseApis';
import * as navigation from '../../Navigation/NavigatorService';
export interface Props {
  navigation: any;
  loginResponse: any;
}

class Featured extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    featureData: [],
    isInternet: true,
    isErrorData: false
  }

  componentDidMount = () => {
    this.getFeatureData();
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

  getFeatureData = async () => {
    try {
      if(this.props.loginResponse.data!=undefined&&this.props.loginResponse.data.token!=undefined){
      let data: FeatureModl[] = await getCourseFeatureList(this.props.loginResponse.data.token) as FeatureModl[];
      console.log('Feature Data12345', JSON.stringify(data));
      this.setState({ featureData: data })
      }
      // this.setState({ isErrorData: true })
    }
    catch (error) {
      this.setState({ isErrorData: true })
    }
  }
  onHitLike = async (item: any) => {
    // console.log( 'item.favourite 142536',item)
    // console.log( 'item.favourite token',this.props.loginResponse.data.token)
    if (this.props.loginResponse.data!=undefined&&this.props.loginResponse.data.token!=undefined) {
      let data = await setFavourite({
        token: this.props.loginResponse.data.token, data: {
          courseId: item.id,
          favourite: item.bookmark
        }
      });
      console.log( 'item.favourite 142536',item.favourite)
      console.log('item 142536',data)
      this.getFeatureData()
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
          this.state.isInternet != true ?
            <View style={style.noDataVw}>
              <Text style={style.noDataTx} >{'Internet not Woking'}</Text>
            </View> :

            <View style={style.mainVw}>
              <Text style={style.allTx}>{'FEATURED'}</Text>
              {
                this.state.isErrorData ?
                  <View style={style.noDataVw}>
                    <Text style={style.noDataTx} >{'No data Found'}</Text>
                  </View> :
                  <FlatList
                    style={{ marginTop: 20, marginBottom: 20, width: '100%' }}
                    data={this.state.featureData}
                    renderItem={({ item, index }: any) => <CustomCourseView
                      isLesson={false}
                      playVideo={(data:any) => this.props.navigation.navigate('Player',{id:data.data._id})}
                      index={index}
                      selectbookmark={(data:any) => this.onHitLike(data)}
                      item={item}
                      isImage={true}
                      istime={true}
                      isViewImage={false}
                      dataIndex={null}
                    />}
                    keyExtractor={(item: any) => item.id}
                  />
              }
            </View>
        }

      </SafeAreaView>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    loginResponse: state.LoginReducer.loginInfo.login,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Featured);
