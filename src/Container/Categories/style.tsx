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
  // scrollVw: {
  //   flex: 1,
  //   backgroundColor: color.APP_Splash_BG_COLOR2,
  // },
  headerVw:{
    width:'100%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Platform.OS=='ios'?'1%':'8%',
  },
  mainVw: {
    // height: '95%',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
    flex:1,
  },
  insVw:{
    marginTop: 20,
     marginBottom: 20, 
  },
  noDataVw:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTx:{
    color:color.APP_WHITE,
    fontFamily:font.SEGOE_UI_SEMIBOLD,
    fontSize:16
  },

  // Image

  // Text

  allTx: {
    fontSize: 18,
    color: color.APP_WHITE,
    width: '100%',
    //  padding:5,
     
  },

  //button
});
