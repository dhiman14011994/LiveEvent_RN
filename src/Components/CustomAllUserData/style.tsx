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
  container:{
    marginTop: 10,
    // backgroundColor:'red'
  },
  mainVw: {
    flexDirection: 'row',
    borderColor: color.APP_WHITE,
    marginBottom: 10,
    alignItems:'center',
     
  },
 
  userVw: {
    width: '60%',
    // height: 75,
    marginRight: 10,
    // marginTop: '1%',
     marginLeft: '3%',
    marginBottom: 10,
  },
  lessImgVw:{
    width:'25%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyVw:{
width:'100%',
 paddingTop:2,

backgroundColor:color.APP_WHITE,

  },

  //Button
  bookmarkBtn: {
    marginTop: '1%',
    width:'15%',
  },

  arrowBtn: {
    height:25,
    width:25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },

  //Text

  userTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    fontFamily:font.SEGOE_UI_BOLD,
    marginBottom: 4,
    width:'100%'
  },
  userTx1: {
    color: color.APP_WHITE,
    fontSize: 11,
    width: '95%',
    height:40,
  
  },

  //Image

  userImg: {
    width: '95%',
    // marginLeft:'5%',
    marginRight: '5%',
    height:66,
    resizeMode:'cover'
  },
  saveBtnImg:{height:18,width:18,resizeMode:'contain'}
 
});
