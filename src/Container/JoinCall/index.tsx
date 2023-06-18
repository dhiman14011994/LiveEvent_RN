/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native';
import CustomFlatView from '../../Components/CustomFlatView';
import NavigationHeader from '../../Components/Header';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import { style } from './style';
import { NavigationScreenProp } from 'react-navigation';
import RtcEngine from 'react-native-agora';
import { internetcheck } from '../../Constants/InternetCkeck';
import Toast from 'react-native-simple-toast';
import { SharePopup } from '../../Components/CustomPopup';
import { getToken } from '../../Redux/ReduxAPIHandler/LiveTalksApi';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { userFollow, userGetData } from '../../Redux/ReduxAPIHandler/UserAPis';
import { connect } from 'react-redux';
import * as navigation from '../../Navigation/NavigatorService';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  loginResponse: any;
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  route: any;
}

let rtc: any = RtcEngine


export const endCall = async () => {
  await rtc.leaveChannel();
  await AsyncStorage.setItem('groupId', '')
};




class JoinCall extends React.Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };



  state = {
    appId: '5c6d3396cc454b8998db069cb32da161',
    token: '',
    channelName: '',
    joinSucceed: false,
    peerIds: [],
    isInternet: true,
    isRaiseHand: false,
    ispermissionHand: false,
    ishandPermission: false,
    Moderators: [],
    Participants: [],
    Participants_Copy: [],
    TotalParticipants: [],
    raiseHanddata: [],
    isHand: false,
    id: '',
    name: '',
    email: '',
    handRaise: false,
    speak: false,
    image: '',
    status: '',
    isLoading: false,
    isView: false,
    userData: undefined,
    isViewUser: false,
    userName: '',
    userImage: '',
    userId: '',
    raiseHandUserId: '',
    participantId: [],
    fname: '',
    lname: '',
    titleUser: '',
    city: '',
    industry: '',
    isEnabled: false,
    imageuser: '',
    handuserName: '',
    eventUserId: '',
    eventId: '',
    role: '',
    eventName: '',
    isJoinPermission: false,
    isExitPermission: false,
    inviteName: '',
    count: 0,
    joinId: '',
    hostId:'',
  };
  _engine?: RtcEngine;
  componentDidMount() {

    if (this.props.route.params != undefined) {
      let eventData = this.props.route.params


      this.setState({ ...this.setState, eventId: eventData.eventId, eventUserId: eventData.id, role: eventData.role, eventName: eventData.eventTitle, hostId:eventData.hostId==undefined?'111':eventData.hostId }, () => {

        this.getEventToken()
        this.getUserData();
        this.getModerators()
        this.Participants()
      })

    } else {

      AsyncStorage.getItem('loginData').then((res: any) => {
        let data = JSON.parse(res)
        if (data.role == 'guest') {
          this.setState({ ...this.setState, eventId: data.meetingId, eventUserId: data.id, role: data.role, eventName: data.eventTitle, isJoinPermission: true, inviteName: data.inviteName })
          this.getEventToken()
          this.getUserData();
          this.getModerators()
          this.Participants()
        }
        else {
          this.setState({ ...this.setState, eventId: data.meetingId, eventUserId: data.id, role: data.role, eventName: data.eventTitle })
          this.getEventToken()
          this.getUserData();
          this.getModerators()
          this.Participants()
        }

      })
    }


    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
    });
    this.props.navigation.addListener('focus', (event: any) => {
      internetcheck().then((res) => {
        this.setState({ isInternet: res, ispermissionHand: false })

      }).catch((error) => {
        this.setState({ isInternet: error, ispermissionHand: false })
        Toast.show('Internet not Working');
      })
    });
  }


  //----------------------------------------------------------Get User data--------------------------------------------------------------

  getUserData = () => {
    firestore()
      .collection('eventUser')
      .doc(this.state.eventUserId)
      .onSnapshot(async (onResult: any) => {
        if (onResult._data != undefined) {
          this.setState({
            ...this.state, isHand: onResult._data.speak,
            id: onResult._data.id,
            name: onResult._data.name,
            email: onResult._data.email,
            handRaise: onResult._data.handRaise,
            speak: onResult._data.speak,
            image: onResult._data.image,
            status: onResult._data.status,
            joinId: onResult._data.joinId,
          })
          console.log('_data 123', onResult._data)
          if (onResult._data.speak) {
            AsyncStorage.getItem('isSpeak').then((res: any) => {
              console.log('here123456789', res)
              if (res != 5) {
                AsyncStorage.setItem('isSpeak', '1')
                this.setState({ ...this.state, ispermissionHand: this.state.role != 'moderator' ? true : false, })
              }
            })
          }
          else {
            AsyncStorage.setItem('isSpeak', '1')
            await rtc.muteLocalAudioStream(true)

          }
          // }

        }
      })



  }

  //------------------------------------------------------Get Moderators data------------------------------------------------------------------

  getModerators = () => {
    console.log('this.state.eventId>>>>', this.state.eventId)
    firestore().collection('liveTalks').doc(this.state.eventId).get().then((onResult: any) => {
      console.log('onResult12345>>>>', onResult.data())
      if (onResult.data() == undefined) {
      }
      else {
        if (onResult.data().moderators != undefined) {
          if (onResult.data().moderators.length != 0) {
            let data: any = this.state.Moderators
            for (let i = 0; i < onResult.data().moderators.length; i++) {
              firestore().collection('eventUser').doc(onResult.data().moderators[i]).get().then((documentSnapshot) => {
                data.push(documentSnapshot.data())
                this.setState({ ...this.state, Moderators: data })
              })
            }
          }
        }
      }
    })

    firestore().collection('eventUser').onSnapshot((document) => {
      document.docChanges().forEach((change: any) => {
        console.log('user update data123', change._nativeData.doc.path)
        console.log('user data123 update data123', change.doc.data())
        if (this.state.Moderators.length != 0) {
          let data: any = [];
          data = this.state.Moderators
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == change.doc.data().id) {
              data[i] = change.doc.data()
              this.setState({ ...this.state, Moderators: data })
            }
          }
        }
      })

    })
  }


  //------------------------------------------------------------- Get Participant Data -----------------------------------------------------------

  Participants = () => {
    console.log('this.state.eventId', this.state.eventId)
    firestore().collection('liveTalks').doc(this.state.eventId).onSnapshot((onResult: any) => {
      console.log('onResult123454454355255224524', onResult)
      if (onResult.data() != undefined) {
        console.log('onResult>>>>>>>>>>>>>>>>>>>>>>>>>', onResult.data())

        let participantId: any[] = [...this.state.participantId];
        let participantData: any[] = [...this.state.Participants];
        let data: any[] = onResult.data().participants
        if (onResult.exists) {
          if (this.state.participantId.length > data.length) {
            for (let u = 0; u < this.state.participantId.length; u++) {
              const stateId = this.state.participantId[u];
              let index: number = data.findIndex((element: any) => element == stateId);
              if (index == -1) {
                let indx: number = participantData.findIndex((element: any) => element.id == stateId);
                participantData.splice(indx, 1);
                participantId.splice(u, 1);
              }
            }
            this.setState({ ...this.state, Participants: participantData, TotalParticipants: participantData, participantId: participantId })
          }
          else {
            for (let i = 0; i < data.length; i++) {
              let index: number = this.state.participantId.findIndex((element: any) => element == data[i]);
              if (data[i] != this.state.eventUserId) {
                console.log('PARTICIPENT12>>>>>>', this.state.eventId)

                firestore().collection('eventUser').doc(data[i]).get().then((documentSnapshot: any) => {
                  if (index == -1) {
                    participantId.push(data[i])
                    this.setState({ ...this.state, participantId: participantId, })
                    participantData.push(documentSnapshot.data())
                  }
                  else {
                    participantData[index] = documentSnapshot.data();
                  }
                  this.setState({ ...this.state, Participants: participantData, TotalParticipants: participantData })
                })
              }
              else {
                console.log('PARTICIPENT2>>>>>>', this.state.eventId)

                let userExist: number = this.state.Participants.findIndex((element: any) => element.id == this.state.eventUserId);
                if (this.state.role != 'moderator' && userExist == -1) {
                  let userData = {
                    id: this.state.id,
                    email: this.state.email,
                    name: this.state.name,
                    image: this.state.image,
                    handRaise: this.state.handRaise,
                    speak: this.state.speak,
                    status: this.state.status,
                    joinId: this.state.joinId,
                  }
                  participantData.push(userData)
                  participantId.push(this.state.eventUserId)
                  this.setState({ ...this.state, participantId: participantId, })
                }
                this.setState({ ...this.state, Participants: participantData, TotalParticipants: participantData })
              }
            }
          }
        }
      }
    })

    firestore().collection('eventUser').onSnapshot((document) => {
      console.log('user dataUpdate>>>>', document.docChanges())

      document.docChanges().forEach((change: any) => {
        console.log('user dataUpdate>>>>', change.doc)
        if (this.state.Participants.length != 0) {
          let data: any = [];
          data = this.state.Participants
          for (let i = 0; i < data.length; i++) {
            if (data[i].email == change.doc.data().email) {
              data[i] = change.doc.data()
              this.setState({ ...this.state, Participants: data })
            }
          }

          if (change.doc.data().handRaise) {
            let raiseData: any = [];
            raiseData = this.state.raiseHanddata
            if(change.doc.data().speak){
              for (let i = 0; i < raiseData.length; i++) {
                if (raiseData[i].email == change.doc.data().email) {
                  raiseData.splice(i, 1);
                  this.setState({ ...this.state, raiseHanddata: raiseData })
                  
                }
              }
            }
            else{
              raiseData.push(change.doc.data())
              this.setState({ ...this.state, raiseHanddata: raiseData })
            }
            
          }
          else{
            let raiseData: any = [];
            raiseData = this.state.raiseHanddata
            for (let i = 0; i < raiseData.length; i++) {
              if (raiseData[i].email == change.doc.data().email) {
                raiseData.splice(i, 1);
                this.setState({ ...this.state, raiseHanddata: raiseData })
                
              }
            }
          }

        }


        
      })
    })

  }


  //-------------------------------------------------------Get Event Token Data-----------------------------------------------------------------
  getEventToken = async () => {
    let name = this.state.eventId
    let data: any = await getToken(name).then((res: any) => {
      this.init(res.data.token);
    })
  }



  getKillApp = async (id: any) => {
    // console.log('id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',id)
    if (this.state.Participants != undefined) {


      for (let u = 0; u < this.state.Participants.length; u++) {
        if (this.state.Participants[u].joinId == id) {
          await rtc.leaveChannel();
          firestore().collection('liveTalks').doc(this.state.eventId).get().then(async (onResult: any) => {
            if (onResult.data() == undefined) {
            }
            else {
              if (onResult.data().participants != undefined) {
                if (this.state.Participants[u].id != undefined) {
                  let deleteUser: any = await onResult.data().participants
                  let index = deleteUser.indexOf(this.state.Participants[u].id)
                  deleteUser.splice(index, 1)
                  firestore().collection('eventUser').doc(this.state.Participants[u].id).update({
                    eventId: '',
                    joinId: '',
                    status: 'offline',
                    speak: false,
                    handRaise: false
                  }).then(() => { })
                  firestore()
                    .collection('liveTalks')
                    .doc(this.state.eventId)
                    .update({
                      participants: deleteUser
                    })
                    .then((res) => {


                    })
                }
              }
            }
          })
        }

      }
    }
  }

  //------------------------------------------------------ Start Call Listener ------------------------------------------------------------------

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  async init(token: any) {
    const { appId } = this.state;
    rtc = await RtcEngine.create(appId);
    rtc.addListener('Warning', (warn: any) => {
      // console.log('join call start warn', warn)
    });

    rtc.addListener('Error', (err: any) => {
      console.log('join call start err', err)
    });

    rtc.addListener('UserJoined', (uid: any, elapsed: any) => {
      console.log('uid Joined user call>>>>>', uid)


      const { peerIds } = this.state;
    });

    rtc.addListener('UserOffline', (uid: any, reason: any) => {
      console.log('join call offline resp', uid)
      this.getKillApp(uid)

      const { peerIds } = this.state;
      this.setState({
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    rtc.addListener('JoinChannelSuccess', async (channel: any, uid: any, elapsed: any) => {
      console.log('join call start resp', channel, uid, elapsed)

      firestore().collection('eventUser').doc(this.state.eventUserId).update({
        joinId: uid

      })
        .then(() => {
        });
      this.setState({
        joinSucceed: true,
      });
    });

    await rtc.leaveChannel();
    if (token == '') {
      // Alert.alert('NO TOKEN')
      return;
    }
    setTimeout(() => {
      this.startCall(token);
    }, 10);
  }


  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async (token: any) => {
    // Join Channel using null token and channel name
    await rtc
      ?.joinChannel(token, this.state.eventId, null, 0).then((info: any) => {
        // Alert.alert('Ok')
        // this._engine?.muteLocalAudioStream(true)
        rtc.setEnableSpeakerphone(true)
        rtc.muteLocalAudioStream(!this.state.speak)
        rtc.stopAudioMixing()
        rtc.resumeAllEffects()
        // this._engine?.adjustAudioMixingVolume(100)
      })
      .catch((error: any) => {
        console.log('join call start error', error)
      });
  };




  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    this.setState({ ...this.state, isLoading: true })
    if (this.state.role == 'moderator') {
      await rtc.leaveChannel();
      await AsyncStorage.setItem('groupId', '')
      firestore().collection('eventUser').doc(this.state.eventUserId).update({
        eventId: '',
      })
      this.setState({ ...this.state, isLoading: false })
      this.props.navigation.goBack();
    }
    else {
      await rtc.leaveChannel();
      await AsyncStorage.setItem('groupId', '')

      firestore().collection('liveTalks').doc(this.state.eventId).get().then(async (onResult: any) => {
        if (onResult.data() == undefined) {
        }
        else {
          if (onResult.data().participants != undefined) {
            let deleteUser: any = await onResult.data().participants
            let index = deleteUser.indexOf(this.state.eventUserId)
            deleteUser.splice(index, 1)
            firestore()
              .collection('liveTalks')
              .doc(this.state.eventId)
              .update({
                participants: deleteUser
              })
              .then((res) => {
                firestore().collection('eventUser').doc(this.state.eventUserId).update({
                  eventId: '',
                  joinId: '',
                  status: 'offline',
                  speak: false,
                  handRaise: false
                }).then(() => {
                  this.setState({ ...this.state, isLoading: false })
                  if (this.state.role == 'guest') {
                    firestore().collection('eventUser').doc(this.state.eventUserId).delete().then(() => { }).catch((error: any) => {
                      console.log('error', error)
                    })
                    AsyncStorage.setItem('guestData', '')
                    navigation.reset('Login')
                  }
                  else {
                    this.props.navigation.goBack();
                  }

                })

              })
          }
        }
      })
    }
  };




  //-----------------------------------------------------Raise hand user-------------------------------------------------------------------

  viewRaiseHandMsg = () => {
    this.raiseHand();
    if (!this.state.handRaise) {
      this.setState({ isRaiseHand: true })
      setTimeout(() => {
        this.setState({ isRaiseHand: false })
      }, 2000)
    }

  }



  //-------------------------------------------------Update Raisehand data-----------------------------------------------------------------------
  async raiseHand() {
    await AsyncStorage.getItem('loginId')
      .then(async (uid: any) => {
        firestore().collection('eventUser').doc(uid).update({
          handRaise: !this.state.handRaise,
        })
          .then(() => {
          });
      })
  }


  //----------------------------------------------------Moderator allow permission Speak and update speak data--------------------------------------------------------------------

  allowPermission = () => {
    console.log('this.state.raiseHandUserId', this.state.raiseHandUserId)
    firestore().collection('eventUser').doc(this.state.raiseHandUserId).update({
      speak: true,
    })
      .then(() => {
        this.setState({ ...this.state, ishandPermission: false })
      })
      .catch((error) => {
        console.log('error', error)
        this.setState({ ...this.state, ishandPermission: false })
      })
  }


  //---------------------------------------------------------Moderator cancel allow permission Speak and update speak data---------------------------------------------------------------

  cancelPermission = () => {
    firestore().collection('eventUser').doc(this.state.raiseHandUserId).update({
      speak: false,
      handRaise: false,
    })
      .then(() => {
        this.setState({ ...this.state, ishandPermission: false })
      });
    this.setState({ ...this.state, ishandPermission: false })
  }


  //------------------------------------------------------Moderator mute participant user and update data------------------------------------------------------------------
  userMute = () => {
    if(this.state.eventUserId==this.state.hostId){

    
    firestore().collection('eventUser').doc(this.state.raiseHandUserId).update({
      speak: false,
      handRaise: false,
    })
      .then(() => {
        this.setState({ ...this.state, ishandPermission: false })
      });

    }
    else{
      this.setState({ ...this.state, ishandPermission: false })
    }
    
  }



  //-------------------------------------------------------Moderator mute and update speak data-----------------------------------------------------------------

  moderatorMute = async () => {
    console.log('this.state.speak', this.state.speak)
    await rtc.muteLocalAudioStream(this.state.speak)
    // await this._engine?.muteAllRemoteAudioStreams(this.state.speak)
    firestore().collection('eventUser').doc(this.state.eventUserId).update({
      speak: !this.state.speak,
    })
      .then(() => {

      });
  }


  //----------------------------------------------------------Unmute user Speak--------------------------------------------------------------

  speakAllow = async () => {
    await rtc.muteLocalAudioStream(false)
    // await this._engine?.muteAllRemoteAudioStreams(false)
    this.setState({ ispermissionHand: false })
  }

  //----------------------------------------------------------mute user Speak--------------------------------------------------------------
  speakCancel = async () => {
    await rtc.muteLocalAudioStream(true)
    // await this._engine?.muteAllRemoteAudioStreams(true)
    firestore().collection('eventUser').doc(this.state.id).update({
      speak: false,
      handRaise: false,
    })
      .then((res) => {
        console.log('res cancel speak user', res)
        this.setState({ ispermissionHand: false })
      });
    this.setState({ ispermissionHand: false })
  }


  getUserDetails = async () => {
    if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
      let data: any = await userGetData({ token: this.props.loginResponse.token, id: this.state.userId });
      if (data != undefined && data != null) {
        console.log('user get data', data)
        this.setState({
          ...this.state, fname: data.data.name != undefined ? data.data.name : '',
          lname: data.data.lastName != undefined ? data.data.lastName : '',
          titleUser: data.data.profileTagLine != undefined ? data.data.profileTagLine : '',
          city: data.data.city != undefined ? data.data.city : '',
          industry: data.data.industry != undefined ? data.data.industry : '',
          isEnabled: data.data.private != undefined ? data.data.private : false,
          imageuser: data.data.image != undefined ? data.data.image : '',
          isViewUser: true,

        })
      }
    }
    // this.setState({
    //   ...this.state,isViewUser: true,})

  }

  async followUser() {
    if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
      let data: any = await userFollow({
        token: this.props.loginResponse.token, data: {
          followId: this.state.userId,
          followed: true

        }
      });
      this.setState({ isViewUser: false })
    }
    // this.setState({ isViewUser: false })

  }



  messageActionForUpcoming = (userId: any) => {
    // console.log(index)
    AsyncStorage.getItem("loginData").then((res: any) => JSON.parse(res)).then((el) => {
      const { fname, lname, imageuser } = this.state
      var data = el.data
      let chat_id = data.id < userId ? data.id + "" + userId : userId + "" + data.id
      let senderDict = {
        firstName: fname,
        lastName: lname,
        image: imageuser,
        createdOn: Date.now(),
        id: userId,
        chatId: chat_id
      }
      this.props.navigation.navigate('Messages', { chatData: senderDict })
    })

  }
  exitRoom = () => {
    if (this.state.role != 'guest') {
      this.endCall()
    }
    else {
      this.setState({ ...this.state, isExitPermission: true })
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
            title={this.state.eventName != undefined && this.state.eventName != null && this.state.eventName != '' ? this.state.eventName : ''}
            btnImage={Images.left_icon}
            leftBtnActn={() => { this.state.role != 'guest' ? this.props.navigation.goBack() : this.exitRoom() }}
            rightImage={this.state.role != 'guest' ? Images.user_icon : ''}
            right2Image={this.state.role != 'guest' ? Images.bell_icon : ''}
            right2BtnActn={() => { this.state.role != 'guest' ? this.props.navigation.navigate('Notification') : {} }}
            rightBtnActn={() => { this.state.role != 'guest' ? this.props.navigation.navigate('Profile') : {} }}
          />
        </View>
        <ScrollView style={style.scrollVw} showsVerticalScrollIndicator={false}>
          <View
            style={style.ModeratorsVw}>
            <View style={style.titleMainVw}>
              <View style={style.empityVw} />
              <Text style={style.ModTx}>{'Moderators'}</Text>
              <View style={style.empityVw} />
            </View>
            <View style={[style.speakerVw, { width: '100%' }]}>
              <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} horizontal={true}>
                {this.state.Moderators.map((item: any, index: any) => (
                  <CustomFlatView
                    item={item}
                    isCall={true}
                    text={''}
                    press={() => { }}
                    viewStyle={{}}
                    upComing={false}
                    OnClickShare={{}}
                    OnClickNotify={{}} />
                ))}
              </ScrollView>
            </View>
          </View>
          <View
            style={style.participantsVw}>

            <View style={[style.titleMainVw, { marginTop: '3%', }]}>
              <View style={style.empityVw} />
              <Text style={style.ModTx}>{'Participants'}</Text>
              <View style={style.empityVw} />
            </View>
            <View style={style.listenerVw}>
              {this.state.isView ? this.state.Participants.map((item: any, index: any) => (
                <View
                  style={style.userVw}>

                  <TouchableOpacity
                    style={[style.userImgVw, {
                      borderWidth: 1, overflow: 'hidden', borderColor: item.speak != undefined ? item.speak ? color.APP_BODY_BLUE : null : null, borderTopColor: item.speak != undefined ? item.speak ? 'white' : null : null,
                      // borderLeftColor: 'red' 
                    }]}
                    onPress={() => {
                      this.state.role == 'moderator' ? null : this.state.eventUserId == item.id ? this.setState({ ...this.state, isViewUser: false })
                        :
                        this.setState({
                          ...this.state,
                          userId: item.id,
                          userName: item != undefined && item.name != '' ? item.name : 'Username',
                          userImage: item.image != '' && item.image != undefined ? item.image : ''
                        },
                          () => this.getUserDetails())
                    }}>
                    { }
                    <Image
                      style={style.usersImg}
                      source={item.image != '' && item.image != undefined ? { uri: item.image } : Images.placeholder_circle}
                    />
                  </TouchableOpacity>
                  {item.speak != undefined ? item.speak ? this.state.role == 'moderator' && item.speak ? <TouchableOpacity style={[style.handVw, { borderRadius: 20 }]} onPress={() => this.setState({ ...this.state, raiseHandUserId: item.id }, () => this.userMute())}>
                    {console.log('handRaise123456', item.handRaise)}
                    <Image
                      style={style.handImg}
                      source={Images.mic}
                    />
                  </TouchableOpacity> : null :
                    <TouchableOpacity style={[style.handVw, { borderRadius: 20 }]} onPress={() => this.setState({ ...this.state, ishandPermission: this.state.role == 'moderator' ? item.handRaise ? true : false : false, raiseHandUserId: item, handuserName: item.name })}>
                      {console.log('handRaise123456', item.handRaise)}
                      <Image
                        style={style.handImg}
                        source={item.handRaise ? Images.left_hand : Images.mic}
                      />
                    </TouchableOpacity> : null}
                    {this.state.role == 'moderator'?
                  item.handRaise?
                  !item.speak?
                    <View style={style.countVw}>
                        <Text>{this.state.raiseHanddata.map((items,i)=>items.email==item.email?i+1:null)}</Text>
                      </View>:null:null:null
                      }

                  <Text
                    numberOfLines={1}
                    style={style.userNameTx}>
                    {item != undefined && item.name != '' ? this.state.eventUserId == item.id ? 'me' : item.name : this.state.eventUserId == item.id ? 'me' : 'Username'}
                  </Text>
                </View>
              )



              ) : this.state.Participants.map((item: any, index: any) => index < 8 ? (

                <View
                  style={style.userVw}>

                  <TouchableOpacity
                    style={[style.userImgVw, {
                      borderWidth: 1, overflow: 'hidden', borderColor: item.speak != undefined ? item.speak ? color.APP_BODY_BLUE : null : null, borderTopColor: item.speak != undefined ? item.speak ? 'white' : null : null,
                      // borderLeftColor: 'red' 
                    }]}
                    onPress={() => {
                      this.state.role == 'moderator' ? null : this.state.eventUserId == item.id ? this.setState({ ...this.state, isViewUser: false })
                        :
                        this.setState({
                          ...this.state,
                          userId: item.id,
                          userName: item != undefined && item.name != '' ? item.name : 'Username',
                          userImage: item.image != '' && item.image != undefined ? item.image : ''
                        },
                          () => this.getUserDetails())
                    }}>
                    { }
                    <Image
                      style={style.usersImg}
                      source={item.image != '' && item.image != undefined ? { uri: item.image } : Images.placeholder_circle}
                    />
                  </TouchableOpacity>
                  {item.speak != undefined ? item.speak ? this.state.role == 'moderator' && item.speak ? <TouchableOpacity style={[style.handVw, { borderRadius: 20 }]} disabled={this.state.eventUserId==this.state.hostId?false:true} onPress={() => this.setState({ ...this.state, raiseHandUserId: item.id }, () => this.userMute())}>

                    <Image
                      style={style.handImg}
                      source={Images.mic}
                    />
                  </TouchableOpacity> : null :
                    <TouchableOpacity style={[style.handVw, { borderRadius: 20 }]} disabled={this.state.eventUserId==this.state.hostId?false:true} onPress={() => this.setState({ ...this.state, ishandPermission: this.state.role == 'moderator' ? this.state.eventUserId==this.state.hostId? item.handRaise ? true : false : false: false, handuserName: item.name, raiseHandUserId: item.id }, () => console.log('userId', item))}>

                      <Image
                        style={style.handImg}
                        source={item.handRaise ? Images.left_hand : Images.mic}
                      />

                    </TouchableOpacity> : null}
                  {this.state.role == 'moderator'?
                  item.handRaise?
                  !item.speak?
                    <View style={style.countVw}>
                        <Text>{this.state.raiseHanddata.map((items,i)=>items.email==item.email?i+1:null)}</Text>
                      </View>:null:null:null
                      }
                  <Text
                    numberOfLines={1}
                    style={style.userNameTx}>
                    {item != undefined && item.name != '' ? this.state.eventUserId == item.id ? 'me' : item.name : this.state.eventUserId == item.id ? 'me' : 'Username'}
                  </Text>
                </View>
              ) : null


              )}
            </View>
            {this.state.Participants.length != undefined && this.state.Participants.length != 0 && this.state.Participants.length > 9 ?
              <TouchableOpacity style={style.moreVw} onPress={() => this.setState({ ...this.state, isView: !this.state.isView })}>
                <Text style={style.moreTx}>{this.state.isView ? 'View less' : 'View more'}</Text>
                <Image style={style.moreImg} source={this.state.isView ? null : Images.downarrow} />
              </TouchableOpacity>
              : null}
          </View>
          <View style={style.permissionBtnVw}>
            <TouchableOpacity style={[style.leavebtn, { borderRadius: 15, marginRight: '2%', backgroundColor: '#BD1616', }]} onPress={() => this.exitRoom()}>
              <Text style={[style.btnCancelTx, { color: color.APP_WHITE }]}>{this.state.role == 'moderator' ? 'END MEETING' : 'LEAVE'}</Text>
            </TouchableOpacity>
            {this.state.role == 'moderator' ? <TouchableOpacity style={[style.leavebtn, { borderRadius: 15, marginLeft: '2%', backgroundColor: color.APP_BODY_BLUE, }]} onPress={() => this.moderatorMute()}>
              <Text style={[style.btnCancelTx, { color: color.APP_BLACK }]}>{this.state.speak ? 'MUTE' : 'UNMUTE'}</Text>

            </TouchableOpacity> :
              <TouchableOpacity style={[style.leavebtn, { borderRadius: 15, marginLeft: '2%', flexDirection: 'row', backgroundColor: color.APP_BODY_BLUE, }]} onPress={() => !this.state.handRaise ? this.viewRaiseHandMsg() : {}}>
                <Image style={style.handIconImg} source={Images.left_hand} />
                <Text style={style.btnTx}>{this.state.handRaise ? 'Lower Hand' : 'Raise Hand'}</Text>

              </TouchableOpacity>}

          </View>

        </ScrollView>



        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isRaiseHand}>
          <View style={style.toastMainVw}>
            <View style={[style.toastMsgVw, { borderRadius: 20, }]}>
              <Text style={[style.toastMsgTXX]}>
                <Image source={Images.left_hand} style={style.handMsgImg} />
                <Text style={style.toastMsgTx}>{'You have raised your hand! We will let you know when Admins will let you talk.'}</Text>
              </Text>
            </View>
          </View>
        </Modal>





        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.ispermissionHand}>
          <View style={style.permissionMainVw}>
            <View style={style.permissionMsgVw}>
              <Text style={style.InvTx}>{'Invitation'}</Text>
              <Text style={style.userNmTx}>{'Jemele Hill invited you to speak. Click speak to start talking in Discussion.'}</Text>
              <View style={style.permissionBtnVw}>
                <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15, marginRight: '2%' }]} onPress={() => this.speakCancel()}>
                  <Text style={style.btnTx}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15, marginLeft: '2%' }]} onPress={() => this.speakAllow()}>
                  <Text style={style.btnTx}>{'speak'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>





        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.ishandPermission}>
          <View style={style.permissionMainVw}>
            <View style={style.permissionMsgVw1}>
              <Text style={style.InvTx}>{'Hand Raised'}</Text>
              <Text style={style.userNmTx}>{this.state.handuserName + ' has raised the hand and wants to Speak. Allow?'}</Text>
              <View style={style.permissionBtnVw}>
                <TouchableOpacity style={[style.CancelBtn, { borderRadius: 15, marginRight: '2%', borderColor: color.APP_BODY_BLUE, borderWidth: 1 }]} onPress={() => this.cancelPermission()}>
                  <Text style={[style.btnCancelTx, { color: color.APP_BODY_BLUE }]}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.permissionBtn1, { borderRadius: 15, marginLeft: '2%' }]} onPress={() => this.allowPermission()}>
                  <Text style={style.btnTx}>{'ALLOW'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>






        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isViewUser}>
          <View style={style.permissionMainVw}>

            <View style={style.userMsgVw}>
              <TouchableOpacity style={style.crossIcon} onPress={() => this.setState({ ...this.state, isViewUser: false })}>
                <Image style={style.crossIconImg} source={require('../LiveTalks/Assets/close.png')} />
              </TouchableOpacity>
              <Text style={style.InvTx}>{this.state.fname == '' ? 'username' : this.state.fname + ' ' + this.state.lname}</Text>
              <Text style={style.userdesTx} numberOfLines={2}>{'Interested in software design & in some musical instruments '}</Text>

              <View style={style.usersImgVw}>
                <Image style={style.profileImg} source={this.state.userImage != '' ? { uri: this.state.userImage } : Images.placeholder_circle} />
              </View>
              {this.state.isEnabled ?
                <View style={style.followBtnVw}>
                  <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15 }]} onPress={() => this.followUser()}>
                    <Text style={style.btnTx}>{'FOLLOW'}</Text>
                  </TouchableOpacity>

                </View>
                :
                <View style={style.permissionBtnVw}>
                  <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15, }]} onPress={() => this.followUser()}>
                    <Text style={style.btnTx}>{'FOLLOW'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15, }]} onPress={() => this.setState({ ...this.state, isViewUser: false }, () => this.messageActionForUpcoming(this.state.userId))}>
                    <Text style={style.btnTx}>{'MESSAGE'}</Text>
                  </TouchableOpacity>
                </View>
              }
              <Text style={style.recentTxt}>{'RECENT POSTS'}</Text>
              <Text style={style.recTxt}>{'Lorem Ipsum ed ut perspiciatis unde omnis iste natus'}</Text>
              <Text style={style.dateTxt}>{'15, July 2020'}</Text>
              <Text style={style.recTxt}>{'Lorem Ipsum ed ut perspiciatis unde omnis iste natus'}</Text>
              <Text style={style.dateTxt}>{'15, July 2020'}</Text>
            </View>
          </View>
        </Modal>







        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isLoading}>
          <View style={style.popupView}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </Modal>




        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isJoinPermission}>
          <View style={style.permissionMainVw}>
            <View style={style.permissionMsgVw1}>
              <Text style={style.InvTx}>{'Invitation'}</Text>
              <Text style={style.userNmTx}>{'Join the discussion with the code link shared by ' + this.state.inviteName + '.'}</Text>
              <View style={style.permissionBtnVw}>
                <TouchableOpacity style={[style.CancelBtn, { borderRadius: 15, marginRight: '2%', borderColor: color.APP_BODY_BLUE, borderWidth: 1 }]} onPress={() => this.setState({ ...this.state, isJoinPermission: false }, () => this.endCall())}>
                  <Text style={[style.btnCancelTx, { color: color.APP_BODY_BLUE }]}>{'EXIT'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.permissionBtn1, { borderRadius: 15, marginLeft: '2%' }]} onPress={() => this.setState({ ...this.state, isJoinPermission: false })}>
                  <Text style={style.btnTx}>{'JOIN'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>






        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isExitPermission}>
          <View style={style.permissionMainVw}>
            <View style={style.permissionMsgVw1}>
              <Text style={style.InvTx}>{'Exit?'}</Text>
              <Text style={style.userNmTx}>{'Do you want to leave the session or you want to continue with it?'}</Text>
              <View style={style.permissionBtnVw}>
                <TouchableOpacity style={[style.CancelBtn, { borderRadius: 15, marginRight: '2%', borderColor: color.APP_BODY_BLUE, borderWidth: 1 }]} onPress={() => this.setState({ ...this.state, isExitPermission: false })}>
                  <Text style={[style.btnCancelTx, { color: color.APP_BODY_BLUE }]}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.exitBtn, { borderRadius: 15, marginLeft: '2%', backgroundColor: 'red' }]} onPress={() => this.setState({ ...this.state, isExitPermission: false }, () => this.endCall())}>
                  <Text style={style.btnTx}>{'LEAVE'}</Text>
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
  console.log('state.LoginReducer.userInfo', state.LoginReducer.userInfo)
  return {
    loginResponse: state.LoginReducer.loginInfo.login.data,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinCall)
