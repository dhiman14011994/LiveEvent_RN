//@ts-ignore
import React, {Component} from 'react';
//@ts-ignore
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar
} from 'react-native';
import styles from './styles';
import * as navigation from '../NavigatorService';
import { DrawerScreenProps } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../Resources/Colors';


export interface Props {
  navigations: DrawerScreenProps<any, any>;
}

class NavDrawer extends Component<Props> {
  state = {
  };

  instructor = require('../Assets/instructor.png');
  courses = require('../Assets/courses.png');
  feature = require('../Assets/feature.png');
  trending = require('../Assets/trend.png');

  private instructorTab() {
    AsyncStorage.getItem("ScreenName").then((screen:any) => {
          setTimeout(() => {
      navigation.resetBeforeHome(screen,'Instructors');
      // navigation.navigate('Instructors',"");
    }, 10);
        navigation.toggle();
    })
  }

  private coursesTab() {
    AsyncStorage.getItem("ScreenName").then((screen:any) => {
          setTimeout(() => {
      navigation.resetBeforeHome(screen,'AllCourse');
    }, 10);
    navigation.toggle();
    })

  }

  private featureTab() {
    AsyncStorage.getItem("ScreenName").then((screen:any) => {
         setTimeout(() => {
      navigation.resetBeforeHome(screen,'Featured');
    }, 10);
    navigation.toggle(); 
    })

  }

  private trendingTab() {
    AsyncStorage.getItem("ScreenName").then((screen:any) => {
          setTimeout(() => {
      navigation.resetBeforeHome(screen,'Trending');
    }, 10);
    navigation.toggle();
    })

  }

  closeMenu = () => {
    navigation.toggle()
  }

  render() {
    const {  } = this.state;
    return (
    
      <View
        style={[
          styles.mainContainer,
          {shadowRadius: 1},
        ]}>
          <StatusBar backgroundColor={'transparent'}></StatusBar>
        {
          <LinearGradient colors={['#2B2639',  '#262C38','#262C38']}
            style={[
              styles.secondContainer,
              {
                alignSelf: 'flex-end',
              },
            ]}>
              <Image style={styles.themeIcon} source={require('../Assets/splash_Icon.png')} />
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => this.instructorTab()}>
              <Image style={styles.commonImg} source={this.instructor} />
              <Text style={styles.commonTxt}>{"Instructors"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => this.coursesTab()}>
              <Image style={styles.commonImg} source={this.courses} />
              <Text style={styles.commonTxt}>{"All Courses"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => this.featureTab()}>
              <Image style={styles.commonImg} source={this.feature} />
              <Text style={styles.commonTxt}>{"Featured"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => this.trendingTab()}>
              <Image style={styles.commonImg} source={this.trending} />
              <Text style={styles.commonTxt}>{"Trending"}</Text>
            </TouchableOpacity>
            
            </LinearGradient>
        }
        <TouchableOpacity onPress={() => this.closeMenu()} style={[styles.crossBtnView,{marginTop:'5%'}]}>
            <Image style={styles.commonImgCross} source={require('../Assets/cross.png')} />
            </TouchableOpacity>
      </View>
    );
  }
}


export default NavDrawer
