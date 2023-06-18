/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-ignore
import { Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export const styles = ScaleSheet.create({
  rateSize: 22,
  detailVw: {
    width: "80%",
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: color.App_Haiti,
  },
  socialIconView: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  //Image

  Img: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  twitterImg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  copyImg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  tickImg: {
    width: 12,
    height: 12,
    resizeMode: 'cover',
  },
  // Text

  titleText: {
    fontSize: 15,
    color: color.APP_WHITE,
    marginBottom: 20
  },

  btnTxt: {
    color: "white", 
    textAlign: 'center', 
    marginTop: 5, 
    fontSize: 11
  },
  saveBtnTxt: { 
    color: "#10FFE5" 
  },
  SubmitBtnTxt: { 
    color: "black", 
    fontSize: 12, 
    fontFamily: font.SEGOE_UI_BOLD 
  },
  //button
  socialbtns: { 
    paddingBottom: 15, 
    alignItems: 'center' 
  },
  copySocialbtns: {
    marginRight: 25,
    paddingBottom: 10,
    alignItems: 'center'
  },
  socialbtnTwitter: {
    paddingBottom: 15, 
    alignItems: 'center'
  },
  RadioBtnView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 15, 
    alignItems: 'center'
  },
  doneRadioBtn: {
    backgroundColor: 'white', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 18, 
    height: 18, 
    borderRadius: 10
  },
  saveBtn: {
    padding: 10
  },
  SubmitBtn: {
    backgroundColor: "#00ffe5",
    width: "100%",
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 20
  }

});
