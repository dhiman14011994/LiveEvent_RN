//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import Colors from '../../res/colors/Colors';

export const styles = ScaleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 8,
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'purple',
        padding: 16,
        marginBottom: 2
    },
    profileImg: {
        height: 50,
        width: 50,
        borderRadius: 30,
    },
    nameLastMsgVw: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
        justifyContent: 'space-between',
        paddingBottom: 7
        //backgroundColor: 'yellow',
    },
    locationIcon: {
        height: 26,
        marginRight: 14,
    },
    lastImageCntnr: {
        flexDirection: 'row'
    },
    cameraImg: {
        height: 30,
        width: 30,
    },
    nameTxt: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
        color: Colors.APP_WHITE
    },
    lastmsgTxt: {
        fontSize: 13,
        textAlign: 'left',
        color: Colors.APP_WHITE
    }
});