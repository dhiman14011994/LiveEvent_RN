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
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  mainVw: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  optnCntnr: {
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  borderVw: {
    marginHorizontal: 15,
  },
  marginVw: {
    height: 90,
  },

  // Image
  profileImg: {
    height: 86,
    width: 85,
    borderRadius: 43,
    marginTop: 24,
  },
  settingImg: {
    height: 20,
    width: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },

  // Text

  userTx: {
    fontSize: 18,
    color: color.APP_WHITE,
    fontFamily:font.SEGOE_UI_BOLD,
    marginTop: 15,
    width: '100%',
    // height: 20,
    textAlign: 'center',
    // backgroundColor:'red'
  },
  settingTxt: {
    fontSize: 20,
    width:'85%',
    marginLeft: 5,
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

  //button

  settingBtn: {
    marginTop: 10,
    marginBottom: 12,
    paddingLeft: 35,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
