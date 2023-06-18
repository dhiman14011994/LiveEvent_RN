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
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  mainVw: {
    alignItems: 'center',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tblVw: {
    height: 0,        
    width: '100%',        
    alignItems: 'center',
    marginTop: '3%',
    backgroundColor: 'red'
  },
  subVw: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  cardView: {
    width: '80%',
    height: 48,
    borderWidth: 2,
    borderColor: color.APP_WHITE,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: '4%',
  },
  addCardVw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },

  inputVw: {
    width: '80%',
    marginTop: '4.5%',
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
    marginTop: '4%',
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
  checkImg:{
    width : 8,
    height:8,
    resizeMode : "contain"
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
    width: '100%',
    textAlign: 'center',
    color: color.APP_BLACK,
    fontSize: 16,
    fontFamily:font.SEGOE_UI_BOLD,
  },
  planTx: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  },
  label: {
    marginLeft: 8,
    color: color.APP_WHITE,
    width: '80%',
  },
  allTx: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
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
    marginLeft: 35,
    marginRight: 35,
    marginTop: '4.5%',
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventbtn: {
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    marginTop: '2%',
  },
  viewBtn: {
    backgroundColor:'red',
  },
  activeButton: {
    width: '100%',
    height: 3,
    backgroundColor: color.APP_BODY_BLUE,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: '1%',
  },
  unactiveButton: {
    width: '100%',
    height: 3,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
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

  checkboxContainer: {
    flexDirection: 'row',
    marginTop: '4%',
    width: '80%',
    alignItems:'center',
  },

// check box view
  checkBoxView:{
    borderColor:color.APP_WHITE,
    justifyContent:'center',
    alignItems:'center',
    padding:2,
    marginRight:10,
    height:13,
    width:13
},
});
