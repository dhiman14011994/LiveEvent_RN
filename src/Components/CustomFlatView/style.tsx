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
  callView: {
    width: Width * 0.2,
    marginLeft: 9,
    marginRight: 9,
    marginTop:5,
    alignItems: 'center',
  },
  userView: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  detailView: {
    backgroundColor: color.App_Haiti,
    width: '88%',
    borderRadius: 20,
    marginLeft: '6%',
    marginRight: '6%',
    marginBottom: '5%',
  },

  detailVw: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  moderView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: '5%'
  },
  partView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: '5%'
  },
  imageVw:{
    height:60,
    width:60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',

  },
  imgVw:{
    width:'25%',
    marginLeft: '5%',
    marginRight: 5,
  },
  micView:{
    width: 20,
    height: 20,
    backgroundColor: color.APP_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 2,
    bottom: 25
  },
  jointxt: {
    fontSize: 16,
    color: color.APP_BODY_BLUE,
    alignSelf: 'center'
  },
  sharetxt: {
    fontSize: 16,
    color: color.APP_BODY_BLUE,
    alignSelf: 'center'
  },

  //Image

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    resizeMode: 'cover',
  },
  profileImg: {
  
    height:'100%',
    width: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  remImg:{
    width:18,
    height:18,
    resizeMode: 'contain',
  },
  handImg: {
    height: 14,
    width: 10,
    resizeMode: 'contain',
  },

  // Text

  nameTxt: {
    color: color.APP_WHITE,
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 3,
  },
  timeTxt: {
    color: color.APP_WHITE,
    fontSize: 12,
    marginTop: 10,
    marginBottom: -5,
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  titleText: {
    fontSize: 15,
    width: '50%',
    color: color.APP_WHITE,
    marginLeft: '1%',
    marginRight: 5,
  },
  moderTxt: {
    width:'25%',
    fontSize: 13,
    color: color.APP_WHITE,
    marginLeft: '5%',
    marginRight: 5,
    fontFamily:font.SEGOE_UI_SEMIBOLD
  },
  moderdetail: {
    fontSize: 12,
    width: '50%',
    color: color.APP_WHITE,
    marginLeft: '1%',
    marginRight: 5,
    fontFamily:font.SEGOE_UI
  },
  parttxt: {
    width:'25%',
    fontSize: 13,
    color: color.APP_WHITE,
    marginLeft: '5%',
    marginRight: 5,
    fontFamily:font.SEGOE_UI_SEMIBOLD
  },
  partdetail: {
    fontSize: 14,
    width: '50%',
    color: color.APP_WHITE,
    marginLeft: '1%',
    marginRight: 5,
    fontFamily:font.SEGOE_UI
  },

  //button

  joinbtn: {
    marginBottom: '5%'
  },
  sharebtn: {
    marginBottom: '5%',
    paddingHorizontal: 25,
    paddingBottom: 10
  },
});
