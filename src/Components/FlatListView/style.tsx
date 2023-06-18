//@ts-ignore
import { Platform } from 'react-native';
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  text: {
    borderRadius: 15,
    height: 30,
    backgroundColor: '#2A1240',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mainView: {
    height: 270,
    width: 250,
    padding: 10,
  },
  videoBtn: {
    width: 240,
    height: 150,
    alignItems: 'center',
  },
  backImg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    width: '100%',
    position: 'absolute',
    borderRadius: 12,
    resizeMode: 'stretch',
    // backgroundColor:'red'
  },
  newVW: {
    position: 'absolute',
    // height: 20,
    width: 50,
    backgroundColor: color.APP_BODY_BLUE,
    left: 15,
    top: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressVw: {
    height: 10,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',

    borderRadius: 10
  },
  subprogressVw: {
    height: '100%',
    backgroundColor: color.APP_BODY_BLUE,
    borderRadius:10,
    
  },
  playImg: {
    position: 'absolute',
    top: Platform.OS=='ios'?35:40,
  },
  timeVw: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '70%',
    right: 0,
    height: 22,
    width: 70,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  timeTx: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: font.SEGOE_UI_SEMIBOLD
  },
  titleVw: {
    flexDirection: 'row',
    height: 20,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 19,
    justifyContent: 'space-between',
    width: '100%'
  },
  titleTx: {
    color: color.APP_WHITE,
    width: '90%',
    fontSize: 14,
    fontFamily: font.SEGOE_UI_SEMIBOLD,
  },
  likeImg: {
  },
  detailsVw: {
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    color: color.APP_WHITE,
    fontSize: 10,
    letterSpacing: 2,
    lineHeight: 20,
  },
  SeekImg: {
    width: '100%',
    height: 6,
    marginLeft: '2%',
    marginRight: '2%',
  },
  newTX: {
    fontSize:14,
    fontFamily: font.SEGOE_UI_BOLD,
    width:'100%',
    textAlign:'center',
  },
});
