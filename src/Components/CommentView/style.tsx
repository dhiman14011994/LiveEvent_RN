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
  marginBottom: 10,
  mainVw: {
    flexDirection: 'row',
    padding: '1%',
  },
  rpVw:{
    width:'100%',
    borderColor:color.APP_WHITE, 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:0,
    borderRadius:20,
  },
  
  userVw: {
    width: '64%',
    marginRight: 18,
  },
  
  
  // Button

  arrowBtn: {
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rpBtn:{
    width:'25%',
  },
  bookmarkBtn: {
    marginTop: '1%',
  },


  //TextInput

  textINP: {
    color: color.APP_WHITE,
    width: '70%',
    marginLeft:'5%',
    fontSize:12,
    fontFamily:font.SEGOE_UI,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    padding:0
  },
  replyTxt:{
    color: color.APP_WHITE,
    paddingLeft:10,
    fontSize:12,
    fontFamily:font.SEGOE_UI,
    padding:0
  },

  // text

  userTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    fontFamily:font.SEGOE_UI_BOLD,
    marginBottom: 4,
  },
  userTx1: {
    color: color.APP_WHITE,
    fontSize: 11,
    width: '95%',
  
  },
  textTx:{
    color:color.APP_WHITE,
    fontFamily:font.SEGOE_UI,
    fontSize:11
  },
  //Image

  userImg: {
    width: 50,
    height:50,
    marginRight: 9,
    marginTop: 5,
    marginBottom: 10,
  },
  bookmarkImg:{
    width:16,
    height:16,
    resizeMode:"contain"
  },
  thumbImg:{ width: 15, height: 15 }
});
