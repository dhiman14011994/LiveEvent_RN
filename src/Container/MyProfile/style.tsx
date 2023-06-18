// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Platform} from 'react-native';
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
  mainVw: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    paddingBottom:15,
 
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  optnCntnr: {
    width: '80%',
    // paddingTop: 20,
    // paddingBottom: 20,
    marginLeft: '10%',
    marginRight: '10%',
  },
  borderVw: {},
  marginVw: {
    height: 90,
  },
  switchVw: {
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCanView: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 20,
  },
  editVw: {
    height: 86,
    width: 85,
    borderRadius: 43,
    backgroundColor: 'transparent',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Image
  profileImg: {
    height: 86,
    width: 85,
    borderRadius: 43,
  },
  settingImg: {
    height: 25,
    width: 25,
    marginRight: 5,
    resizeMode: 'contain',
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  iconImg: {marginTop: 5,},
  editImg: {},
  // Text

  userTx: {
    fontSize: 18,
    color: color.APP_WHITE,
    fontFamily:font.SEGOE_UI_BOLD,
    marginTop: 12,
    width: '100%',
    // backgroundColor:'red',
    // height: 20,
    textAlign: 'center',
  },
  settingTxt: {
    flex: 1,
    fontSize: 16,
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    textAlign: 'left',
  },
  logoutTxt: {
    flex: 1,
    fontSize: 18,
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'left',
  },
  privateTx: {
    marginRight: 10,
    color: color.APP_WHITE,
  },
  iconTx: {
    color: color.APP_WHITE,
    fontSize: Platform.OS === 'ios' ? 10 : 11,
    lineHeight: Platform.OS === 'ios' ? (11 + 5) : (12 + 5),
    paddingBottom: 5,
    marginLeft: 10,
    textAlign: 'left',
    width:'89%'
  },
  saveTx: {
    color: color.APP_BLACK,
    fontSize: 16,
    fontFamily:font.SEGOE_UI_BOLD,
  },

  //button

  settingBtn: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 35,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    marginLeft: 10,
  },
  saveBt: {
    width: '80%',
    height: 50,
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  editBtn: {
    height: 19,
    width: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_BODY_BLUE,
    position: 'absolute',
    right: 11,
    bottom: 2,
  },
});
