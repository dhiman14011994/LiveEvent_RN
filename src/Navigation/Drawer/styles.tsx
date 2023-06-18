import { Platform } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
//@ts-ignore
import { APP_TEXT_COLOR_WHITE, WHITE_COLOR, TEXT_COLOR_GRAY_MEDIUM, TEXT_COLOR_GRAY_LIGHT, APP_THEME_COLOR_GREEN, INPUTFIELD_PLACEHOLDER_COLOR, APP_BORDER_MEDIUM_GRAY, APP_BORDER_LIGHT_GRAY, TEXT_COLOR_GRAY_DARK, BLACK_COLOR } from '../../res/colors';
import font from '../../Resources/Fonts';

const styles = ScaleSheet.create({

  mainContainer: {
    position: 'absolute',
    top: '7%',
    borderRadius: 20,
    height: '86%',
    width: '100%',
    paddingLeft: 50,
    // backgroundColor:'red'
  },
  secondContainer: {
    borderRadius: 20,
    height: '91%',
    width: '100%',
    backgroundColor: '#2B2639',
    paddingTop: 10,

  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 15,
    marginBottom: 10,
    borderBottomColor: 'white',
    paddingBottom: 20
  },
  backBtn: {
    width: 15,
    height: 15,
    resizeMode: 'contain'
  },
  imageView: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    marginRight: 15
  },
  userImg: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  userNameTxt: {
    fontSize: 16,
    color: 'white',
    marginTop: 3
  },
  distanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center'
  },
  distanceTitleTxt: {
    fontSize: 13,
    color: APP_TEXT_COLOR_WHITE,
    marginBottom: 3
  },
  distanceTxt: {
    textAlign: 'center',
    color: APP_TEXT_COLOR_WHITE,
    fontSize: 14,
  },
  BtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 28,
    marginBottom: 15
  },
  BtnView: {
    borderColor: WHITE_COLOR,
    width: 100,
    height: 23,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  BtnTxt: {
    fontSize: 11,
    color: APP_TEXT_COLOR_WHITE,
  },
  commonBtn: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    height: 25,
    minWidth: 50,
    alignItems: 'center',
    paddingLeft: 25
  },
  svgCntnr: {
    marginTop: 10,
    marginBottom: 50,
  },

  //Image Styles
  logo: {
    marginBottom: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover'
  },
  commonImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  commonImgSeting: {
    height: 17,
    width: 17,
    resizeMode: 'contain',
    marginLeft: 3
  },
  commonTxt: {
    color: "#FFFFFF",
    fontSize: 15,
    paddingLeft: 10,
    fontFamily: font.SEGOE_UI_SEMILIGHT
  },
  divider: {
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 55
  },
  BottomContaincommonTxt: {
    color: TEXT_COLOR_GRAY_MEDIUM,
    fontSize: 14,
    marginBottom: 20
  },
  inputFieldContainer: {
    marginVertical: 5
  },
  inputFieldView: {
    width: '70%',
    marginLeft: 25,
    borderBottomColor: TEXT_COLOR_GRAY_MEDIUM,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5
  },
  inputField: {
    fontSize: 12,
    padding: 0,
    color: TEXT_COLOR_GRAY_LIGHT
  },
  editImage: {
    height: 10,
    width: 10,
    resizeMode: 'contain'
  },
  saveBtnView: {
    width: '70%',
    marginLeft: 25,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  saveBtn: {
    backgroundColor: APP_THEME_COLOR_GREEN,
    alignSelf: 'center',
    width: 70,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  saveBtnTxt: {
    fontSize: 11,
    padding: 0,
    color: WHITE_COLOR
  },
  languageTxtView: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 10
  },
  languageTxt: {
    fontSize: 14
  },
  langBtn: {
    backgroundColor: WHITE_COLOR,
    borderColor: APP_THEME_COLOR_GREEN,
    alignSelf: 'center',
    width: 230,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5
  },
  langBtnTxt: {
    color: APP_THEME_COLOR_GREEN,
    fontSize: 12
  },
  nextBtn: {
    backgroundColor: APP_THEME_COLOR_GREEN,
    width: 150,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'center'
  },
  btnTxt: { color: WHITE_COLOR, alignSelf: 'center', fontSize: 14 },
  EnterPointsTxt: {
    fontSize: 16,
    fontFamily: Platform.OS == "ios" ? 'Muli-Bold' : 'MuliBold',
    color: APP_THEME_COLOR_GREEN
  },
  countView: {
    backgroundColor: APP_THEME_COLOR_GREEN,
    position: 'absolute', top: -10, right: -10, width: 17, height: 17, alignItems: 'center', borderRadius: 10
  },
  countTxt: {
    fontSize: 10,
  },
  crossBtnView: {
    backgroundColor: "#262C38",
    alignSelf: 'center',
    padding: 12,
    borderRadius: 50,
    marginTop: 5
  },
  commonImgCross: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  themeIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    margin: 20
  },
})

export default styles