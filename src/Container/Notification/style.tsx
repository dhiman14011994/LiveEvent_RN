/* eslint-disable @typescript-eslint/no-unused-vars */
import { Platform } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  // ************************************** View *****************************************
  container: {
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

  notifyView: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 10,
    padding: 20,
    backgroundColor: color.App_Haiti,
    borderRadius: 20,
  },


  // ************************************** Text *****************************************

  soonTxt: {
    color: color.APP_WHITE,
    fontSize: 18,
    fontFamily: font.SEGOE_UI_BOLD,
    width: '100%',

  },
  notifyTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    fontFamily: font.SEGOE_UI
  },
  sectionTxt: {
    color: color.APP_WHITE,
    fontSize: 12,
    fontFamily: font.SEGOE_UI,
    marginLeft: '5%',
    marginRight: '5%',
  },


  // ************************************** Button *****************************************


  // ************************************** Image *****************************************
});
