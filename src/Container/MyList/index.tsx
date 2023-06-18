import React from 'react';
import { Text, View, SafeAreaView, Image, Animated, Modal, Alert,ActivityIndicator,TouchableOpacity ,Share} from 'react-native';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import { style } from './style';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressCircle from 'react-native-progress-circle';
import { ScrollView,  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Icons from 'react-native-vector-icons/FontAwesome5'
import { NotifyPopup, SharePopup } from '../../Components/CustomPopup';
import { AllCourseModl } from '../../Modals/CourseModl';
import { getAllCourse, getBookmark, getCourse, setBookmark, setFavourite } from '../../Redux/ReduxAPIHandler/CourseApis';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import { internetcheck } from '../../Constants/InternetCkeck';
import { getQuestionList } from '../../Redux/ReduxAPIHandler/QuestionApis';
import color from '../../Resources/Colors';
import { getEvent, getSaveEvent, SaveEvent } from '../../Redux/ReduxAPIHandler/LiveTalksApi';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import * as navigation from '../../Navigation/NavigatorService';
import base64 from 'react-native-base64'

export interface Props {
  navigation: any;
  loginResponse: any;
  userResponse: any;
}

const RenderInProgressView = (props: any) => {

  const { section, index,callEvent, token,playVideo,eventID } = props
  const regex = /(<([^>]+)>)/ig;
  const result = section.courseDetail != undefined ? section.courseDetail.description.replace(regex, '') : section.lesson != undefined ? section.lesson.description.replace(regex, '') : section.course && section.course.description != undefined ? section.course.description.replace(regex, '') : '';
  const id=eventID=='0'?section.courseDetail!=undefined && section.courseDetail._id!=undefined?section.courseDetail._id:'12':
          eventID=='1'?section.courseDetail!=undefined && section.courseDetail._id!=undefined?section.courseDetail._id:'12':
          eventID=='2'?section.course!=undefined && section.course._id!=undefined?section.course._id:'12':
          eventID=='3'?section.lesson.course!=undefined && section.lesson.course._id!=undefined?section.lesson.course._id:'12':'12'
   
  const total = section.courseDetail != undefined ? Number(section.tottalWatchedLesson) * 100 : null
  const value = section.courseDetail != undefined ? Number(section.tottalLesson) : null
   const courseDetailURL =  section.courseDetail!=undefined ? section.courseDetail.uploadedFile!=undefined?section.courseDetail.uploadedFile.path:'':''
   const lessonURL =  section.courseDetail==undefined ? section.lesson!=undefined?section.lesson.uploadedFile!=undefined?section.lesson.uploadedFile.path:'':'':'';
   const courseURL =  section.courseDetail==undefined && section.lesson==undefined?section.course.uploadedFile!=undefined?section.course.uploadedFile.path:'':''
  return (
    <View style={style.cont}>
      <View style={[style.content, { borderTopWidth: index == 0 ? 0 : 0.3, paddingTop: index == 0 ? 0 : 10, paddingBottom: index == 0 ? 0 : 10, borderColor: color.APP_WHITE, justifyContent: "space-between", }]}>
        <TouchableOpacity style={style.imgVw} onPress={()=>playVideo(id)}>
          <Image source={
            section.courseDetail != undefined ?
             { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/' + courseDetailURL} 
            : section.lesson != undefined ?
             { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/lessons/' + lessonURL} 
             : section.course != undefined ? 
             { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/' + courseURL} 
             : Images.placeholder
          } style={style.img}
          />
          <Image source={require('./Assets/Icon_play.png')} style={style.playImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={style.centerTxtView} onPress={()=>playVideo(id)}>
          <Text numberOfLines={1} style={style.Text1}>{section.courseDetail != undefined ? section.courseDetail.title : section.lesson != undefined ? section.lesson.title : section.course != undefined ? section.course.title : ''}</Text>
          <Text numberOfLines={2} style={style.Text2}>
            {result}
          </Text>
        </TouchableOpacity>
        {

          section.lesson != undefined ?
            <View style={[style.percentageView, { justifyContent: section.title == "Saved Lessons ( 2 )" ? "center" : 'space-between', }]}>
              <TouchableOpacity onPress={()=>setbookmark({ callEvents: callEvent,data: section, token: token })}>
                <Text style={style.removeTxt}>Remove</Text>
              </TouchableOpacity>
            </View> :
            section.courseDetail != undefined ?
              <View style={[style.percentageTxtView, { justifyContent: section.title == "Saved Lessons ( 2 )" ? "center" : 'space-between', }]}>
                <Image source={require('./Assets/tick.png')} style={[style.tick, {}]} />
                <ProgressCircle
                  outerCircleStyle={{ zIndex: -111 }}
                  containerStyle={{ zIndex: 0 }}
                  percent={(Number(section.totalWatched) ) / Number(section.courseDetail.duration)* 100}
                  radius={style.progressBarRadius}
                  borderWidth={style.borderWidth}
                  color="#00e5ce"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={style.percentageTxt}>{parseInt((Number(section.totalWatched)  / Number(section.courseDetail.duration)* 100).toFixed(2))>100?100:parseInt((Number(section.totalWatched)  / Number(section.courseDetail.duration)* 100).toFixed(2))+'%'}</Text>
                </ProgressCircle>
                <Text style={[style.Text2,{textAlign:'center',marginTop:2}]}>{section.tottalWatchedLesson +' of '+ section.tottalLesson}</Text>
              </View>
              :
              <View style={[style.percentageView, { justifyContent: section.title == "Saved Lessons ( 2 )" ? "center" : 'space-between', }]}>
                <TouchableOpacity onPress={()=>setCourse({ callEvents: callEvent,data: section, token: token })}>
                  <Text style={style.removeTxt}>Remove</Text>
                </TouchableOpacity>
              </View>
        }
      </View>
    </View>
  )
}
const Eventsave = async (data: any) => {
  let save = await SaveEvent({ token: data.token, param: data });
  
  data.callEvents()

  
}



const setbookmark = async (data:any) => {
       let deletedata = await setBookmark({ token: data.token, data: { courseId: data.data.lesson.course._id, bookmarked: false, lessonId: data.data.lesson._id } });
      data.callEvents()
     

   
}

const setCourse= async (data: any) =>{
 
  if(data.data.course!=null&& data.data.course!=undefined){
    let dataCourse = await setFavourite({
      token: data.token, data: {
        courseId: data.data.course._id,
        favourite:false
      }
    });
    data.callEvents()
  }
  else{
    
  }
  
}

const RenderLivetalks = (props: any) => {
  const { section, index, notify, share, token, callEvent } = props
  
  const time= moment(section.startDateTime).format("YYYY-MM-DD hh:mm:ss")
  return (
    <View style={[style.cont, { flexDirection: 'column', }]}>
      <View style={[style.content, { flexDirection: 'column', borderTopWidth: index == 0 ? 0 : 1, borderTopColor: '#ccc' }]}>
        <Text style={style.timeTxt}>{time}</Text>
        <View style={[style.detailVw, { marginTop: 10 }]}>
          <View style={style.imgsVw}>
            <View style={style.imageVw}>
              <Image source={section.uploadedFile != undefined ? { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/live-talks/' + section.uploadedFile.path } : Images.placeholder_circle} style={style.liveTalksimg} />
            </View>
          </View>

          <Text style={style.titleText}>{section.title}</Text>
          <TouchableOpacity onPress={() => Eventsave({ callEvents: callEvent, id: section._id, bookmark: section.bookmark != undefined ? section.bookmark.bookmarked != undefined ? section.bookmark.bookmarked ? false : true : true : true, token: token })}>
            <Image style={style.remImg} source={section.bookmark != undefined ? section.bookmark.bookmarked != undefined ? section.bookmark.bookmarked ? require('../../Resources/Assets/rem.png') : require('../../Resources/Assets/unRem.png') : require('../../Resources/Assets/unRem.png') : require('../../Resources/Assets/unRem.png')} />
          </TouchableOpacity>

        </View>
        <View style={style.moderView}>
          <Text style={style.moderTxt}>Moderator:- </Text>
          <Text numberOfLines={2} style={style.moderdetail}>{section.moderators != undefined ? section.moderators.map((item: any, index: any) => { return (index != 0 ? ' ' + item.name : '' + item.name) }).join(',') : ''}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignSelf: "center", marginTop: 5 }}>
          <TouchableOpacity style={style.sharebtn} onPress={()=>notify(section)}>
            <Text style={style.jointxt}>NOTIFY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.sharebtn} onPress={()=>share(section)}>
            <Text style={style.jointxt}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

class MyList extends React.Component<Props> {

  spinValue = new Animated.Value(0);

  state = {
    activeSections: [],
    SECTIONSARR: [],
    isSharePopupVisible: false,
    isNotifyPopupVisible: false,
    inProgressData: [],
    CompleteData: [],
    SavedLessons: [],
    LiveTalks: [],
    notifiData:{},
    isInternet: true,
    isLoading:false,
    role:'',
    isJoin:false
  };

  _renderSectionTitle = (section: any) => {
    return (
      <View style={style.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section: any, index: any, isActive: any, sections: any) => {
    
    const halfRotation = {
      from: {
        rotate: '0deg',
      },
      to: {
        rotate: '180deg',
      }
    }

    const backRotation = {
      from: {
        rotate: '180deg',
      },
      to: {
        rotate: '0deg',
      }
    }

    


    return (
      <View style={[style.header, { borderTopLeftRadius: isActive ? section.content != null ? 15 : null : null, borderTopRightRadius: isActive ? section.content != null ? 15 : null : null, borderRadius: isActive ? section.content != 15 ? 15 : null : 15, }]}>
        <View>
          <Text style={{ color: 'white' }}>{section.title} </Text>
          {isActive ?section.content != null && section.content != undefined ? section.content.length!=0?<View style={style.underLine} />:null:null:null}
          
        </View>

        <Animatable.Image
          duration={200}
          easing="ease-out"
          //@ts-ignore
          animation={isActive ? halfRotation : backRotation}
          source={require('./Assets/down-arrow.png')}
          tintColor={"white"}
          style={style.arrowImg}
        >
        </Animatable.Image>

      </View>
    );
  };

  _renderContent = (section: any,i:any) => {
 
    return (
      <View >
        {console.log('this.props',this.props)}
        {section.id == 5 && section.content != null && section.content != undefined? section.content.map((data: any, index: any) => {
          return <RenderLivetalks callEvent={this.updateData} index={index} token={this.props.loginResponse==undefined || this.props.loginResponse.token==undefined?'':this.props.loginResponse.token} section={data} notify={(data:any) => this.setState({ ...this.state, isNotifyPopupVisible: true,notifiData:data })} share={(data:any) => this.OnClickShare(data)} />
        }) : section.content != null && section.content != undefined ? section.content.map((data: any, index: any) => {
          return <RenderInProgressView eventID={i} callEvent={this.updateData} token={this.props.loginResponse==undefined || this.props.loginResponse.token==undefined?'':this.props.loginResponse.token} index={index} section={data}  playVideo={(id:any) =>this.props.navigation.navigate('Player',{id:id,continueWatching:'0'})}/>
        }) : null}
        {
          section.content != null && section.content != undefined ? <View style={{ width: '100%', padding: 8, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, backgroundColor: '#1D1233' }} /> : null
        }

      </View>
    );
  };

  
  _updateSections = (activeSections: any) => {

    var temp: any[] = [...this.state.SECTIONSARR]
    temp = temp.map(data => {
      if (activeSections.includes(data.id)) {
        return { id: data.id, title: data.title, content: data.content, isOpen: true, }
      } else {
        return { id: data.id, title: data.title, content: data.content, isOpen: false, }
      }
    })
    this.setState({ SECTIONSARR: temp })

    this.setState({ activeSections });
  };

  openMenu = () => {
    this.props.navigation.openDrawer();
  };

  

  componentDidMount = async () => {
    
    this.props.navigation.addListener('blur', (event: any) => {
      internetcheck().then((res) => {
        // console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ ...this.state,isInternet: error })
        Toast.show('Internet not Working');
      })
    });
    this.props.navigation.addListener('focus', (event: any) => {
      this.checkuser()
      this.updateData()
      this.setState({ ...this.state,isLoading: true  });

      AsyncStorage.setItem("ScreenName", "My List")
      internetcheck().then((res) => {
        // console.log('internet check', res)
        this.setState({ isInternet: res })
      }).catch((error) => {
        this.setState({ isInternet: error })
        Toast.show('Internet not Working');
      })
      this.setState({ ...this.state,isLoading: false,  });
    });
    this.updateData()
    this.setState({ ...this.state,isLoading: true  });
  }


  checkuser=()=>{
    AsyncStorage.getItem('loginData').then((res:any)=>{
      let data=JSON.parse(res)
      if(data.role=='guest'){
        this.setState({...this.state,role:data.role,isLoading: false,isJoin:true})
      }
      else{
        this.setState({...this.state,role:data.role,isLoading: false,})
      }
      
    })
  }

  OnClickShare = async (data: any) => {

    var Eventdate = moment(data.startDateTime).format("YYYY-MM-DD hh:mm:ss")
    var name=this.props.userResponse!=undefined&& this.props.userResponse.name!=undefined?this.props.userResponse.name:'user'+' '+this.props.userResponse!=undefined&&this.props.loginResponse.lastName!=undefined?this.props.loginResponse.lastName:''
    var meetingCode=base64.encode(data._id+ '/' +name); 
    try {
      const result = await Share.share({
        message:
          "Event name: " + data.title + '\n' + "Start DateTime: " + Eventdate + '\n' + 'Meeting code:' +meetingCode,
      });
      AsyncStorage.setItem('name',name)

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


  updateData = async () => {
    

    
    let inProgress: any = await this.inProgressData();
    let complete: any = await this.CompletedData();
    let SaveLesson: any = await this.SaveLessonData();
    let QuestionAnswer: any = await this.QAData();
    let SaveCourse: any = await this.SaveCourseData();
    let SaveLiveTalks: any = await this.SaveLiveTalks();
    
    

    let inProgressLength = inProgress.data != null ? inProgress.data.length : '0';
    let completeLength = complete.data != undefined && complete.data != null ? complete.data.length : 0;
    let SaveLessonLength = SaveLesson.data != undefined && SaveLesson.data != null ? SaveLesson.data.length : 0;
    let QuestionAnswerLength = QuestionAnswer.data != undefined && QuestionAnswer.data != null ? QuestionAnswer.data.length : 0;
    let SaveCourseLength = SaveCourse.data != undefined && SaveCourse.data != null ? SaveCourse.data.length : 0;
    let SaveLiveTalksLength = SaveLiveTalks.data != undefined && SaveLiveTalks.data != null ? SaveLiveTalks.data.length : 0;

    const myListData = [];
    const obj = {
      id: 0,
      title: 'In progress(' + inProgressLength + ')',
      content: inProgress.data,
      isOpen: false,
    };
    myListData.push(obj)
    const obj1 = {
      id: 1,
      title: 'Completed (' + completeLength + ')',
      content: complete.data,
      isOpen: false,
    };
    myListData.push(obj1)
    const obj2 = {
      id: 2,
      title: 'Favourite Courses(' + SaveCourseLength + ')',
      content: SaveCourse.data,
      isOpen: false,
    };
    myListData.push(obj2)
    const obj3 = {
      id: 3,
      title: 'Saved Lessons (' + SaveLessonLength + ')',
      content: SaveLesson.data,
      isOpen: false,
    };
    myListData.push(obj3)
    const obj4 = {
      id: 4,
      title: 'Q&A asked (' + QuestionAnswerLength + ')',
      content: QuestionAnswer.data,
      isOpen: false,
    };
    myListData.push(obj4)
    const obj5 = {
      id: 5,
      title: 'Live Talks(' + SaveLiveTalksLength + ')',
      content: SaveLiveTalks.data,
      isOpen: false,
    };
    myListData.push(obj5)
    
    this.setState({ ...this.state, SECTIONSARR: myListData })
  
  
  }

  inProgressData = async () => {
    if(this.props.loginResponse!=undefined||this.props.loginResponse.token!=undefined){
    let data: AllCourseModl[] = await getAllCourse({ token: this.props.loginResponse.token, type: '1' }) as AllCourseModl[];
    this.setState({ ...this.state,isLoading: false,  });
    console.log('inProgressData',JSON.stringify(data))
    return data;
    }

  }

  CompletedData = async (): Promise<AllCourseModl[] | undefined> => {
    if(this.props.loginResponse!=undefined||this.props.loginResponse.token!=undefined){

    let data: AllCourseModl[] = await getAllCourse({ token: this.props.loginResponse.token, type: '2' }) as AllCourseModl[];
    this.setState({ ...this.state,isLoading: false,  });
    return data;

    }

  }
  SaveLessonData = async (): Promise<any> => {
    if(this.props.loginResponse!=undefined&&this.props.loginResponse.token!=undefined){
    let Savedata = await getBookmark(this.props.loginResponse.token);
    this.setState({ ...this.state,isLoading: false,  });
    return Savedata;
    }
  }
  QAData = async (): Promise<any> => {
    if(this.props.loginResponse!=undefined||this.props.loginResponse.token!=undefined){
    let qAdata = await getQuestionList({ type: 1, token: this.props.loginResponse.token });
    this.setState({ ...this.state,isLoading: false,  });
    return qAdata;
    }
  }
  SaveCourseData = async () => {
    if(this.props.loginResponse!=undefined||this.props.loginResponse.token!=undefined){
    let Coursedata = await getCourse(this.props.loginResponse.token);
    console.log('Coursedata>>>>>>>>',JSON.stringify(Coursedata))
    this.setState({ ...this.state,isLoading: false,  });
    return Coursedata;
    }
  }
  SaveLiveTalks = async () => {
    if(this.props.loginResponse!=undefined||this.props.loginResponse.token!=undefined){
    let data: any = await getSaveEvent({ token: this.props.loginResponse.token});
    this.setState({ ...this.state,isLoading: false,  });
    return data;
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
      this.props.navigation.navigate('LiveTalks')
      this.setState({ ...this.state, isNotifyPopupVisible: false })
    }
    catch (error) {
      this.setState({ ...this.state, isNotifyPopupVisible: false })
    }

  }




  render() {
    return (
      <SafeAreaView style={[style.container, {}]}>
        <View style={style.headerVw}>
          <NavigationHeader
            isMultiple={true}
            title={'MY LIST'}
            leftBtnActn={() =>this.state.role!='guest'? this.openMenu():{}}
            btnImage={Images.menu_icon}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            right2BtnActn={()=>this.state.role!='guest'?this.props.navigation.navigate('Notification'):{}}
            rightBtnActn={() => this.state.role!='guest'?this.props.navigation.navigate('Profile'):{}}
          />
        </View>
{this.state.role!='guest'?
        <ScrollView style={{ width: '100%', height: '100%' }}>


          <View style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingBottom: 50,
            marginBottom: 80
          }}>
            <Accordion
              underlayColor={'transparent'}
              sections={this.state.SECTIONSARR}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              expandMultiple={true}
              duration={200}
            />
          </View>
          <Modal
            animated={true}
            animationType={'fade'}
            transparent={true}
            visible={this.state.isSharePopupVisible}>
            <SharePopup hideSharePopup={() => this.setState({ ...this.state, isSharePopupVisible: false })} />
          </Modal>

          <Modal
            animated={true}
            animationType={'fade'}
            transparent={true}
            visible={this.state.isNotifyPopupVisible}>
            <NotifyPopup notifyData={this.state.notifiData} sendNotifyPopup={(data: any) => this.sendNotifi({ time: data, event: this.state.notifiData })} hideNotifyPopup={() => this.setState({ ...this.state, isNotifyPopupVisible: false })} />
          </Modal>
        </ScrollView>:null
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
            <TouchableOpacity style={style.crossIcon} onPress={() => this.setState({ ...this.state, isViewUser: false,isJoin:false},()=>this.props.navigation.goBack())}>
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
    userResponse: state.LoginReducer.userInfo.userData,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
