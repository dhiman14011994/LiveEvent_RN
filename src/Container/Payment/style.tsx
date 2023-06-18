// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Platform } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  mainVw: {
    height: '82%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  headerVw: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    width: '80%',
    height: 48,
    borderWidth: 2,
    borderColor: color.APP_WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 24,
  },
  cardView1: {
    width: '80%',
    height: 48,
    borderWidth: 2,
    borderColor: color.APP_WHITE,
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 24,
  },
  addCardVw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
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
  buttomBtnVw: {
    flexDirection: 'row',
    width: '90%',
    marginTop:'20%',
    marginLeft: '5%',
    marginRight: '5%',
   
  },

  // Image

  cardImg: {
    marginLeft: 15,
    height: 16,
    width: 16,
  },
  deleteImg: {
    marginRight: 15,
    height: 16,
    width: 16,
  },

  // Text

  cardTxt: {
    color: color.APP_WHITE,
    width:'65%',
    fontSize: 14,
    marginLeft: 10,
    
  },
  cardTxt1: {
    color: color.APP_WHITE,
    width:'72%',
    fontSize: 14,
    marginLeft: 10,
    textAlign:'center'
    
  },
 
  textCard: {
    color: color.APP_BODY_BLUE,
    fontSize: 14,
  },
  saveTx: {
    color: color.APP_BLACK,
    fontSize: 16,
    fontFamily: font.SEGOE_UI_BOLD,
  },
  cancelTx: {
    color: color.APP_WHITE,
    fontSize: 20,
    fontFamily: font.SEGOE_UI_BOLD,
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
  },

  // Button

  addCardBt: {
    marginRight: 46,
  },
  deleteCardBt: {
    marginLeft: 46,
  },
  saveBt: {
    width: '80%',
    height: 50,
    marginLeft: 35,
    marginRight: 35,
    position: 'absolute',
    bottom: 20,
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBt: {
    width: '40%',
    height: 48,
    marginLeft: '5%',
    marginRight: '5%',
    // position: 'absolute',
    // bottom: '10%',
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
