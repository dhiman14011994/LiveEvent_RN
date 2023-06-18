//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const style = ScaleSheet.create({
  text: {
    borderRadius: 15,
     padding: 10,
    backgroundColor: '#2A1240',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 5,
    marginTop: 5,
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

  backImg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    width: '100%',
    position: 'absolute',
    borderRadius: 12,
    resizeMode: 'stretch',
  },
  newVW: {
    position: 'absolute',
    height: 20,
    width: 50,
    backgroundColor: color.APP_BODY_BLUE,
    left: 15,
    top: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playImg: {
    position: 'absolute',
    top: 30,
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
  },
  titleVw: {
    flexDirection: 'row',
    height: 20,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 19,
  },
  titleTx: {
    color: color.APP_WHITE,
    fontSize: 14,
    fontFamily:font.SEGOE_UI_BOLD,
  },
  likeImg: {
    position: 'absolute',
    right: 0,
  },
  detailsVw: {
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    color: color.APP_WHITE,
    fontSize: 10,
    letterSpacing: 2,
    fontFamily:font.SEGOE_UI_BOLD,
    lineHeight: 20,
  },
  SeekImg: {
    width: '96%',
    height: 6,
    marginLeft: '2%',
    marginRight: '2%',
  },
  newTX: {
    fontFamily:font.SEGOE_UI_BOLD,
  },
});
