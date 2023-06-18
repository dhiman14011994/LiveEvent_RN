// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Platform, Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const style = ScaleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  headerVw: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  moreVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 30,
    width: 130,
    marginBottom: 5,
    marginTop: 5,
  },
  handmnVw: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: '50%',
  },
  handvw: {
    height: 30,
    width: 101,
    borderRadius: 8,
    backgroundColor: '#0ECECC',
    justifyContent: 'center',
  },
  speakerVw: {
    marginTop: 10,
    // width: '100%',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // paddingLeft:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModeratorsVw: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  listenerVw: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    
    // backgroundColor:'red'


  },
  userVw: {
    width: 54,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  participantsVw: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImgVw: {
    marginLeft: '5%',
    marginRight: '5%',
    width: 50,
    height:50,
    borderRadius: 50,
    
    

  },
  toastMainVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  toastMsgVw: {
    marginLeft: '7%',
    marginRight: '7%',
    width: '86%',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15
    
  },
  toastMsgTXX:{
    width: '100%',
    fontSize:15
    // flexDirection: 'row',
  },
  permissionMainVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'

  },
  permissionMsgVw: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '40%',

    borderRadius: 20,
    backgroundColor: '#1D1233',
    padding: 5
  },
  permissionMsgVw1: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '40%',

    borderRadius: 20,
    backgroundColor: '#1D1233',
    // padding: 5
  },
  userMsgVw: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '70%',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#1D1233',
    padding: 5
  },

  permissionBtnVw: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  //  backgroundColor:'red'
  },
  followBtnVw: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  //  backgroundColor:'red'
  },
  permissionBtnVw1: {
    
    width: '100%',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red'
  },

  handVw: {
    width: 20,
    height: 20,
    backgroundColor: color.APP_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -4,
    bottom: 25
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  usersImgVw:{
    height:100,
    width:100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop:15
  },
  
  titleMainVw:{
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    // backgroundColor:'red'
  },
  empityVw:{
    width:'25%',
    height:1,
    marginLeft:'3%',
    marginRight:'3%',
    backgroundColor:'white',

  },
  countVw:{
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -10,
    bottom: 36,
    borderRadius:15,
    backgroundColor:color.APP_BODY_BLUE,
  },

  scrollMd:{
    // flex:1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },

  //text

  leavetxt: {
    width: '100%',
    textAlign: 'center',
    color: color.APP_WHITE,
    fontFamily: font.SEGOE_UI_BOLD,
    fontSize: 16,
  },
  handtxt: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  moreTx: {
    color: color.APP_WHITE,
    marginRight: 10,
  },
  ModTx: {

    color: 'white',
    fontSize: 14,
    fontFamily: font.SEGOE_UI,
     textAlign: 'center',
    width: '30%',
  },
  participantTx: {
    marginTop: '2%',
    marginBottom: '2%',
    color: 'white',
    fontSize: 14,
    fontFamily: font.SEGOE_UI,
    textAlign: 'center',
    width: '80%',
  },
  userNameTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    marginTop: 1,
    fontFamily: font.SEGOE_UI,
    textAlign: 'center',
    width: '100%',
  },
  toastMsgTx: {
width:'85%',
  },
  InvTx: {
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: color.APP_WHITE,
    marginTop: 30
  },
  userNmTx: {
    fontFamily: font.SEGOE_UI,
    fontSize: 14,
    color: color.APP_WHITE,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 27
  },
  userdesTx: {
    fontFamily: font.SEGOE_UI,
    fontSize: 14,
    color: color.APP_WHITE,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 27,
    textAlign:'center',
  },
  btnTx: {
    fontSize: 16,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    color: color.APP_BLACK
  },
  btnCancelTx: {
    fontSize: 16,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
   
  },
  recentTxt:{
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    textAlign:'center',
    fontFamily: font.SEGOE_UI,
    fontSize: 12,
    color: color.APP_WHITE,
    marginTop:20
  },
  recTxt:{
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: font.SEGOE_UI,
    fontSize: 11,
    color: color.APP_WHITE,
    marginTop:12
  },
  dateTxt:{
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: font.SEGOE_UI,
    fontSize: 11,
    color: color.APP_WHITE,
  },

  //image
  moreImg: {
  },
  handMsgImg: {
    height: 20,
    width: 20,
    marginLeft: 5,
    resizeMode: 'contain'

  },

  usersImg: {
    width: '100%',
    height:'100%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  handImg: {
    height: 14,
    width: 10,
    resizeMode: 'contain',
  },
  profileImg:{
    width: '100%',
    height:'100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  crossIcon:{
    position: 'absolute',
    top:20,
    right:20
  },
  crossIconImg:{

    width:15,
    height:15,
    resizeMode:'contain'

  },

  handIconImg:{
    width:15,
    height:15,
    marginRight:5,
    resizeMode:'contain'
  },
  //button
  leavebtn: {
   
    width: '45%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  permissionBtn: {
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_BODY_BLUE

  },
  permissionBtn1: {
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_BODY_BLUE

  },
  exitBtn: {
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
   

  },
  CancelBtn:{
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
     
  },
  handBtnVw:{
    width: windowWidth * 0.4,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userMute:{
    height:30,
    width:50,
    backgroundColor:color.App_Haiti,
    marginTop:5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
