/* eslint-disable no-floating-decimal */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Resources/Colors';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const style = ScaleSheet.create({
  text: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    width: '80%',
    height: 3,
    backgroundColor: color.APP_BODY_BLUE,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
  },
  unactiveButton: {
    width: '80%',
    height: 3,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 5,
  },
});
