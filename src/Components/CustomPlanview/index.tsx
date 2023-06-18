/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import color from '../../Resources/Colors';
import { style } from './style';

interface Props {
  item: any;
  setectdata: any;
  isselect: any;
  id: any;
}

class CustomPlanview extends Component<Props> {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.setectdata()} style={{ alignItems: 'center', width: Dimensions.get('screen').width / 2 }} activeOpacity={0.8}>
        <View style={style.text}>
          <Text style={{ color: color.APP_WHITE, }}>
            {this.props.item.name + ' $' + Number(this.props.item.amount)/100}
          </Text>
          <View
            style={
              this.props.id == this.props.item.id
                ? style.activeButton
                : style.unactiveButton
            }
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default CustomPlanview;
