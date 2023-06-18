/**
 * @format
 */
import React from 'react'

import { AppRegistry, StyleSheet, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import font from './src/Resources/Fonts';

const typography = () => {
  const oldTextRender = Text.render
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    })
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: font.SEGOE_UI,//Default font family
  }
});

// if(Platform.OS == "android") 
typography()

AppRegistry.registerComponent(appName, () => App);
