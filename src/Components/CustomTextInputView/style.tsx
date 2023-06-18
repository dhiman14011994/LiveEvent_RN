/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  mainVw: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  image: {
    marginLeft: 24,
    height: 15, 
    width: 15, 
    resizeMode: 'contain',
    
  },
  textINP: {
    marginLeft: 12,
    color: color.APP_WHITE,
    height: '100%',
    width: '75%',
    fontSize:14,
    fontFamily:font.SEGOE_UI,
  },
  textCvv: {
    color: color.APP_WHITE,
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
});
