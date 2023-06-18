//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../../res/colors/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
    item: {
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row',
      //  backgroundColor:'green'
     },
     itemIn: {
         marginLeft: 20
     },
     itemOut: {
        alignSelf: 'flex-end',
        marginRight: 20
     },
     msgBallonTimeVwLeft:{
        marginLeft: 8
    },
    msgBallonTimeVwRight:{
        marginRight: 5,
        marginTop:10
    },
     profileImg: {
        height: 40,
        width: 40,
        // borderRadius: 20,
        // backgroundColor: '#717173',
        borderRadius:50
    },
     balloonLeft: {
        maxWidth: moderateScale(200, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
        borderTopLeftRadius: 0,     
        backgroundColor: "#272d41"
     },
     balloonRight: {
        maxWidth: moderateScale(200, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,   
        borderBottomRightRadius: 0,   
        backgroundColor: "#2f333d"
     },
     image: {
        height: 100,
        width: 100,
        backgroundColor: '#717173',
        
    },
    message:{
        marginTop:0, 
        fontSize:13,
        textAlign:'left',
         color:'#fff'
    },
    messagedateTime:{
        marginVertical:8,
        fontSize:10,
        textAlign:'right', 
        color:'#AAAAAA'
    },
    commonShadowStyle : {
        // shadowColor: "#eee",
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 5,
        // shadowOpacity: 1.0,
        // elevation: 3,
    },
    downloadBtnView:{ flexDirection:'row', alignItems:'center', padding:10, borderRadius : 15 , justifyContent: "space-between" },
    extentionView:{
        width: 35,
        height: 35,
        borderRadius : 10,
        backgroundColor: "#10FFE5",
        alignItems:'center',
        justifyContent : "center"
        // marginRight:10
    },
    ententionTxt:{
        fontSize : 10,
        fontFamily : font.SEGOE_UI_SEMIBOLD
    },
    downloadTxt:{ color:"white", fontSize:13, marginHorizontal : 15 },
    downloadIcon:{ width: 20, height : 20, resizeMode: 'contain' }
});