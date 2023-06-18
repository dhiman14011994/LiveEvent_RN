import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Image, SafeAreaView, FlatList, NativeModules, Platform, StatusBarIOS,Modal } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './style';
import ChatsCell from '../../Components/ChatsCell';
// import { OpenDrawerHeaderBtn } from '../../Custom/CustomComponents';
//@ts-ignore
import { connect } from 'react-redux';
// import LocalDataManager from '../../Utils/LocalDataManager';
import firestore from '@react-native-firebase/firestore';
import { updateReadUnreadStatus } from '../../Firebase/FirestoreHandler';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../res/colors';
import * as navigation from '../../Navigation/NavigatorService';

const { StatusBarManager } = NativeModules;
let loginData: any;

export interface props {
  navigation: any;
  id: any,
  userResponse:any;
  notificationsInfo: any,
  loginResponse: any;
};

class Chats extends Component<props, object> {
  notificationListener: any = undefined

  state = {
    chatsArr: [] as any[],
    newArray:[] as any[],
    showLoader: false,
    isInternetError: false,
    isDataNotFoundError: false,
    isHighlighted: false,
    isCalled: false,
    statusBarHeight: 0,
    role:'',
    isJoin:false

  }

  componentDidMount = async () => {
    
    
    this.props.navigation.addListener('focus', () => this.refreshData());
    this.getUsers()
    this.checkuser()
  }

  private refreshData() {
    this.getUsers()   
  }

  revealBtnHandler() {
    this.props.navigation.openDrawer();
  }

  notificationsHandler() {
    this.props.navigation.navigate('Notifications')
  }
  
checkuser=async ()=>{
  await AsyncStorage.getItem("loginData").then((data:any) => {
      
    loginData = JSON.parse(data);
    if(loginData.role=='guest'){
      this.setState({...this.state,role:loginData.role,isJoin:true})
    }
    else{
      this.setState({...this.state,role:loginData.role})
    }
    
  });
}
  getUsers = () => {
    const { userResponse } = this.props
   
    if(userResponse!=undefined&&userResponse.id!=undefined){
      let loginUserId = userResponse.id.toString()
  
      firestore().collection('userss').doc(loginUserId).collection('chats').onSnapshot((response) => {
  
        console.log("user success", response);
        const listData: any[] = [];
        var chatData: any = {};
  
        response.docs.forEach((doc: any) => {
          chatData = doc.data();
          listData.push(chatData);
        });
  
        // console.log('Users >>>>>', listData)
  
        this.setState({ isCalled: true, chatsArr: listData })
        //Get Last msg of Each User 
  
        this.getLastMessageforChatArr(listData)
  
        // this.getImageforChatArr(listData)
      }, (error) => {
        // console.log("user error", error);
        Alert.alert(error.message);
      });
    }
    
  }

  getUserUpdateName = () => {
    console.log("get chat array on call getusername method >>> ", this.state.chatsArr)
  }

  getLastMessageforChatArr(chatsArr: any) {

    // console.log("chatsArr >>>>>", chatsArr)

    chatsArr.forEach((chat: any, index: any) => {

      // console.log("chat.chatId >>>>>", chat.chatId)

      firestore().collection('messages').doc(chat.chatId.toString()).collection('lastMsg').doc('lastMsg').onSnapshot((response) => {

        // console.log('getLastMessageforChatId Response >>>>>', response.data())

        let lastMsgData: any = response.data()

        // console.log("lastMsgData >>>>>", lastMsgData)

        if (lastMsgData != undefined) {
          chat['lastMsg'] = lastMsgData.message
          chat['sentDate'] = lastMsgData.sentDate
          chat['lastImage'] = lastMsgData.image
          chat['senderID'] = lastMsgData.senderID
          chat['status'] = lastMsgData.status
          chat['chatID'] = chat.chatId
          chat['timeStamp'] = lastMsgData.timeStamp

          let chatsArr = this.state.chatsArr

          let ind = this.state.chatsArr.indexOf(lastMsgData.senderID)

          chatsArr[ind] = chat

          this.setState({ chatsArr: chatsArr })
          //this.apiGetUserDetailsById(chat.id, index)
        }

        setTimeout(() => {
          this.sortArray()
        }, 500);

      }, (error) => {
        Alert.alert(error.message);
      });
    });
    setTimeout(() => {
      this.sortArray()
    }, 500);

    this.getUserUpdateName()
    
  }

  getImageforChatArr(chatsArr: any) {

    // console.log("chatsArr >>>>>", chatsArr)

    chatsArr.forEach((chat: any, index: any) => {


    });
  }

  cellSelected(index: any) {
    // console.log("Chat data on cell click >>>>", this.state.chatsArr, index)
    // console.log("Chat data on cell click >>>>", this.state.chatsArr[index])
    
    if (loginData.id != this.state.chatsArr[index].senderID) {
      updateReadUnreadStatus(this.state.chatsArr[index].chatID)
    }
    console.log('this.state.chatsArr[index]',this.state.chatsArr[index])
    this.props.navigation.navigate('Messages', { chatData: this.state.chatsArr[index] })
  }

//   messageActionForUpcoming=(index: any)=>{
//     AsyncStorage.getItem("loginData").then((res:any) => JSON.parse(res)).then((el) => {
      //  console.log("selected Doctor Detail >>>>>",this.state.upcomingAptArr[index].vender_id)
//         // let chat_id=data.id+""+this.state.upcomingAptArr[index].vender_id
//         var data = el.data
//         let chat_id=data.id+""+"600177390911d6598e8d448b"
//         // let senderDict = {
//         //     firstName: this.state.upcomingAptArr[index].vendor.firstname,
//         //     lastName: this.state.upcomingAptArr[index].lastName != undefined ? this.state.upcomingAptArr[index].lastName: "",
//         //     image: this.state.upcomingAptArr[index].vendor.image,
//         //     // email: this.props.loginInfo.email,
//         //     createdOn: Date.now(),
//         //     id: this.state.upcomingAptArr[index].vender_id,
//         //     chatId: chat_id
//         // }
//         let senderDict = {
//           firstName: "test 2",
//           lastName: "tete",
//           image: "",
//           createdOn: Date.now(),
//           id: "600177390911d6598e8d448b",
//           chatId: chat_id
//       }

//         this.props.navigation.navigate('Messages', { chatData: senderDict })
//     })

// }

  openMenu = () => {
    this.props.navigation.openDrawer();
    // this.messageActionForUpcoming("")
    
  };

  sortArray = () => {
    // console.log("call sort method >>> out side", this.state.chatsArr)
    if(this.state.chatsArr.length > 0){
    // console.log("call sort method >>> In side")

      const temp = this.state.chatsArr
      const sortedList = temp.sort((x, y) => {
        return y.timeStamp - x.timeStamp;
    })
    this.setState({...this.state, chatsArr : sortedList, newArray:sortedList})
    // console.log("check SortedList >>> ",sortedList)
      }
    
  }

  render() {    
    // console.log("Unique chat list >>> ",uniqueObjects)

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor:Colors.APP_Splash_BG_COLOR2 }}>
        
        <View style={styles.headerVw}>
          <NavigationHeader
            isMultiple={true}
            title={'CHATS'}
            leftBtnActn={() =>this.state.role!='guest'? this.openMenu():{}}
            right2BtnActn={()=>this.state.role!='guest'?this.props.navigation.navigate('Notification'):{}}
            btnImage={Images.menu_icon}
            rightImage={Images.user_icon}
            right2Image={Images.bell_icon}
            rightBtnActn={() => this.state.role!='guest'?this.props.navigation.navigate('Profile'):{}}
          />
        </View>
        <View style={styles.container}>
        {this.state.role!='guest'?
          <FlatList
            style={{ width: '100%', marginBottom: 6 }}
            data={this.state.newArray}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={({ item, index }) => <ChatsCell
              onClickEvent={() => this.cellSelected(index)}
              item={item}
              index={index}
              myId={this.props.loginResponse!=undefined&&this.props.loginResponse.id!=undefined?this.props.loginResponse.id:''}
            />}
          />:null}
          
        </View>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isJoin}>
          <View style={styles.permissionMainVw}>
            <View style={styles.permissionMsgVw1}>
            <TouchableOpacity style={styles.crossIcon} onPress={() => this.setState({ ...this.state, isViewUser: false,isJoin:false },()=>this.props.navigation.goBack())}>
                <Image style={styles.crossIconImg} source={require('../LiveTalks/Assets/close.png')} />
              </TouchableOpacity>
              <Text style={styles.InvTx}>{'Explore?'}</Text>
              <Text style={styles.userNmTx}>{'Want to explore more of it? JOIN US Now!!'}</Text>
              
                <TouchableOpacity style={[styles.permissionBtn1, { borderRadius: 15, marginLeft: '2%' }]} onPress={() => this.setState({...this.state,isJoin:false},()=>navigation.reset('Login'))}>
                  <Text style={styles.btnTx}>{'JOIN NOW'}</Text>
                </TouchableOpacity>
              
            </View>
          </View>

        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginResponse: state.LoginReducer.loginInfo.login.data,
  userResponse: state.LoginReducer.userInfo.userData,
});

export default connect(mapStateToProps)(Chats);