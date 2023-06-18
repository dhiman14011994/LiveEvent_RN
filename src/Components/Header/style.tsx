//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    zIndex: 100,
    width: '100%',
    // height:'100%',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'yellow'
  },
  profileImgVw: {
    height: 30,
    width: 30,
    borderRadius: 40,
  },
  shadowVw: {
    width: '100%',
    backgroundColor: 'white',
    height: 2,
  },
  bottomVw: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 0,
  },
  roundVw: {
    height: 10,
    width: '100%',

    borderTopLeftRadius: 8,
    borderTopEndRadius: 8,
  },
  rightView: {
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  searchView: {
    height: 40,
    width: '68%',
    borderColor: color.APP_WHITE,
    borderWidth: 3,
    borderRadius: 15,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',

  },

  //Buttons Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingLeft: 15,
    // backgroundColor:'red'
  },
  rightBtn: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',

    alignItems: 'center',
  },
  rightBtn2: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
   
    alignItems: 'center',
  },
  leftDualBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor:'red',
    // paddingLeft:10,
    marginLeft:10
  },

  //Text Styles
  titleTxt: {
    fontSize: 20,
    width: '56%',
    textAlign: 'center',
    color: 'white',
    alignSelf:'center',
    fontFamily:font.SEGOE_UI_SEMIBOLD
  },

  //Images Styles
  btnLeftImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  multiBtnLeftImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  btnRightmg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  profileImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 40,
  },
  searchImage: {
    marginLeft: 10,
  },

  //textinput

  textinput: {
    marginLeft: 10,
    color: color.APP_WHITE,
    fontSize: 14,
    padding:0,
  },
})