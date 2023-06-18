import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, Image, } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Images from '../../Resources/Images';
import {style} from './style';
import firestore from '@react-native-firebase/firestore';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../Resources/Colors';

interface Props {
  item: any;
  text?: any;
  press?: any;
  isCall?: any;
  viewStyle?: any;
  upComing?: Boolean;
  OnClickShare?:any;
  OnClickNotify?:any;
  saveEvent?: any;
  isInProgress?: boolean
}

class CustomFlatView extends Component<Props> {

  state={
    Participants:[],
    userId:'',
    isOnline:false,
    userEventId:'',
    role:'',
  }
  componentDidMount() {
    AsyncStorage.getItem('loginId').then((res:any)=>{
this.setState({...this.state,userId:res.split('"')})
firestore().collection('eventUser').doc(res.split('"')[0]).onSnapshot((onResult:any) => {
  
  if(onResult.data()==undefined){
  }
  else{
this.setState({...this.state,userEventId:onResult.data().eventId==undefined?'':onResult.data().eventId})
  }
})
    })

    AsyncStorage.getItem('loginData').then((res: any) => {
       let data = JSON.parse(res)
       if(data!=undefined){
        this.setState({...this.state,role:data.data==undefined&&data.data.role==undefined?'':data.data.role})
       }
      
    })
    this.customFormatDate("")
    
    this.getParticipant()
  }

  customFormatDate = (item: any) => {
    var end = moment(new Date())
    var duration = moment(item).diff(moment(end))

    var hours = moment.duration(duration);

    var val = hours.days() < 1 ?
      (hours.asHours() < 1 ?
        (
          hours.asMinutes() < 1 ?

            (
              hours.asSeconds() < 1 ? "0 secs ago" : (hours.asSeconds()).toString() + " secs ago"
            )
            : (hours.asMinutes()).toString() + " mins ago"
        )
        : (hours.asHours().toFixed(0)).toString() + " hours ago"
      )
      : ((hours.asDays()).toFixed(0)).toString() + " days ago"

    console.log(val)
    return val
  }
  componentWillReceiveProps(props: any) {
    // this.getParticipant()
  }

  getParticipant=()=>{
    
    firestore().collection('liveTalks').doc(this.props.item._id).onSnapshot((onResult:any) => {
      if(onResult.data()==undefined){
      }
      else{
        let data: any=onResult.data().participants
        // console.log('onResult.data().participants',data)
        if(data!=undefined){
        if(data.length > 0){
          let participantsData :any=[];
          let isJoin=data.indexOf(this.state.userId.toString())
          if(isJoin==-1){
            this.setState({...this.state,isOnline:false})
          }
          else{
            this.setState({...this.state,isOnline:true})
          }
          for(let i=0;i<data.length;i++){

            
            firestore().collection('eventUser').doc(data[i]).get().then((documentSnapshot)=>{
              // let data:any=this.state.Participants
              participantsData.push(documentSnapshot.data())
              this.setState({ ...this.state,Participants: participantsData})
              
            })
            

            
          }
        }
        else{
          let data1:any=[]
          this.setState({ ...this.state,Participants: data1,isOnline:false})
        }
        
      }
      else{
        let data1:any=[]
        this.setState({ ...this.state,Participants: data1,isOnline:false})
      }
        
      }
    })
  

  }
  render() {
    const { upComing, OnClickShare, OnClickNotify } = this.props
    const time= moment(this.props.item.startDateTime).format("YYYY-MM-DD hh:mm:ss")


    
    return (
      <View>
        {this.props.isCall ? (
          <View style={style.callView}>
           
            <View style={[style.userView,{overflow:'hidden',borderColor:this.props.item.speak?color.APP_BODY_BLUE:null}]}>
              <Image style={style.userImage} source={this.props.item.image!=undefined?{uri:'https://accelerateadmin.iphoneapps.co.in/uploads/moderator/'+this.props.item.image}:Images.placeholder_circle} />
            </View>
            {
              this.props.item.speak?null: <View style={[style.micView,{borderRadius:10}]}>
              <Image style={style.handImg} source={Images.mic}/>
              </View>
            }
           
            <Text style={style.nameTxt} numberOfLines={1}>{this.state.userId==this.props.item.id?'me':this.props.item.name}</Text>
          </View>
        ) : (
          <View style={style.detailView}>
            {
              upComing ? <Text style={[style.timeTxt]}>{time}</Text> : null
            }
             
            <View style={[style.detailVw,]}>
              <View style={style.imgVw}>
              <View style={style.imageVw}>
              <Image
                source={this.props.item.uploadedFile!= undefined?{uri:'https://accelerateadmin.iphoneapps.co.in/uploads/live-talks/'+this.props.item.uploadedFile.path}:Images.placeholder_circle}
                style={style.profileImg}
              />
              </View>
              </View>
              <Text style={style.titleText}>{this.props.item.title}</Text>
              <TouchableOpacity onPress={()=>this.props.saveEvent({id:this.props.item._id,bookmark:this.props.item.bookmark!=undefined?this.props.item.bookmark.bookmarked!=undefined? this.props.item.bookmark.bookmarked?false:true:true:true})}>
              <Image style={style.remImg} source={this.props.item.bookmark!=undefined?this.props.item.bookmark.bookmarked!=undefined? this.props.item.bookmark.bookmarked?require('../../Resources/Assets/rem.png'):require('../../Resources/Assets/unRem.png'):require('../../Resources/Assets/unRem.png'):require('../../Resources/Assets/unRem.png')} />
              </TouchableOpacity>
            </View>
            <View style={style.moderView}>
              <Text style={style.moderTxt} numberOfLines={1}>Moderator:-</Text>
              <Text style={style.moderdetail} numberOfLines={2}>
                {this.props.item.moderators!= undefined? this.props.item.moderators.map((item:any,index:any)=>{return(index!=0?' '+item.name:''+item.name)}).join(','):''}
              </Text>
            </View>
            {
               upComing ?
               null
            :<View style={style.partView}>
            <Text style={style.parttxt} numberOfLines={1}>Participant:-</Text>
            <Text style={style.partdetail} numberOfLines={2}>
              {
              this.state.Participants.length==0?
              this.state.Participants==[]?'':
              this.state.Participants.map((item:any,index:any)=>{
              if(item!=undefined){
                return(index!=0?item.name!=undefined && item.name!=''?' '+item.name:' username_'+index:item.name!=''?item.name:'username_'+index)}
                else{
                  null
                }}).join(',')
             :this.state.Participants.slice(0, 5).map((item:any,index:any)=>{
              if(item!=undefined){
                if(index<3){
                  return(index!=0?item.name!=''?' '+item.name:' username_'+index:item.name!=''?item.name:'username_'+index)
                }else{
                  return( '+'+(this.state.Participants.length-Number(index))+' more.')
                }
              }
              }).join(',')
            
            }
            </Text>
          </View>}
            {
               upComing ? 
              <View style={{ flexDirection:'row',alignSelf:"center" }}>
            <TouchableOpacity
              style={style.sharebtn}
              onPress={() => OnClickNotify(this.props.item)}>
              <Text style={style.jointxt}>NOTIFY</Text>
            </TouchableOpacity>

               <TouchableOpacity
              style={style.sharebtn}
              onPress={() => OnClickShare(this.props.item)}>
              <Text style={style.jointxt}>SHARE</Text>
            </TouchableOpacity>
            </View>
            :
            <TouchableOpacity
              style={style.joinbtn}
              onPress={() => this.props.press(this.props.item)}>
              <Text style={style.jointxt}>{this.state.role=='moderator'?this.state.userEventId==this.props.item._id?'IN PROGRESS' : 'JOIN CLASS':this.state.isOnline ? 'IN PROGRESS' : 'JOIN CLASS'}</Text>
            </TouchableOpacity>
            }
{/* {console.log('role',this.state.role,'   userEventid',  this.state.userEventId,  ' eventId:',this.props.item._id,'-----',this.props.item)} */}
          </View>
        )}
      </View>
    );
  }
}

export default CustomFlatView;
