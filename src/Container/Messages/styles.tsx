//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Platform } from 'react-native';
//import { APP_FONT_REGULAR } from '../../constants/fonts';
import * as color from '../../res/colors'
import Colors from '../../res/colors/Colors';


export const styles = ScaleSheet.create({
  blueContainer: {
    // width:'100%',
    // height:'100%', 
    flex: 1,
    backgroundColor: "#222731"
  },
  mainVw: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    //backgroundColor: "red" ,
  },
  container: {
    flex: 1,
    width: '100%',
    // height:'100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    backgroundColor: "#222731",
    //backgroundColor: "red" ,
  },
  noMsg:{
    flex:1
  },
  flatListStyle: {
    flex: 1,
    width: '100%',
    // marginBottom: (Platform.OS === "ios" ? 50 : 50),
  },
  textVwCntnr: {
    width: '90%',
    minHeight: (Platform.OS === "ios" ? 40 : 45),
    maxHeight: 80,
    padding: 8,
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    bottom: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: "white",
    backgroundColor: "#222731"

  },

  msgTxtInpt: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    // textAlign: 'left',
    // height: '100%',
    fontSize: 12,
    //fontFamily: APP_FONT_REGULAR,
    color: 'white',
    // Android only Property
    // textAlignVertical: 'top',
    // backgroundColor: '#fff',
    // borderRadius: 10,
    // borderColor: Colors.APP_GRAY,
    // borderWidth: 1
  },
  //Button Touch Styles
  sendBtn: {
    width: 25,
    // height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'white'
  },
  //Image Styles
  sendImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    // backgroundColor:'white'
  },
  fullImageContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: "#140F2693",
  },
  crossBtn: {
    // backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 5,
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossText: {
    fontSize: 16,
    textAlign: 'center',
    //fontFamily: APP_FONT_REGULAR,
    color: "Green",
  },
  fullImage: {
    flex: 1,
    width: "100%",
    backgroundColor: '#717173'
  },
  headerVw: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? '1%' : '8%',

  },

});
