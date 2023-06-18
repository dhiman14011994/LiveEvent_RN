//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainView: {
     height: 240,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  featVw: {
    width: 85,
    height: 25,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    top: '12%',
    left: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.APP_BODY_BLUE,
  },
  bottomView:{
    
    backgroundColor:'black',
    width:'90%',
    height:'92%',
    position:'absolute',
    bottom:0,
    borderRadius:20,
    marginBottom:10,
   
},

  //Image

  image: {
    height: 220,
    width: '90%',
    position: 'absolute',
    resizeMode:'cover',
    borderRadius: 20,
    marginLeft:'5%',
    marginRight:'5%',
    overflow:'hidden'
  },

  // button

  button: {alignSelf: 'center', marginTop: 0},
  btn: {
    marginTop: '17%',
     alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height:104,
    width:104,
  },

  // text

  titleTxt: {
    color: color.APP_WHITE,
    width: '80%',
    marginLeft:'10%',
    marginRight:'10%',
    fontSize: 14,
     fontFamily: font.SEGOE_UI_BOLD,
    
  },
  desTxt: {
    color: color.APP_WHITE,
    fontSize: 11,
      marginLeft:'10%',
     marginRight:'10%',
    paddingRight:60,
    paddingBottom:20,

  },
  feattxt: {
    color: color.APP_BLACK, 
    fontSize: 13,
    fontFamily : font.SEGOE_UI_BOLD
  },
});
