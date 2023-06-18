/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },


  //Image

  image: {
    height: 127,
    width: 113,
    resizeMode: 'contain',
  },
  PwdTx: {
    fontSize: 20,
    color: color.APP_WHITE,
    fontFamily:font.SEGOE_UI_BOLD,
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
  },
  bacTx: {
    fontSize: 20,
    color: color.APP_BODY_BLUE,
    fontFamily:font.SEGOE_UI_BOLD,
    marginTop: 54,
    width: '100%',
    textAlign: 'center',
  },
});
