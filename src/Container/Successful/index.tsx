import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import Images from '../../Resources/Images';
import {style} from './style';
import {NavigationScreenProp} from 'react-navigation';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
}
class Successful extends Component<Props> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    isIcon: false,
  };
  

  render() {
    return (
      <View style={style.container}>
        <Image source={Images.Group1} style={style.image} />
        <Text style={style.PwdTx}>{'Password Changed Successful!'}</Text>
        <Text
          onPress={() => this.props.navigation.navigate('Login')}
          style={style.bacTx}>
          {'BACK TO LOGIN'}
        </Text>
      </View>
    );
  }
}
export default Successful;
