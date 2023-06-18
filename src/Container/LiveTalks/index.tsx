/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, SafeAreaView, ScrollView, FlatList, Modal, ActivityIndicator, Alert, Share, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomFlatView from '../../Components/CustomFlatView';
import { NavigationScreenProp } from 'react-navigation';
import { SharePopup, NotifyPopup } from '../../Components/CustomPopup';
import NavigationHeader from '../../Components/Header';
import { internetcheck } from '../../Constants/InternetCkeck';
import Images from '../../Resources/Images';
import { style } from './style';
import Toast from 'react-native-simple-toast';
import { getEvent, SaveEvent, SearchEvent } from '../../Redux/ReduxAPIHandler/LiveTalksApi';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserData } from '../../Redux/ReduxAPIHandler/UserAPis';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import * as navigation from '../../Navigation/NavigatorService';
import { endCall } from '../JoinCall';
import base64 from 'react-native-base64'
export interface Props {
  navigation: NavigationScreenProp<any, any>;
  loginResponse: any;
  userResponse: any;
  this: any
}

class LiveTalks extends React.Component<Props> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    text: '',
    isactive: true,
    isSharePopupVisible: false,
    isNotifyPopupVisible: false,
    isInternet: true,
    LiveEvent: [],
    LiveEventMessage: '',
    UpcomingEvent: [],
    UpcomingEventMessage: '',
    isLoading: false,
    isIncall: false,
    roomIndex: -1,
    notifiData: {},
    shareData: '',
    eventTitle: '',
    speakerName: '',
    userId: '',
    isHand: false,
    name: '',
    email: '',
    handRaise: false,
    speak: false,
    eventId: '',
    role: '',
    status: '',
    eventImage: '',
    usereventId: '',
  };

  componentDidMount() {

    console.log('this.state.isIncall', this.state.isIncall)
    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
    });
    this.props.navigation.addListener('focus', (event: any) => {
      AsyncStorage.setItem("ScreenName", "Live Talks")
      this.checkIfOnCall();
      this.getUserData()
      internetcheck().then((res) => {
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
    });
    this.LiveEventData()
    this.UpcomingData()
    this.getUserData()
    this.checkIfOnCall();
  }




  getUserData = () => {
      firestore().collection('eventUser').doc(this.state.userId.toString()).onSnapshot((onResult: any) => {
      console.log('userData12345', onResult.data(), this.state.userId)
      if (onResult.data() == undefined) {
      }
      else {
        this.setState({
          ...this.state, isHand: onResult.data().speak,
          name: onResult.data().name,
          email: onResult.data().email,
          handRaise: onResult.data().handRaise,
          speak: onResult.data().speak,
          status: onResult.data().status,
          usereventId: onResult.data().eventId == undefined ? '' : onResult.data().eventId
        })
      }
    })



  }

  // ***************************************** JOIN LIVE EVENT ROOM ********************************************************************************
  joinCall = async (item: any,) => {
     console.log('join call Response>>>>>>>>', item)
    this.setState({ ...this.state, isLoading: true })
    let hostId= item.host==undefined?'111':item.host.length==0?'111':item.host[0]._id
    await AsyncStorage.setItem('groupId', item._id.toString())

    await AsyncStorage.getItem('loginId')
      .then(async (res: any) => {
        
        if (this.props.loginResponse != undefined || this.props.loginResponse.role != undefined) {


          if (this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator') {

            firestore().collection('liveTalks').doc(item._id.toString()).get().then(async (documentSnapshot: any) => {
              const moderatorData = documentSnapshot.data().moderators
              if (moderatorData.length != 0) {
                
                if (moderatorData.indexOf(res.split('"')[0]) != -1) {
                  firestore().collection('eventUser').doc(this.props.userResponse.id).update({
                    eventId: documentSnapshot.data()._id
                  })

                  this.setState({ ...this.state, isLoading: false })
                  this.props.navigation.navigate('JoinCall', { id: res.split('"')[0], eventId: item._id, role: this.props.loginResponse.role, eventTitle: documentSnapshot.data().title,hostId:hostId })
                  console.log('this.props.loginResponse.role', res.split('"')[0])
                }
                else {
                  this.setState({ ...this.state, isLoading: false })

                }
              }
            })


          }
          else {

            firestore().collection('liveTalks').doc(item._id.toString()).get().then((event_documentSnapshot: any) => {
              const userData = event_documentSnapshot.data().participants
              //check userdata lenght
              if (userData.length != 0) {
                //chech userdata

                if (userData.indexOf(res.split('"')[0]) != -1) {

                  firestore().collection('eventUser').doc(this.props.userResponse.id).get().then((documentSnapshot: any) => {
                    //check user data store exist 
                    if (documentSnapshot.exists) {

                      //check user online ya offline
                      if (documentSnapshot.data().status == 'online') {
                        this.setState({ ...this.state, isLoading: false })
                        AsyncStorage.setItem('isSpeak', '5')
                        this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                      }
                      else {
                        firestore().collection('eventUser').doc(this.props.userResponse.id).update({
                          id: this.props.userResponse.id,
                          eventId: item._id,
                          joinId: '',
                          name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                          email: this.props.userResponse.email,
                          image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                          handRaise: false,
                          speak: false,
                          isPermission: false,
                          status: 'online'
                        }).then(res => {
                          AsyncStorage.setItem('userId', this.props.userResponse.id)
                          AsyncStorage.setItem('eventId', item._id)
                          this.setState({ ...this.state, isLoading: false })
                          AsyncStorage.setItem('isSpeak', '5')
                          this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                        })
                          .catch(error => {
                            this.setState({ ...this.state, isLoading: false })
                          })

                      }

                    }
                    else {

                      firestore().collection('eventUser').doc(this.props.userResponse.id).set({
                        id: this.props.userResponse.id,
                        eventId: item._id,
                        joinId: '',
                        name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                        email: this.props.userResponse.email == undefined ? '' : this.props.userResponse.email,
                        image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                        handRaise: false,
                        speak: false,
                        isPermission: false,
                        status: 'online'
                      }).then(res => {
                        AsyncStorage.setItem('userId', this.props.userResponse.id)
                        AsyncStorage.setItem('eventId', item._id)
                        this.setState({ ...this.state, isLoading: false })
                        AsyncStorage.setItem('isSpeak', '5')
                        this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                      })
                        .catch(error => {
                          this.setState({ ...this.state, isLoading: false })
                        })
                    }
                  })
                }
                else {

                  firestore().collection('eventUser').doc(this.props.userResponse.id).get().then((documentSnapshot: any) => {
                    //check user data store exist 
                    if (documentSnapshot.exists) {

                      //check user online ya offline
                      if (documentSnapshot.data().status == 'online') {

                        this.setState({ ...this.state, isLoading: false })

                      }
                      else {

                        let id = res.split('"')
                        userData.push(id[0])
                        firestore()
                          .collection('liveTalks')
                          .doc(item._id.toString())
                          .update({
                            participants: userData
                          })
                          .then((res) => {
                            firestore().collection('eventUser').doc(this.props.userResponse.id).get().then((documentSnapshot: any) => {
                              //check user data store exist 
                              if (documentSnapshot.exists) {
                                //check user online ya offline
                                if (documentSnapshot.data().status == 'online') {
                                  this.setState({ ...this.state, isLoading: false })
                                  AsyncStorage.setItem('isSpeak', '5')
                                  this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                                }
                                else {
                                  firestore().collection('eventUser').doc(this.props.userResponse.id).update({
                                    id: this.props.userResponse.id,
                                    eventId: item._id,
                                    joinId: '',
                                    name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                                    email: this.props.userResponse.email,
                                    image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                                    handRaise: false,
                                    speak: false,
                                    isPermission: false,
                                    status: 'online'
                                  }).then(res => {
                                    AsyncStorage.setItem('userId', this.props.userResponse.id)
                                    AsyncStorage.setItem('eventId', item._id)
                                    AsyncStorage.setItem('isSpeak', '5')
                                    this.setState({ ...this.state, isLoading: false })
                                    this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title ,hostId:hostId})
                                  })
                                    .catch(error => {
                                      this.setState({ ...this.state, isLoading: false })
                                    })

                                }
                              }
                              else {
                                firestore().collection('eventUser').doc(this.props.userResponse.id).set({
                                  id: this.props.userResponse.id,
                                  eventId: item._id,
                                  joinId: '',
                                  name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                                  email: this.props.userResponse.email == undefined ? '' : this.props.userResponse.email,
                                  image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                                  handRaise: false,
                                  speak: false,
                                  isPermission: false,
                                  status: 'online'
                                }).then(res => {
                                  AsyncStorage.setItem('userId', this.props.userResponse.id)
                                  AsyncStorage.setItem('eventId', item._id)
                                  AsyncStorage.setItem('isSpeak', '5')
                                  this.setState({ ...this.state, isLoading: false })
                                  this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                                })
                                  .catch(error => {
                                    this.setState({ ...this.state, isLoading: false })
                                  })
                              }
                            })
                              .catch(error => {
                                this.setState({ ...this.state, isLoading: false })
                              })
                          })
                      }
                    }
                    else {
                      let id = res.split('"')
                      userData.push(id[0])
                      firestore()
                        .collection('liveTalks')
                        .doc(item._id.toString())
                        .update({
                          participants: userData
                        })
                        .then((res) => {

                          firestore().collection('eventUser').doc(this.props.userResponse.id).get().then((documentSnapshot: any) => {
                            //check user data store exist 
                            if (documentSnapshot.exists) {
                              //check user online ya offline
                              if (documentSnapshot.data().status == 'online') {
                                this.setState({ ...this.state, isLoading: false })
                                AsyncStorage.setItem('isSpeak', '5')
                                this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                              }
                              else {
                                firestore().collection('eventUser').doc(this.props.userResponse.id).update({
                                  id: this.props.userResponse.id,
                                  eventId: item._id,
                                  joinId: '',
                                  name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                                  email: this.props.userResponse.email,
                                  image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                                  handRaise: false,
                                  speak: false,
                                  isPermission: false,
                                  status: 'online'
                                }).then(res => {
                                  AsyncStorage.setItem('userId', this.props.userResponse.id)
                                  AsyncStorage.setItem('eventId', item._id)
                                  this.setState({ ...this.state, isLoading: false })
                                  AsyncStorage.setItem('isSpeak', '5')
                                  this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                                })
                                  .catch(error => {
                                    this.setState({ ...this.state, isLoading: false })
                                  })

                              }
                            }
                            else {

                              firestore().collection('eventUser').doc(this.props.userResponse.id).set({
                                id: this.props.userResponse.id,
                                eventId: item._id,
                                joinId: '',
                                name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                                email: this.props.userResponse.email == undefined ? '' : this.props.userResponse.email,
                                image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                                handRaise: false,
                                speak: false,
                                isPermission: false,
                                status: 'online'
                              }).then(res => {
                                AsyncStorage.setItem('userId', this.props.userResponse.id)
                                AsyncStorage.setItem('eventId', item._id)
                                this.setState({ ...this.state, isLoading: false })
                                AsyncStorage.setItem('isSpeak', '5')
                                this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                              })
                                .catch(error => {
                                  this.setState({ ...this.state, isLoading: false })
                                })
                            }
                          })
                            .catch(error => {
                              this.setState({ ...this.state, isLoading: false })
                            })
                        })
                    }
                  })
                    .catch(error => {
                      this.setState({ ...this.state, isLoading: false })
                    })
                }
              }
              else {

                firestore().collection('eventUser').doc(this.props.userResponse.id).get().then((documentSnapshot: any) => {
                  //check user data store exist 
                  if (documentSnapshot.exists) {
                    //check user online ya offline
                    if (documentSnapshot.data().status == 'online') {
                      this.setState({ ...this.state, isLoading: false })
                    }
                    else {
                      firestore().collection('eventUser').doc(this.props.userResponse.id).update({
                        id: this.props.userResponse.id,
                        eventId: item._id,
                        joinId: '',
                        name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                        email: this.props.userResponse.email,
                        image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                        handRaise: false,
                        speak: false,
                        isPermission: false,
                        status: 'online'
                      }).then(res => {
                        userData.push(this.props.userResponse.id)
                        firestore()
                          .collection('liveTalks')
                          .doc(item._id.toString())
                          .update({
                            participants: userData
                          })
                          .then((res) => { })
                        AsyncStorage.setItem('userId', this.props.userResponse.id)
                        AsyncStorage.setItem('eventId', item._id)
                        this.setState({ ...this.state, isLoading: false })
                        AsyncStorage.setItem('isSpeak', '5')
                        this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                      })
                        .catch(error => {
                          this.setState({ ...this.state, isLoading: false })
                        })
                    }
                  }
                  else {
                    let id = res.split('"')
                    userData.push(id[0])
                    firestore()
                      .collection('liveTalks')
                      .doc(item._id.toString())
                      .update({
                        participants: userData
                      })
                      .then((res) => {
                        firestore().collection('eventUser').doc(this.props.userResponse.id).set({
                          id: this.props.userResponse.id,
                          eventId: item._id,
                          joinId: '',
                          name: this.props.userResponse.name == undefined ? '' : this.props.userResponse.name,
                          email: this.props.userResponse.email == undefined ? '' : this.props.userResponse.email,
                          image: this.props.userResponse.image == undefined ? '' : this.props.userResponse.image,
                          handRaise: false,
                          speak: false,
                          isPermission: false,
                          status: 'online'
                        }).then(res => {
                          AsyncStorage.setItem('userId', this.props.userResponse.id)
                          AsyncStorage.setItem('eventId', item._id)
                          this.setState({ ...this.state, isLoading: false })
                          AsyncStorage.setItem('isSpeak', '5')
                          this.props.navigation.navigate('JoinCall', { id: this.props.userResponse.id, eventId: item._id, role: 'partiicipant', eventTitle: event_documentSnapshot.data().title,hostId:hostId })
                        })
                          .catch(error => {
                            this.setState({ ...this.state, isLoading: false })
                          })
                      })
                  }
                })
              }
            })
              .catch((error) => {
                this.setState({ ...this.state, isLoading: false })
              })
          }
        }
      })
  };

  // ***************************************** Share Event Details ********************************************************************************

  OnClickShare = async (data: any) => {

    var Eventdate = moment(data.startDateTime).format("YYYY-MM-DD hh:mm:ss")
    var name = this.props.userResponse != undefined && this.props.userResponse.name != undefined ? this.props.userResponse.name : 'user' + ' ' + this.props.userResponse != undefined && this.props.loginResponse.lastName != undefined ? this.props.loginResponse.lastName : ''
    var meetingCode = base64.encode(data._id + '/' + name);
    try {
      const result = await Share.share({
        message:
          "Event name: " + data.title + '\n' + "Start DateTime: " + Eventdate + '\n' + 'Meeting code:' + meetingCode,
      });
      AsyncStorage.setItem('name', name)

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }


  // ***************************************** Get LIVE EVENT  ********************************************************************************

  LiveEventData = async () => {
    if (this.props.loginResponse != undefined || this.props.loginResponse.role != undefined) {
      if (this.props.loginResponse.token != undefined) {
        let data: any = await getEvent({ token: this.props.loginResponse.token, type: 1 });
        let MDdata: any = []

        if (data.data == null) {
          this.setState({ LiveEvent: [], LiveEventMessage: data.message })
        }
        else {
          console.log('data.data[j].moderators[k]>>>>>>>>>>>>>', JSON.stringify(data))
          if (this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator') {
            for (let j = 0; j < data.data.length; j++) {
              // console.log('data.data[j].moderators[k]', data.data[j].moderators)
              for (let k = 0; k < data.data[j].moderators.length; k++) {

                if (data.data[j].moderators[k]._id == this.props.userResponse.id) {
                  // console.log('data.data[j].moderators[k]', data.data[j].moderators[k]._id, '        ', this.props.userResponse.id)
                  MDdata.push(data.data[j])
                  firestore().collection('liveTalks').doc(data.data[j]._id.toString()).onSnapshot((documentSnapshot: any) => {

                    if (documentSnapshot.exists) {
                      if (documentSnapshot.data().participants == undefined) {
                        firestore()
                          .collection('liveTalks')
                          .doc(data.data[j]._id.toString())
                          .update({
                            _id: data.data[j]._id.toString(),
                            endDateTime: data.data[j].endDateTime,
                            startDateTime: data.data[j].startDateTime,
                            title: documentSnapshot.data().title,
                            participants: []
                          })
                          .then(async () => {
                          }).catch(error => console.log('error>>>>>123', error))

                      }
                      else {

                      }
                    }

                  })


                  for (let i = 0; i < data.data[j].moderators.length; i++) {
                    firestore().collection('eventUser').doc(data.data[j].moderators[i]._id).get().then((documentSnapshot) => {
                      if (documentSnapshot.exists) {
                      }
                      else {
                        firestore().collection('eventUser').doc(data.data[j].moderators[i]._id).set({
                          id: data.data[j].moderators[i]._id,
                          name: data.data[j].moderators[i].name != undefined ? data.data[j].moderators[i].name : '',
                          email: data.data[j].moderators[i].email != undefined ? data.data[j].moderators[i].email : '',
                          image: data.data[j].moderators[i].uploadedFile != undefined ? data.data[j].moderators[i].uploadedFile.path : '',
                          handRaise: false,
                          speak: true,
                          eventId: '',
                          isPermission: false,
                          status: 'offline'
                        })
                          .then((res: any) => {

                          })
                          .catch((e) => {
                            console.log('error:', JSON.stringify(e));
                          });

                      }
                    })

                  }
                }
                
              }
              ////////////////////////////////////// host user /////////////////////////////////


              for (let k = 0; k < data.data[j].host.length; k++) {

                if (data.data[j].host[k]._id == this.props.userResponse.id) {
                  // console.log('data.data[j].moderators[k]', data.data[j].moderators[k]._id, '        ', this.props.userResponse.id)
                  MDdata.push(data.data[j])
                  firestore().collection('liveTalks').doc(data.data[j]._id.toString()).onSnapshot((documentSnapshot: any) => {

                    if (documentSnapshot.exists) {
                      if (documentSnapshot.data().participants == undefined) {
                        firestore()
                          .collection('liveTalks')
                          .doc(data.data[j]._id.toString())
                          .update({
                            _id: data.data[j]._id.toString(),
                            endDateTime: data.data[j].endDateTime,
                            startDateTime: data.data[j].startDateTime,
                            title: documentSnapshot.data().title,
                            participants: []
                          })
                          .then(async () => {
                          }).catch(error => console.log('error>>>>>123', error))

                      }
                      else {

                      }
                    }

                  })


                  for (let i = 0; i < data.data[j].host.length; i++) {
                    firestore().collection('eventUser').doc(data.data[j].host[i]._id).get().then((documentSnapshot) => {
                      if (documentSnapshot.exists) {
                      }
                      else {
                        firestore().collection('eventUser').doc(data.data[j].host[i]._id).set({
                          id: data.data[j].host[i]._id,
                          name: data.data[j].host[i].name != undefined ? data.data[j].host[i].name : '',
                          email: data.data[j].host[i].email != undefined ? data.data[j].host[i].email : '',
                          image: data.data[j].host[i].uploadedFile != undefined ? data.data[j].host[i].uploadedFile.path : '',
                          handRaise: false,
                          speak: true,
                          eventId: '',
                          isPermission: false,
                          status: 'offline'
                        })
                          .then((res: any) => {

                          })
                          .catch((e) => {
                            console.log('error:', JSON.stringify(e));
                          });

                      }
                    })

                  }
                }
              }


              ////////////////////////////////////// end host user data ///////////////////////////
            }
            this.setState({ LiveEvent: MDdata, LiveEventMessage: data.message })
          } else {
            for (let j = 0; j < data.data.length; j++) {
              firestore().collection('liveTalks').doc(data.data[j]._id.toString()).onSnapshot((documentSnapshot: any) => {

                if (documentSnapshot.exists) {
                  if (documentSnapshot.data().participants == undefined) {
                    firestore()
                      .collection('liveTalks')
                      .doc(data.data[j]._id.toString())
                      .update({
                        _id: data.data[j]._id.toString(),
                        endDateTime: data.data[j].endDateTime,
                        moderators: data.data[j].moderators,
                        startDateTime: data.data[j].startDateTime,
                        title: documentSnapshot.data().title,
                        participants: []
                      })
                      .then(async () => {
                      }).catch(error => console.log('error>>>>>123', error))

                  }
                  else {
                  }
                }
              })
              for (let i = 0; i < data.data[j].moderators.length; i++) {
                firestore().collection('eventUser').doc(data.data[j].moderators[i]._id).get().then((documentSnapshot) => {
                  if (documentSnapshot.exists) {
                  }
                  else {
                    firestore().collection('eventUser').doc(data.data[j].moderators[i]._id).set({
                      id: data.data[j].moderators[i]._id,
                      name: data.data[j].moderators[i].name != undefined ? data.data[j].moderators[i].name : '',
                      email: data.data[j].moderators[i].email != undefined ? data.data[j].moderators[i].email : '',
                      image: data.data[j].moderators[i].uploadedFile != undefined ? data.data[j].moderators[i].uploadedFile.path : '',
                      handRaise: false,
                      speak: true,
                      isPermission: false,
                      status: 'offline'
                    })
                      .then((res: any) => {

                      })
                      .catch((e) => {
                        console.log('error:', JSON.stringify(e));
                      });
                  }
                })

              }
            }
            this.setState({ LiveEvent: this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator' ? MDdata : data.data, LiveEventMessage: data.message })
          }
        }
      }
    }
  }



  // ***************************************** Get UPCOMING EVENT ********************************************************************************

  UpcomingData = async () => {
    if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
      let data: any = await getEvent({ token: this.props.loginResponse.token, type: 2 });

      if (data.data == null) {
        this.setState({ UpcomingEvent: [], UpcomingEventMessage: data.message })
      }
      else {
        let upcoming = data.data.sort((a: any, b: any) => (a.startDateTime) - b.startDateTime);;
        this.setState({ UpcomingEvent: upcoming, UpcomingEventMessage: data.message })
      }
    }
  }


  // *****************************************   SAVE EVENT ********************************************************************************

  EventSave = async (item: any) => {
    if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
      let data = await SaveEvent({ token: this.props.loginResponse.token, param: item });
      this.LiveEventData()
      this.UpcomingData()
    }
  }

  // ***************************************** SEARCH EVENT  ********************************************************************************
  changeText = async (data: any) => {
    if (data.length.toString() > 2) {
      this.setState({ text: data })
      if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
        let Searchdata: any = await SearchEvent({ token: this.props.loginResponse.token, type: this.state.isactive ? 3 : 4, title: data });
        if (Searchdata.data == null) {
          if (this.state.isactive) {
            this.setState({ ...this.state, LiveEvent: [], LiveEventMessage: Searchdata.message })
          }
          else {
            this.setState({ ...this.state, UpcomingEvent: [], UpcomingEventMessage: Searchdata.message })
          }
        }
        else {
          if (this.state.isactive) {
            this.setState({ ...this.state, LiveEvent: Searchdata.data, LiveEventMessage: Searchdata.message })
          }
          else {
            this.setState({ ...this.state, UpcomingEvent: Searchdata.data, UpcomingEventMessage: Searchdata.message })
          }
        }
      }
    }
    else {
      this.setState({ text: data })
      if (this.state.isactive) {
        this.LiveEventData()
      }
      else {
        this.UpcomingData()
      }
    }
  }

  // ***************************************** Check USER Call Join or not ********************************************************************************
  async checkIfOnCall() {
    await AsyncStorage.getItem('groupId').then(async (id: any) => {
      await AsyncStorage.getItem('loginId').then(async (uid: any) => {
        this.setState({ ...this.state, userId: uid, eventId: id })
        firestore().collection('eventUser').doc(uid).onSnapshot((onResult: any) => {
          // console.log('here data user', onResult.data())
          if (onResult.data() != undefined) {
            this.setState({ ...this.state, usereventId: onResult.data().eventId != undefined ? onResult.data().eventId : '' })
            if (this.props.loginResponse != undefined) {
              if (this.props.loginResponse.role != undefined) {
                if (this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator') {
                  if (onResult.data().eventId != undefined && onResult.data().eventId != '') {
                    this.setState({ isIncall: true, })
                    this.getEventData(onResult.data().eventId,);
                  }

                }
                else {
                  if (id != '') {
                    let ifExist = false;
                    let index = -1;

                    firestore().collection('liveTalks').doc(id).onSnapshot((documentSnapshot: any) => {
                      ifExist = documentSnapshot.data() == undefined ? false : documentSnapshot.data().moderators.includes(uid);
                      if (!ifExist) {
                        ifExist = documentSnapshot.data() == undefined ? false : documentSnapshot.data().participants.includes(uid);
                      }

                      for (let i = 0; i < this.state.LiveEvent.length; i++) {
                        const element: any = this.state.LiveEvent[i];
                        if (element._id == id) {
                          index = i;
                          break;
                        }
                      }
                      console.log('userOnline', ifExist, ' index ', index)
                      this.setState({ isIncall: ifExist, roomIndex: index })
                      this.getEventData(id);
                    });
                  }
                }
              }
              else {                
                if (id != '') {
                  let ifExist = false;
                  let index = -1;

                  firestore().collection('liveTalks').doc(id).onSnapshot((documentSnapshot: any) => {
                    ifExist = documentSnapshot.data() == undefined ? false : documentSnapshot.data().moderators.includes(uid);
                    if (!ifExist) {
                      ifExist = documentSnapshot.data() == undefined ? false : documentSnapshot.data().participants.includes(uid);
                    }

                    for (let i = 0; i < this.state.LiveEvent.length; i++) {
                      const element: any = this.state.LiveEvent[i];
                      if (element._id == id) {
                        index = i;
                        break;
                      }
                    }
                    console.log('userOnline', ifExist, ' index ', index)
                    this.setState({ isIncall: ifExist, roomIndex: index })
                    this.getEventData(id);
                  });
                }
              }
            }
           
          }
          
        })


      });
    });
  }


  getEventData = (data: any) => {
    //  Alert.alert(JSON.stringify(this.state.isIncall))
    if (this.state.isIncall) {

      firestore().collection('liveTalks').doc(data).onSnapshot((documentSnapshot: any) => {

        if (documentSnapshot != undefined && documentSnapshot.data() != undefined) {
          this.setState({ ...this.state, eventTitle: documentSnapshot.data() != undefined ? documentSnapshot.data().title : '', eventImage: documentSnapshot.data() != undefined && documentSnapshot.data().uploadedFile != undefined ? documentSnapshot.data().uploadedFile.path : '' })
        }




      })
    }
  }




  // ***************************************** Send Notification event ********************************************************************************
  sendNotifi = (data: any) => {

    let duration = 15 // in minutes
    if (data.time.id == 1) {
      duration = 5;
    }
    if (data.time.id == 2) {
      duration = 15;
    }
    if (data.time.id == 3) {
      duration = 30;
    }
    else if (data.time.id == 4) {
      duration = 60;
    }
    else if (data.time.id == 5) {
      duration = 240;
    }
    else if (data.time.id == 6) {
      duration = 1440;
    }
    else if (data.time.id == 7) {
      duration = 2880;
    }
    else if (data.time.id == 8) {
      duration = 10080;
    }
    var Event = moment(data.event.startDateTime).format("YYYY-MM-DD hh:mm:ss")
    var date: Date = new Date(data.event.startDateTime);
    let notiDate: Date = new Date(data.event.startDateTime);
    notiDate.setMinutes(date.getMinutes() - duration);
    let dt = new Date(Date.now())
    let ndt = moment(dt).format("YYYY-MM-DD hh:mm:ss")
    try {

      PushNotification.localNotificationSchedule({
        message: "Event name: " + data.event.title + '\n' + "Start DateTime: " + Event,
        date: notiDate,
        allowWhileIdle: false,
      });
      this.setState({ ...this.state, isNotifyPopupVisible: false })
    }
    catch (error) {
      this.setState({ ...this.state, isNotifyPopupVisible: false })
    }

  }



  handRaise = () => {
    firestore().collection('eventUser').doc(this.state.userId).update({
      handRaise: true,
    })
      .then(() => {
      });
  }

  leaveCall = () => {
    endCall()
    if (this.props.loginResponse != undefined || this.props.loginResponse.role != undefined) {
      if (this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator') {
        firestore().collection('eventUser').doc(this.state.userId).update({
          eventId: ''
        })
      }
      else {


        firestore().collection('liveTalks').doc(this.state.eventId).get().then(async (onResult: any) => {
          if (onResult.data() == undefined) {
          }
          else {
            if (onResult.data().participants != undefined) {
              let deleteUser: any = await onResult.data().participants
              let index = deleteUser.indexOf(this.state.userId)
              console.log('index>>>>>>>>>>>>', index)
              if (index == -1) {
                // let deleteModerator: any = await onResult.data().moderators
                // let indexModerator = deleteModerator.indexOf(this.state.userId)
                this.setState({ ...this.state, role: 'moderator', isIncall: false })
                firestore().collection('eventUser').doc(this.state.userId).update({

                  status: 'offline',
                  speak: false,
                  handRaise: false
                }).then(() => {

                })
              }
              else {
                deleteUser.splice(index, 1)
                firestore()
                  .collection('liveTalks')
                  .doc(this.state.eventId)
                  .update({
                    participants: deleteUser
                  })
                  .then((res) => {
                    firestore().collection('eventUser').doc(this.state.userId).update({
                      eventId: '',
                      joinId: '',
                      status: 'offline',
                      speak: false,
                      handRaise: false
                    }).then(() => {

                    })

                  })
              }

            }
          }
        })
      }
    }

    // let callEnd=new JoinCall()
    // callEnd.endCall()
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            isSearch={true}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            value={this.state.text}
            changeText={(text1: any) => this.changeText(text1)}
            placeholder={'Search for Discussions'}
            right2BtnActn={() => this.props.navigation.navigate('Notification')}
            rightBtnActn={() => this.props.navigation.navigate('Profile')}
          />
        </View>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isSharePopupVisible}>
          <SharePopup shareData={this.state.shareData} hideSharePopup={() => this.setState({ ...this.state, isSharePopupVisible: false })} />
        </Modal>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isNotifyPopupVisible}>
          <NotifyPopup notifyData={this.state.notifiData} sendNotifyPopup={(data: any) => this.sendNotifi({ time: data, event: this.state.notifiData })} hideNotifyPopup={() => this.setState({ ...this.state, isNotifyPopupVisible: false })} />
        </Modal>
        <View style={style.eventbtn}>
          <TouchableOpacity
            onPress={() => this.setState({ isactive: true, text: '' })}>
            <Text style={{ color: 'white' }}>LIVE</Text>
            <View style={this.state.isactive ? style.activeButton : style.unactiveButton} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ isactive: false, text: '', })}>
            <Text style={{ color: 'white' }}>UPCOMING</Text>
            <View style={this.state.isactive ? style.unactiveButton : style.activeButton} />
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scrollVw} showsVerticalScrollIndicator={false}>

          {this.state.isactive ?
            this.state.LiveEvent.length == 0 ?
              <View style={style.noDataVw}>
                <Text style={style.noDataTx} >{this.state.LiveEventMessage}</Text>
              </View>
              :
              <FlatList
                style={{ marginTop: 20, marginBottom: 20 }}
                data={this.state.LiveEvent}
                renderItem={({ item, index }: any) => (
                  <CustomFlatView
                    item={item}
                    text={true}
                    isInProgress={this.state.roomIndex == index ? true : false}
                    saveEvent={(data: any) => this.EventSave(data)}
                    upComing={false}
                    press={(data: any) => this.joinCall(data)}
                  />
                )}
                horizontal={false}
              />
            : (
              this.state.UpcomingEvent.length == 0 ?
                <View style={style.noDataVw}>
                  <Text style={style.noDataTx} >{this.state.UpcomingEventMessage}</Text>
                </View>
                :
                <FlatList
                  style={{ marginTop: 20, marginBottom: 20 }}
                  data={this.state.UpcomingEvent}
                  renderItem={({ item, index }: any) => (
                    <CustomFlatView
                      item={item}
                      isInProgress={this.state.roomIndex == index ? true : false}
                      text={true}
                      saveEvent={(data: any) => this.EventSave(data)}
                      upComing={true}
                      OnClickShare={(data: any) => this.OnClickShare(data)}
                      OnClickNotify={(data: any) => {
                        this.setState({ ...this.state, isNotifyPopupVisible: true, notifiData: data })
                      }}
                    />
                  )}
                  horizontal={false}
                />
            )}
        </ScrollView>
        {this.props.loginResponse != undefined ?
          this.props.loginResponse.role != undefined ?
            this.props.loginResponse.role != undefined && this.props.loginResponse.role == 'moderator' ?
              this.state.usereventId != '' ?
                <View style={style.bottomVw}>
                  <View style={style.sbTextVw}>
                    <View style={style.vwImg}>
                      <Image source={this.state.eventImage != '' ? { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/live-talks/' + this.state.eventImage } : Images.placeholder_circle} style={style.eventImg} />
                    </View>

                    <View style={[style.textVw,]} >

                      <Text style={style.eventtitleTxt} numberOfLines={2} onPress={() => this.joinCall({ _id: this.state.eventId })}>
                        {this.state.eventTitle}
                      </Text>

                    </View>
                    <View style={[style.mainbtnVw1,]}>

                      <TouchableOpacity style={style.handVw} onPress={() => this.leaveCall()}>
                        <Image style={style.handImg} source={require('./Assets/close.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                : null
              : this.state.isIncall ?
                <View style={style.bottomVw}>
                  <View style={style.sbTextVw}>
                    <View style={style.vwImg}>
                      <Image source={this.state.eventImage != '' ? { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/live-talks/' + this.state.eventImage } : Images.placeholder_circle} style={style.eventImg} />
                    </View>

                    <View style={[style.textVw,]} >

                      <Text style={style.eventtitleTxt} numberOfLines={2} onPress={() => this.joinCall({ _id: this.state.eventId })}>
                        {this.state.eventTitle}
                      </Text>
                      {/* <Text style={style.speakerTxt} numberOfLines={1}>
                          {this.state.speakerName}
                        </Text> */}
                    </View>
                    <View style={style.mainbtnVw}>
                      <TouchableOpacity style={style.handVw} onPress={() => this.handRaise()}>
                        <Image style={style.handImg} source={require('./Assets/hand.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={style.handVw} onPress={() => this.leaveCall()}>
                        <Image style={style.handImg} source={require('./Assets/close.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                : null
            : this.state.isIncall ?
              <View style={style.bottomVw}>

                <View style={style.sbTextVw}>
                  <View style={style.vwImg}>
                    <Image source={this.state.eventImage != '' ? { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/live-talks/' + this.state.eventImage } : Images.placeholder_circle} style={style.eventImg} />
                  </View>

                  <View style={[style.textVw,]} >

                    <Text style={style.eventtitleTxt} numberOfLines={2} onPress={() => this.joinCall({ _id: this.state.eventId })}>
                      {this.state.eventTitle}
                    </Text>
                    {/* <Text style={style.speakerTxt} numberOfLines={1}>
                    {this.state.speakerName}
                  </Text> */}
                  </View>
                  <View style={style.mainbtnVw}>
                    <TouchableOpacity style={style.handVw} onPress={() => this.handRaise()}>
                      <Image style={style.handImg} source={require('./Assets/hand.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.handVw} onPress={() => this.leaveCall()}>
                      <Image style={style.handImg} source={require('./Assets/close.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View> : null :
          <View style={style.bottomVw}>
            <Text>{this.state.isIncall}</Text>
          </View>
        }
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isLoading}>
          <View style={style.popupView}>
            <ActivityIndicator size="large" color="#ffffff" />

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
    userResponse: state.LoginReducer.userInfo.userData,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(LiveTalks);
