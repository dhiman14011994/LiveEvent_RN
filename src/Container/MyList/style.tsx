/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({

  borderWidth: 4,
  progressBarRadius: 20,

  //----------------------------------View-------------------------------------
  
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  imgVw:{
    width:55,
    height:55,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  detailVw: {
    flexDirection: 'row',
     alignItems: 'center',
    width:'100%',
    
    // marginTop: '5%',
    // marginBottom: '5%',
  },
  imgsVw:{
    width:'25%',
    marginRight: 5,
     
  },
  imageVw:{
    height:60,
    width:60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: '5%',

  },
  permissionMainVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'

  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moderView: {
    flexDirection: 'row',
    // alignItems: 'center',
    width:'100%',
    marginBottom: '5%'
  },
  profileImg: {
  
    height:'100%',
    width: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },

  // text

  soonTxt: {
    color: color.APP_WHITE,
    fontSize: 18,
    fontFamily:font.SEGOE_UI_BOLD,
    width: '100%',
    textAlign: 'center',
  },
  header :{
    backgroundColor:'#1D1233',
    marginTop:30,
    width:"100%",
    height:50,
   paddingHorizontal : 20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:-10,
    
  },
  arrowImg:{ 
    width:15, 
    height:15
  },
  underLine:{
    backgroundColor : "#10FFE5", 
    height:2, 
    width:"100%", 
    borderRadius:50, 
    marginTop:5
  },
  content:{
     paddingTop:10,
    backgroundColor:'#1D1233',
    flexDirection : 'row',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:20,
    marginRight:20,
    width:'88%',
    
  },
  cont:{
    width:'100%',
    paddingTop:10,
    backgroundColor:'#1D1233',
    flexDirection : 'row',
    alignItems:'center',
    justifyContent: "space-between",
  },
  img:{
    width:'100%',
    height:'100%', 
    resizeMode : "cover",
    borderRadius:10,
  },
  playImg:{
    width:10,
    height:10,
    resizeMode : "cover",
    position:'absolute'
  },
  centerTxtView:{
    justifyContent : "space-between",
    width : "50%",
    height:55
  },
  Text1:{
    fontSize : 14,
    color:'white',
    fontFamily : font.SEGOE_UI_SEMIBOLD,
    textAlignVertical: 'top',
  },
  Text2:{
    fontSize : 11,
    color:'#ccc',
    fontFamily : font.SEGOE_UI
  },
  percentageTxtView:{
    zIndex:-1,
  },
  percentageView:{
    width:'20%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  percentageTxt:{
    fontSize : 11,
  },
  tick:{
    width:12, 
    height:12, 
    resizeMode : "contain",
    position:'absolute', 
    top:-2, 
    left: 14
  },
  removeTxt:{
    color : "#10FFE5", 
    fontSize : 11,
  },
  liveTalkTitleTxt:{
    color : "white", 
    fontSize : 12
  },
  liveTalksimg:{
    width:55, 
    height:55, 
    resizeMode : "cover",
    borderRadius:30
  },
  liveTalksTimeTxt:{
    color : "white", 
    fontSize : 11,
    alignSelf:'flex-start',
    marginTop:10,
  },
  liveTalksModeratorTxt:{
    color : "white", 
    fontSize : 11,
    width:'70%'
  },
  liveTalksModeratorView:{ 
    flexDirection:'row',
    paddingHorizontal:20, 
    alignSelf:'flex-start', 
    marginBottom:10
  },
  liveTalksBtnTxt:{
    color : "#10FFE5"
  },
  liveTalksBtn:{
     paddingHorizontal:20,
     marginHorizontal:20
  },
  liveTalksBtnsView:{ 
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10 
  },
  permissionMsgVw1: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '40%',
    alignItems: 'center',
    backgroundColor:'#1D1233'
  },


  //-------------------------------Text------------------------------------
  timeTxt: {
    color: color.APP_WHITE,
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
    
  },
  titleText: {
    fontSize: 15,
    width: '65%',
    color: color.APP_WHITE,
    marginLeft: '1%',
    marginRight: 5, 
  },
  moderTxt: {
    width:'25%',
    fontSize: 12,
    color: color.APP_WHITE,
    // marginLeft: '5%',
    marginRight: 5,
    fontFamily:font.SEGOE_UI_SEMIBOLD,
      // backgroundColor:'yellow'

  },
  moderdetail: {
    fontSize: 12,
    width: '50%',
    color: color.APP_WHITE,
    marginLeft: '1%',
    marginRight: 5,
    fontFamily:font.SEGOE_UI
  },

  jointxt: {
    fontSize: 16,
    color: color.APP_BODY_BLUE,
    alignSelf: 'center'
  },
  sharetxt: {
    fontSize: 16,
    color: color.APP_BODY_BLUE,
    alignSelf: 'center'
  },

  InvTx: {
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    color: color.APP_WHITE,
    marginTop: 30
  },
  userNmTx: {
    fontFamily: font.SEGOE_UI,
    fontSize: 16,
    color: color.APP_WHITE,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 27,
    // backgroundColor:'red'
  },
  btnTx: {
    fontSize: 16,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    color: color.APP_BLACK
  },

  //------------------------------------button---------------------------------------
  sharebtn: {
    marginBottom: '5%',
    paddingHorizontal: 25,
    paddingBottom: 10
  },

  permissionBtn1: {
    width: 150,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'15%',
    backgroundColor: color.APP_BODY_BLUE
  },
  

  //------------------------Image--------------------------------

  remImg:{
    width:18,
    height:18,
    resizeMode: 'contain',
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
  


  
});
