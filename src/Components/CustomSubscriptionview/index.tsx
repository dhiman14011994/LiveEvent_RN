import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {style} from './style';

interface Props {
  text1: any;
  text2: any;
}

class CustomSubsciptionView extends Component<Props> {
  render() {
    return (
      <View>
        <View style={style.mainVw}>
          <Text style={style.textName}>{this.props.text1}</Text>
          <Text style={style.textDetails}>{this.props.text2}</Text>
        </View>
      </View>
    );
  }
}

export default CustomSubsciptionView;
