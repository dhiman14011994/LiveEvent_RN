import React, { Component } from "react";
import { View, Image } from "react-native";
import FastImage from 'react-native-fast-image'

interface Prop {
  src: any,
  tempImg: any,
  style: any,
  tintColor: any;
}

export default class CustomImageLoder extends Component<Prop, object> {

  state = {
    isLoaded: false,
  }

  render() {
    // console.log("check include function in custom image class >  ",this.props.src)
        const { src, style,tempImg, tintColor } = this. props
    return (
      <View style={style}>
        {
          src== undefined || src == '' || src == null || !src.includes('https') ?
            <FastImage
            tintColor={tintColor}
              style={[style, { position: 'absolute' }]}
              source={tempImg}
              resizeMode={style.resizeMode}
            /> :
            <View>
              <FastImage
                style={[style, { width: '100%' }]}
                source={{ uri: src }}
                onLoadStart={() => this.setState({ isLoaded: true })}
                onLoad={() => this.setState({ isLoaded: false })}
                onError={() => this.setState({ isLoaded: false })}
                resizeMode={style.resizeMode}
              />
              {
                this.state.isLoaded || src == '' ?
                  <FastImage
                  tintColor={tintColor}
                    style={[style, { position: 'absolute' }]}
                    source={tempImg}
                    resizeMode={style.resizeMode}
                  />
                  : null
              }
            </View>
        }
      </View>
    )
  }
} 