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
  mainVw: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  menuCntnr: {
    flexDirection: 'row',
    marginTop:Platform.OS=='ios'?5:10,
  },
  menuTxtVw: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_BODY_BLUE,
    alignSelf: 'center'
  },
  socalVw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 25
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
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: Platform.OS=='ios'?20:30,
    marginLeft: '10%',
    marginRight: '10%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '80%',
  },
  activeButton: {
    backgroundColor: color.APP_BODY_BLUE,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
  },
  unactiveButton: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
  },


  // Text
  tabTx: {
    textAlign: 'center',
    color: color.APP_WHITE,
    padding: 2,
    paddingVertical: 5,
    fontSize: 12,
    fontFamily: font.SEGOE_UI,
    backgroundColor: color.APP_Splash_BG_COLOR2
  },
  saveTx: {
    width: '100%',
    textAlign: 'center',
    color: color.APP_BLACK,
    padding: 2,
    fontSize: 16,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
  },
  createTx: {
    fontSize: 20,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
    color: color.APP_WHITE,
    width: '100%',
    padding: 2,
    textAlign: 'center',
    marginTop:Platform.OS=='ios'?20:60,
  },
  orTx: {
    fontSize: 15,
    color: color.APP_DARK_GRAY,
    marginTop: 30,
  },
  alreadyTx: {
    fontSize: 16,
    color: color.APP_WHITE,

    width: '100%',
    textAlign: 'center',
    marginTop: Platform.OS=='ios'?80:105,
  },
  loginTx: {
    fontSize: 16,
    color: color.APP_BODY_BLUE,

    width: '100%',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: color.APP_WHITE,
    lineHeight: 16,
  },
  labelTx: {
    fontSize: 14,
    color: color.APP_BODY_BLUE,
    lineHeight: 16,
  },
  blankVw: {
    marginTop: 15,
    height: 16,
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
    marginTop: 26,
  },
});
