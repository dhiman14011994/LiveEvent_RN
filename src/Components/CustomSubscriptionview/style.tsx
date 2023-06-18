/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-ignore
import {Dimensions} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export const style = ScaleSheet.create({
  mainVw: {
    width: '100%',
    // height: 20,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    marginTop: 25,
    
  },
  textDetails: {
    width: '58%',
    color: color.APP_WHITE,
    // backgroundColor:'pink',
    marginRight:'2%',
  },
  textName: {
    width: '38%',
    color: color.APP_WHITE,
    marginRight:'2%',
    fontFamily:font.SEGOE_UI_SEMIBOLD,
    fontSize:12
    
  },
});
