/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform,Dimensions} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
export const style = ScaleSheet.create({
  // ------------------------------------View---------------------------------------------
  container: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  soonVw: {
    height: 500,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataVw:{
    height:Height*.7,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomVw:{
    height:50,
    width:'100%',
     backgroundColor:color.App_Haiti,
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    flexDirection: 'row',
  },
  sbTextVw:{
    // backgroundColor:'pink',
    width:'88%',
    height:'100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'6%',
    marginright:'6%',
    flexDirection: 'row',
  },
  textVw:{
    
    height:'100%',
    width:'50%',
    marginLeft:'2%',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:'yellow',

  },
  mainbtnVw:{
    flexDirection: 'row',
    width:'28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainbtnVw1:{
    flexDirection: 'row',
    width:'18%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'10%'
  },

  handVw:{
    justifyContent: 'center',
    alignItems: 'center',

  },
  vwImg:{
    width:'20%',
  
    justifyContent: 'center',
    alignItems: 'center',
  },

 
// ------------------------------------Button---------------------------------------------
  eventbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '3%',
  },
  activeButton: {
    width: '100%',
    height: 3,
    backgroundColor: color.APP_BODY_BLUE,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
  },
  unactiveButton: {
    width: '100%',
    height: 3,
    // backgroundColor: color.APP_BODY_BLUE,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
  },

  // ------------------------------------Text---------------------------------------------
  soonTxt: {
    color: color.APP_WHITE,
    fontSize: 18,
    fontFamily:font.SEGOE_UI_BOLD,
    width: '100%',
    textAlign: 'center',
  },
  noDataTx:{
    color:color.APP_WHITE,
    fontFamily:font.SEGOE_UI_SEMIBOLD,
    fontSize:16
  },
  eventtitleTxt:{
    color:color.APP_WHITE,
    fontFamily:font.SEGOE_UI_SEMIBOLD,
    fontSize:16
  },
  speakerTxt:{
    color:color.APP_WHITE,
    fontFamily:font.SEGOE_UI_SEMIBOLD,
    fontSize:16
  },

  //-----------------------------------Image---------------------------------------------------

  eventImg:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
    overflow:'hidden',
    // marginLeft:20
  },
  handImg:{
    height:20,
    width:20,
    resizeMode:'contain',
    overflow:'hidden',
    marginLeft:20

  }
  
});
