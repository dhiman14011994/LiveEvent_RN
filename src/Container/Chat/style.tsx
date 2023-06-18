/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  permissionMsgVw1: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '40%',
    alignItems: 'center',
    backgroundColor:'#1D1233'
  },
  permissionMainVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'

  },


  // text

  soonTxt: {
    color: color.APP_WHITE,
    fontSize: 18,
    fontFamily:font.SEGOE_UI_BOLD,
    width: '100%',
    textAlign: 'center',
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

// Button
  permissionBtn1: {
    width: '40%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'15%',
    backgroundColor: color.APP_BODY_BLUE
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
