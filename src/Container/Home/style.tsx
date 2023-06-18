/* eslint-disable @typescript-eslint/no-unused-vars */
import { Platform } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

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
  commonVw: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 30,
    width: 130,
    marginBottom: 5,
  },
  noDataVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionMainVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'

  },

  permissionMsgVw1: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: '40%',
    alignItems: 'center',
    backgroundColor:'#1D1233'
  },
  //Image

  image: {
    height: '11%',
    width: '23%',
    resizeMode: 'contain',
  },

  dotStyle: {
    backgroundColor: 'red',
    width: 11,
    height: 11,
    borderRadius: 10,
  },
  activeDotStyle: {
    backgroundColor: color.APP_BODY_BLUE,
    width: 11,
    height: 11,
    borderRadius: 10,
  },
  arrowImg: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
  },
  moreImg: {
    height: 12,
    width: 12,
    resizeMode: 'contain'
  },

  txtcommon: {
    position: 'absolute',
    left: 20,
    // alignSelf:'flex-start',
    color: 'white',
    fontSize: 15
  },
  moreTx: {
    color: color.APP_WHITE,
    marginRight: 10,
  },
  noDataTx: {
    color: color.APP_WHITE,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    fontSize: 16
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


  //Button


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
