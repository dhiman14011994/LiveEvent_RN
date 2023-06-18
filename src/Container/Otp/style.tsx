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
  mainVw: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  inputVw: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text

  saveTx: {
    color: color.APP_BLACK,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    fontFamily:font.SEGOE_UI_BOLD
  },
  createTx: {
    fontSize: 20,
    fontFamily:font.SEGOE_UI_BOLD,
    color: color.APP_WHITE,
    width: '100%',
    textAlign: 'center',
    marginTop: 26,
  },
  orTx: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    color: color.APP_DARK_GRAY,
    marginTop: 30,
    marginBottom:4,
  },
  verificationTx: {
    width: '88%',
    textAlign: 'center',
    marginLeft: '6%',
    marginRight: '6%',
    fontSize: 12,
    color: color.APP_DARK_GRAY,
  },
  TxtView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    padding: 2.5,
    paddingVertical: 2.5,
  },
  inputContainer: {
    width: 48,
    height: 48,
    marginLeft: -1,
    backgroundColor: 'white',
    borderRadius: 11,
    textAlign: 'center',
    fontSize: 26,
  },

  // Button

  saveBt: {
    width: '80%',
    height: 48,
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
});
