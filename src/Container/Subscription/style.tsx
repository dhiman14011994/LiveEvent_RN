// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Platform} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainVw: {
    height:'100%',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor:'red'
    // flex: 1,
  },
  addCardVw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    // backgroundColor:'red',
    width:'100%',
    padding:10
  },
  cancelVw: {
    height: '50%',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: color.App_Haiti,
  },
 

  // Image

  // Text

  textCard: {
    color: color.APP_BODY_BLUE,
    fontSize: 14,
    width:'100%',
    textAlign:'center',
  },
  saveTx: {
    color: color.APP_BLACK,
    fontSize: 16,
    fontFamily:font.SEGOE_UI_BOLD,
  },
  cancelTx: {
    color: color.APP_WHITE,
    fontSize: 20,
    fontFamily:font.SEGOE_UI_BOLD,
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
  },
  subTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    textAlign: 'center',
    width: '86%',
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: 20,
    marginBottom: 30,
  },

  // Button

  addCardBt: {
    width:'45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginright:'5%'
  },
  deleteCardBt: {
    width:'45%',
    marginLeft:'5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBt: {
    width: '80%',
    height: 48,
    marginLeft: 35,
    marginRight: 35,
    position: 'absolute',
    bottom: 14,
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBt: {
    width: '90%',
    height: 48,
    marginBottom: 10,
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
