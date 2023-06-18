//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';

export const styles = ScaleSheet.create({
  otpVw: {
    height: 52,
    width: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: color.APP_WHITE,
  },

  //TextInput Styles
  otpTxtInput: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    borderRadius: 40,
  },
});
