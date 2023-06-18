/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, TextInput, Image } from 'react-native';
import color from '../../Resources/Colors';

import { style } from './style';

interface Props {
  image?: any;
  placeholder?: any;
  onchangeText?: any;
  value?: any;
  keyboardType?: any;
  secureTextEntry?: any;
  isCvv?: any;
  onEndEditing?: any;
  maxLength?: any;
  height?: any;
  onKeyPress?: any;
  autoCapitalize?: any;
}

class CustomTextInputView extends Component<Props> {
  render() {
    return (
      <View
        style={[
          style.mainVw,
          {
            width: this.props.isCvv ? '45%' : '100%',
            height: this.props.height,
            borderRadius: Number(this.props.height) / 3,
            marginTop: '5%',
          },
        ]}>
        {this.props.isCvv ? null : (
          <Image style={style.image} source={this.props.image} />
        )}
        <TextInput
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={(text) => this.props.onchangeText(text)}
          style={this.props.isCvv ? style.textCvv : style.textINP}
          placeholderTextColor={color.APP_WHITE}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          onEndEditing={(text) => this.props.onEndEditing && this.props.onEndEditing(text)}
          maxLength={this.props.maxLength}
          onKeyPress={(text) => this.props.onKeyPress && this.props.onKeyPress(text)}
          autoCapitalize={this.props.autoCapitalize}

        />
      </View>
    );
  }
}

export default CustomTextInputView;
