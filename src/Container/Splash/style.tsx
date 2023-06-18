/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';

export const style = ScaleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },

  //Image
  image: {
    height: 78,
    width: 87,
    resizeMode: 'contain',
  },
});
