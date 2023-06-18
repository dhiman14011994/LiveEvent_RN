import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './styles';

interface Props {
  value: string;
  onTextChange: any;
  inputRef: any;
}

export default class OtpTxtField extends Component<Props, object> {
  render() {
    return (
      <View style={styles.otpVw}>
        <TextInput
          keyboardType={'numeric'}
          placeholder={''}
          maxLength={1}
          ref={this.props.inputRef}
          value={this.props.value}
          onChangeText={(text: string) => this.props.onTextChange(text)}
          style={[styles.otpTxtInput]}
          secureTextEntry={false}
        />
      </View>
    );
  }
}
