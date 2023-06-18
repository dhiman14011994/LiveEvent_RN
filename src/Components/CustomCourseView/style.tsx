/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-ignore
import { Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export const style = ScaleSheet.create({
  container: {
    marginTop: 15,
    width: '100%',
  },
  mainVw: {
    width: '100%',
    flexDirection: 'row',
    borderColor: color.APP_WHITE,
    marginBottom: 10,
    // alignItems: 'center',
  },
  userVw: {
    width: '60%',
    height: 75,
    marginRight: 18,
    marginTop: '1%',
    marginLeft: 10,
    marginBottom: 5,
  },
  lessImgVw: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  emptyVw: {
    width: '100%',
    paddingTop: 2,
    backgroundColor: color.APP_WHITE,
  },
  emptyVw1: {
    width: '100%',
    height:10
  },

  //Button
  bookmarkBtn: {
    marginTop: '1%',
  },

  arrowBtn: {
    marginTop: '1%',
    backgroundcolor: 'red',
    alignItems: 'center',
  },

  //Text
  userTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    fontFamily: font.SEGOE_UI_BOLD,
    marginBottom: 4,
    lineHeight: 14,
    width: '95%',
    marginLeft: '5%',
  },
  userTx1: {
    color: color.APP_WHITE,
    fontSize: 11,
    width: '95%',
    marginLeft: '5%',
    marginTop: '1%',
  },

  //Image
  userImg: {
    width: 80,
    height: 80,
    resizeMode: 'cover'
  },
  saveBtnImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  tickImg: { 
    height: 20, 
    width: 20, 
    resizeMode: 'contain',
    position: 'absolute', 
    top: -10, 
    left: -20 
  },
});
