/* eslint-disable @typescript-eslint/no-unused-vars */
import { Platform, Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';
const width = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const style = ScaleSheet.create({
  rateSize: 15,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  planVw: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop:10
  },
  courseVw: {
    width: '33.3%'

  },
  seeVw: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  emptyVw: {
    height: 2,
    width: '86%',
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: '3%',
    marginBottom: '3%',
    backgroundColor: color.APP_BODY_BLUE
  },
  courseEmptyVw: {
    height: 2,
    width: '74%',
    marginLeft: '13%',
    marginRight: '13%',
    marginTop: '3%',
    marginBottom: '3%',
    backgroundColor: color.APP_BODY_BLUE
  },
  resEmptyVw: {
    height: 2,
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '3%',
    marginBottom: '3%',
    backgroundColor: color.APP_BODY_BLUE
  },
  dtlVw: {
    width: '90%',
    backgroundColor: '#1D1233',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',

  },
  flatVw: {
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  commonVw: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  imgVw: {
    // width: '90%',
     marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height:200,
     backgroundColor:'black',
    overflow: 'hidden',
    
  },
  resVw: {
    width: '90%',
    backgroundColor: '#1D1233',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
  resImgVw: {
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center'

  },
  customImgVw: {
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputVw: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 15,
    height: 40,
    borderWidth: 2,
    borderColor: color.APP_WHITE,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  ratingVw: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: "5%",
    marginTop:10,
    // alignItems: 'center',
    backgroundcolor:'red'
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerVw: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  noDataVw:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingsVw:{
    width:'30%',
    backgroundcolor:'pink'

  },

  // text

  soonTxt: {
    color: color.APP_WHITE,
    fontSize: 18,
    fontFamily: font.SEGOE_UI_BOLD,
    width: '100%',
    textAlign: 'center',
  },
  titleTx: {
    color: color.APP_WHITE,
    width: '90%',
    fontSize: 14,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 20,
  },
  intTx: {
    color: color.APP_WHITE,
    width: '67%',
    marginRight: '3%',
    fontFamily: font.SEGOE_UI_BOLD,
    fontSize: 13,
  },
  desTx: {
    color: color.APP_WHITE,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    fontFamily: font.SEGOE_UI,
    fontSize: 12,
  },
  conTx: {
    color: color.APP_WHITE,
    width: '100%',
    textAlign: 'center',
    fontFamily: font.SEGOE_UI,
    fontSize: 12,
  },
  dtlTx: {
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '3%',
    color: color.APP_WHITE,
    fontFamily: font.SEGOE_UI,
    fontSize: 10,
  },
  resTx: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    color: color.APP_WHITE,
    fontFamily: font.SEGOE_UI,
    fontSize: 12,
  },
  dtlTitleTx: {
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '5%',
    color: color.APP_WHITE,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    fontSize: 13,
  },
  seeText: {
    color: color.APP_BODY_BLUE,
    fontSize: 14,
    fontFamily: font.SEGOE_UI_BOLD,
    width: '100%',
    textAlign: 'center',
  },
  txtcommon: {
    position: 'absolute',
    left: 20,
    color: 'white',
    fontSize: 15
  },
  imgTx: {
    marginTop: 11,
    color: color.APP_WHITE,
    fontSize: 10,
    fontFamily: font.SEGOE_UI_BOLD,
    width: '100%',
    height: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  postTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    fontFamily: font.SEGOE_UI
  },
  textTx: {
    color: color.APP_WHITE,
    fontSize: 11,
    fontFamily: font.SEGOE_UI,
    width: '100%',
    textAlign: 'center',
  },
  noDataTx:{
    color:color.APP_WHITE,
    fontFamily:font.SEGOE_UI_SEMIBOLD,
    fontSize:16
  },

  // Image
  backgroundImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  playImg: {
    position: 'absolute'
  },

  // TextInput
  textINP: {
    height: '100%',
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    color: color.APP_WHITE,
    padding: 0,
  },

  //Button
  postBtn: {
    width: '20%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: color.APP_WHITE,
    marginBottom: '10%',
    marginTop: '10%'
  },
  ratingBtn: {
    borderColor: color.APP_WHITE,
    borderWidth: 2,
    borderRadius: 5,
    width: '25%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16
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

  InvTx: {
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: color.APP_WHITE,
    marginTop: 25
  },
  userNmTx: {
    fontFamily: font.SEGOE_UI,
    fontSize: 14,
    color: color.APP_WHITE,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    
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
  usersImgVw:{
    height:100,
    width:100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop:15,
    // backgroundColor:'red'
  },
  profileImg:{
    width: '100%',
    height:'100%',
    borderRadius: 100,
    resizeMode: 'cover',
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
    marginTop:8,
    
  },
  dateTxt:{
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: font.SEGOE_UI,
    fontSize: 11,
    color: color.APP_WHITE,
  },
  permissionBtn: {
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_BODY_BLUE

  },

  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },

});
