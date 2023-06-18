// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Platform} from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  marginRight: 10,
  container: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_Splash_BG_COLOR2,
  },
  mainVw: {
    height: '92%',
    width: '100%',
    alignItems: 'center',
 
  },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  cardView: {
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

  inputVw: {
    width: '80%',
    marginTop: 14,
    marginLeft: '10%',
    marginRight: '10%',
  },
  cvvVw: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardVw: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Image
  

  cardImg: {
    marginLeft: 24,
    height: 16,
    width: 16,
  },
  cardVwImg: {
    marginLeft: 6,
    marginRight: 6,
  },
  empVw:{
    // height:200
    flex:1
  },

  // Text

  cardTxt: {
    color: color.APP_WHITE,
    fontSize: 14,
    marginLeft: 10,
  },
  textCard: {
    color: color.APP_BODY_BLUE,
    fontSize: 14,
  },
  saveTx: {
    color: color.APP_BLACK,
    fontSize: 16,
    fontFamily:font.SEGOE_UI_BOLD,
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
    height: 48,
    marginTop:'5%',
    marginLeft: '10%',
    marginRight: '10%',
    // position: 'absolute',
    // bottom: 20,
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // TextInput

  commonTxtInput: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
  },
  
});
