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
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    // marginTop:Platform.OS=='ios'?'1%':10,
  },
   popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socalVw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 31,
  },
  appleVw: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_WHITE,
    marginLeft: 20,
    marginRight: 20,
  },
  googleVw: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_WHITE,
    marginLeft: 20,
    marginRight: 20,
  },
  facebookVw: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_WHITE,
    marginLeft: 20,
    marginRight: 20,
  },
  inputVw: {
    width: '80%',
    marginTop: 14,
    marginLeft: '10%',
    marginRight: '10%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 23,
    width: '80%',
  },
  checkbox: {
  },
  label: {
    marginLeft: 8,
    color: color.APP_WHITE,
  },
  labelTx: {
    color: color.APP_BODY_BLUE,
  },

  // Image

  cardImg: {
    marginLeft: 24,
    height: 16,
    width: 16,
  },
  checkImg:{
    width : 8,
    height:8,
    resizeMode : "contain"
  },

  // Text

  saveTx: {
    width: '100%',
    textAlign: 'center',
    color: color.APP_BLACK,
    fontSize: 16,
    fontFamily:font.SEGOE_UI_BOLD,
  },
  createTx: {
    fontSize: 20,
    fontFamily:font.SEGOE_UI_BOLD,
    color: color.APP_WHITE,
    width: '100%',
    textAlign: 'center',
    
  },
  orTx: {
    fontSize: 15,
    color: color.APP_DARK_GRAY,
    marginTop: 26,
  },
  alreadyTx: {
    fontSize: 16,
    color: color.APP_WHITE,
    width: '100%',
    textAlign: 'center',
    marginTop: 26,
  },
  loginTx: {
    fontSize: 16,
    color: color.APP_BODY_BLUE,
    width: '100%',
    textAlign: 'center',
  },

  agreeMsg:{
    fontSize:11,
    color:"white",
    fontFamily: font.SEGOE_UI_SEMILIGHT
},
agreeLink:{
    fontSize:11,
    color:color.APP_BODY_BLUE,
},

  // Button

  saveBt: {
    width: '80%',
    height: 48,
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 42,
    marginBottom: 10,
  },

  checkBoxView:{
    borderColor:color.APP_WHITE,
    justifyContent:'center',
    alignItems:'center',
    padding:2,
    marginRight:10,
    height:13,
    width:13
},
});
