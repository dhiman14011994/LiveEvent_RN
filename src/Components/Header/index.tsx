/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {styles} from './style';
interface Props {
  title?: string;
  btnImage?: any;
  isRightBtn?: Boolean;
  rightImage?: any;
  right2Image?: any;
  leftBtnActn?: any;
  rightBtnActn?: any;
  right2BtnActn?: any;
  isMultiple?: boolean;
  backgroundColor?: any;
  background?: any;
  changeText?: any;
  value?: any;
  isSearch?: any;
  placeholder?: any;
}

export default class NavigationHeader extends Component<Props, object> {
  singleBtnHeader() {
    return (
      
        <View
          style={[
            styles.mainVw,
            {
              backgroundColor:
                this.props.background == true
                  ? this.props.backgroundColor
                  : null,
            },
          ]}>
          <TouchableOpacity
            onPress={() => this.props.leftBtnActn()}
            style={styles.leftBtn}>
            <Image
              source={this.props.btnImage}
              style={styles.multiBtnLeftImg}
            />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>{this.props.title}</Text>
          <TouchableOpacity
            onPress={() => this.props.rightBtnActn()}
            style={styles.leftBtn}>
            <Image
              source={this.props.rightImage}
              style={styles.multiBtnLeftImg}
            />
          </TouchableOpacity>
        </View>
    );
  }

  multipleButtonHeader() {
    return (
      
        <View style={styles.mainVw}>
          {this.props.isSearch ? null : (
            <TouchableOpacity
              onPress={() => this.props.leftBtnActn()}
              style={styles.leftDualBtn}>
              <Image source={this.props.btnImage} style={styles.btnLeftImg} />
            </TouchableOpacity>
          )}
          {this.props.isSearch ? (
            <View style={styles.searchView}>
              <Image style={styles.searchImage} source={Images.search_icon} />
              <TextInput
                style={styles.textinput}
                maxLength={25}
                onChangeText={text => this.props.changeText(text)}
                value={this.props.value}
                placeholder={this.props.placeholder}
                placeholderTextColor={color.APP_WHITE}
              />
            </View>
          ) : (
            <Text numberOfLines={1} style={styles.titleTxt}>
              {this.props.title}
            </Text>
          )}
          <View
            style={{
              width: '20%',
              flexDirection: 'row',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
            onPress={() => this.props.right2BtnActn()}
              style={styles.rightBtn2}>
                
              <Image
                source={this.props.right2Image}
                style={styles.btnRightmg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.rightBtnActn()}
              style={styles.rightBtn}>
              <Image source={this.props.rightImage} style={styles.btnRightmg} />
            </TouchableOpacity>
          </View>
        </View>
    );
  }

  render() {
    return (
      <View>
        {this.props.isMultiple
          ? this.multipleButtonHeader()
          : this.singleBtnHeader()}
      </View>
    );
  }
}
