import React, { createRef } from 'react';
import { Image, View, Text, Dimensions, SafeAreaView, ScrollView, ActivityIndicator, Modal, TouchableOpacity, } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import NavigationHeader from '../../Components/Header';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
import { style } from './style';
import CustomTextInputView from '../../Components/CustomTextInputView';
//@ts-ignore
import SwitchToggle from 'toggle-switch-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import { getUserData, updateUserData, updateUserImage, userGetData } from '../../Redux/ReduxAPIHandler/UserAPis';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import { saveUserProfileImage, userDataApi } from '../../Redux/Actions/UserActions';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { UserDetailsModl } from '../../Modals/UserModl';
export interface Props {
  navigation: NavigationScreenProp<any, any>;
  loginResponse: any;
  userResponse: any;
  currentUser: any;
  updateProfileImage: any;
}

class MyProfile extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    value: '',
    fname: '',
    lname: '',
    titleUser: '',
    industry: '',
    city: '',
    isEnabled: true,
    image: '',
    isInternet: true,
    id: '',
    private: false,
    isLoading: false
  };
  sheetRef: any;
  componentDidMount = async () => {
    await AsyncStorage.getItem('loginId').then((res) => this.setState({ ...this.state, id: res }))
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
      this.setState({ isLoading: false, });
    });

    this.getUserDetails()
  }



  //************************************ changeToggle button***************************************************** 
  changeToggle = () => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };





  //************************************ get Image ***************************************************** 

  takeImage = (isCamera: boolean) => {
    if (isCamera) {
      ImagePicker.openCamera({
        multiple: false,
        cropping: true,
      }).then(images => {
        console.log('IMAGE RESP>>>>>>', images)
        this.compressImage(images, images.mime)
        // this.setState({ path: images.path });
      }).catch((error: any) => console.log('ERRRRRORRR:::', error));
    }
    else {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
      }).then(images => {
        // this.setState({ path: images.path });
        this.compressImage(images, images.mime)
      });
    }
  };



  uploadImage = () => {
    this.sheetRef.show();
  }

  compressImage = (response: any, type: any) => {
    let height = response.height;
    let width = response.width;
    while (height > 800) {
      height = height - 100;
    }
    while (width > 800) {
      width = width - 100;
    }
    ImageResizer.createResizedImage(response.path, width, height, 'JPEG', 30).then((resp) => {
      console.log('compressed response = ', resp);
      this.saveProfilIemage(resp.path, type)
    }).catch((err) => {
      // this.props.apiStop();
    });
  }


  saveProfilIemage = async (uri: any, type: any) => {
    console.log("uri", type.slice(6, 11))
    try {
      let name = moment(Date()).format('X');
      let params = [{
        name: 'image',
        filename: name + '.' + type.split('/')[1],
        data: RNFetchBlob.wrap(uri),
        type: type,
      }, {
        name: 'type',
        data: '2'
      }];
      if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
      let resp: any = await updateUserImage(this.props.loginResponse.token, this.state.id, params);
      let data = JSON.parse(resp.data)
      this.props.updateProfileImage(data.data.image)
      this.setState({ image: data.data.image })
      }
    }
    catch (error) {
      console.log('error', JSON.stringify(error))
    }
  }

  //************************************ Get User Details ***************************************************** 
  getUserDetails = async () => {
    AsyncStorage.getItem("loginId").then(data => console.log("check my user id >>>>> ", data))
    if (this.props.userResponse != undefined) {
      console.log(this.props.userResponse)
      this.setState({
        ...this.state, fname: this.props.userResponse.name != undefined ? this.props.userResponse.name : '',
        lname: this.props.userResponse.lastName != undefined ? this.props.userResponse.lastName : '',
        titleUser: this.props.userResponse.title != undefined ? this.props.userResponse.title : '',
        city: this.props.userResponse.city != undefined ? this.props.userResponse.city : '',
        industry: this.props.userResponse.industry != undefined ? this.props.userResponse.industry : '',
        isEnabled: this.props.userResponse.private != undefined ? this.props.userResponse.private : false,
        image: this.props.userResponse.image != undefined ? this.props.userResponse.image : '',
      })
    }else{

    }
  }



  //************************************ Update User Details ***************************************************** 

  updateUserDetails = async () => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
    try {
      if (this.vaildateDetails()) {
        this.setState({ ...this.state, isLoading: true })
        let param = {
          type: '1',
          name: this.state.fname,
          lastName: this.state.lname,
          profileTagLine: this.state.titleUser,
          industry: this.state.industry,
          city: this.state.city,
          private: this.state.isEnabled
        }
        let data: any = await updateUserData({ token: this.props.loginResponse.token, id: this.state.id, params: param });
        if (data != undefined && data != null) {
          this.setState({
            ...this.state,
            name: data.name,
            lastName: data.lastName,
            titleUser: data.title,
            industry: data.industry,
            city: data.city,
            isEnable: data.private,
            isLoading: false
          })
          AsyncStorage.getItem('loginId').then(async (res) => {
            console.log('currentuserId', res)
            await this.props.currentUser({ token: this.props.loginResponse.token, id: res })
            this.setState({ ...this.state, isLoading: false })

            // this.getUserDetails()
          })
        }
        else {
          this.setState({ ...this.state, isLoading: false })
        }
      }

    }
    catch (error) {
      this.setState({ ...this.state, isLoading: false })
      console.log('error', error)
    }
  }
  else{
    this.setState({ ...this.state, isLoading: false })
  }
  }

  private vaildateDetails() {
    if (this.state.fname == '') {
      Toast.show('Please enter first name.', Toast.SHORT);
      return false;
    } else if (this.state.lname == '') {
      Toast.show('Please enter last name', Toast.SHORT);
      return false;
    } else if (this.state.titleUser == '') {
      Toast.show('Please enter the title', Toast.SHORT);
      return false;
    }
    else if (this.state.industry == '') {
      Toast.show('Please enter the industry', Toast.SHORT);
      return false;
    }
    else if (this.state.city == '') {
      Toast.show('Please enter the city', Toast.SHORT);
      return false;
    }
    return true;
  }

  render() {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const fName = this.props.userResponse != undefined && this.props.userResponse.name != undefined ? this.props.userResponse.name : '';
    const lName = this.props.userResponse != undefined && this.props.userResponse.lastName != undefined ? this.props.userResponse.lastName : ''

    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={false}
            leftBtnActn={() => {
              return this.props.navigation.goBack();
            }}
            title={'MY PROFILE'}
            btnImage={Images.backArrow}
            // rightImage={Images.user_icon}
            // right2Image={Images.bell_icon}
            // right2BtnActn={() => this.props.navigation.navigate('Notification')}
            // rightBtnActn={() => {
            //   return this.props.navigation.navigate('Profile');
            // }}
          />
        </View>
        <ActionSheet
          ref={o => this.sheetRef = o}
          title={'Select Image'}
          options={['Take Photo', 'Choose from Library', 'cancel']}
          cancelButtonIndex={2}
          onPress={(index: any) => this.takeImage(index == 0 ? true : false)}
        />
        <ScrollView style={style.scrollVw} showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={style.mainVw}>
              <View style={style.editVw}>
                <Image
                  source={
                    this.state.image == '' ? Images.placeholder_circle : { uri: this.state.image }
                  }
                  style={style.profileImg}
                />
                <TouchableOpacity
                  style={style.editBtn}
                  onPress={() => this.uploadImage()}>
                  <Image source={Images.edit} style={style.editImg} />
                </TouchableOpacity>
              </View>

              <Text style={style.userTx}>{fName + ' ' + lName}</Text>
              <View style={style.optnCntnr}>
                <CustomTextInputView
                  height={50}
                  image={Images.user_icon}
                  value={this.state.fname}
                  onchangeText={(text: any) => this.setState({ fname: text })}
                  placeholder={'First Name'}
                  keyboardType={'default'}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={50}
                  onKeyPress={()=>{  
                  }}
                />
                <CustomTextInputView
                  height={50}
                  image={Images.user_icon}
                  value={this.state.lname}
                  onchangeText={(text: any) => this.setState({ lname: text })}
                  placeholder={'Last Name'}
                  keyboardType={'default'}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={50}
                  onKeyPress={()=>{  
                  }}
                />
                <CustomTextInputView
                  height={50}
                  image={Images.title}
                  value={this.state.titleUser}
                  onchangeText={(text: any) => this.setState({ titleUser: text })}
                  placeholder={'Title'}
                  keyboardType={'default'}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={50}
                  onKeyPress={()=>{  
                  }}
                />
                <CustomTextInputView
                  height={50}
                  image={Images.industry}
                  value={this.state.industry}
                  onchangeText={(text: any) => this.setState({ industry: text })}
                  placeholder={'Industry'}
                  keyboardType={'default'}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={50}
                  onKeyPress={()=>{  
                  }}
                />
                <CustomTextInputView
                  height={50}
                  image={Images.city}
                  value={this.state.city}
                  onchangeText={(text: any) => this.setState({ city: text })}
                  placeholder={'City'}
                  keyboardType={'default'}
                  secureTextEntry={false}
                  isCvv={false}
                  onEndEditing={() => { }}
                  maxLength={50}
                  onKeyPress={()=>{  
                  }}
                />
              </View>
              <View style={[style.switchVw, { marginTop: 10 }]}>
                <Text style={style.privateTx}>{'Private Account'}</Text>
                {/* <Paper.Switch
                value={this.state.isEnabled}
                onValueChange={() => this.changeToggle()}
                style={style.switch}
                color="#10FFE5"
              /> */}
                <View style={[{ flexDirection: 'row', marginLeft: 10 }]}>

                  <SwitchToggle
                    isOn={this.state.isEnabled}

                    onColor={color.APP_WHITE}
                    offColor={"#000000"}
                    size="medium"
                    circleColor={color.APP_BODY_BLUE}
                    onToggle={() => this.changeToggle()}
                  // disabled={true}
                  />
                </View>
              </View>
              <View style={style.noCanView}>
                <Image style={style.iconImg} source={Images.onCan} />
                <Text style={style.iconTx}>
                  {
                    'No one can message you if you turn your account Private, however others can follow you.'
                  }
                </Text>
              </View>
              <TouchableOpacity
                style={style.saveBt}
                onPress={() =>
                  this.updateUserDetails()

                }>
                <Text style={style.saveTx}>{'SAVE'}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
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
  console.log('here state.LoginReducer.userInfo.userData', state.LoginReducer.userInfo.userData)
  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,
    userResponse: state.LoginReducer.userInfo.userData,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    currentUser: (data: any) => dispatch(userDataApi(data)),
    updateProfileImage: (data: string) => dispatch(saveUserProfileImage(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
