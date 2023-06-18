/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { style } from './style';
//@ts-ignore
import HtmlText from 'react-native-html-to-text';
import Images from '../../Resources/Images';
import { convertMinutesToHourMinute } from '../../utils/HelperFunctions';
import { styles } from '../Header/style';

interface Props {
  item: any;
  isImage?: any;
  isLesson?: any
  playVideo?: any
  index?: any;
  selectbookmark?: any,
  isViewImage?: any,
  dataIndex?: any,
  istime?: boolean,
  totalLength?:any
}

class CustomCourseView extends Component<Props> {
  state = {
    isbookmark: true,
  }
  render() {
    const regex = /(<([^>]+)>)/ig;
    const text = this.props.item.description != undefined ? this.props.item.description.replace(regex, '') : null
console.log('length>>>>',this.props.totalLength)
    return (
      <View style={style.container}>
        <View style={[style.mainVw, { width: '100%' }]}>
          <View style={{ width: '25%', }}>
            <TouchableOpacity
              onPress={() =>
                this.props.playVideo({ data: this.props.item, index: this.props.index })}
              style={[style.lessImgVw, {}]}
            >
              <Image
                style={[
                  style.userImg,
                  {
                    borderRadius: 12
                  },
                ]}
                source={
                  this.props.item.courseDetail == undefined ?
                    this.props.item.uploadedFile != undefined ?
                      this.props.item.uploadedFile.path != undefined ?
                        this.props.isLesson ? { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/lessons/' + this.props.item.uploadedFile.path }
                          : Images.placeholder
                        : this.props.item.uploadedFile != undefined ? { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/' + this.props.item.uploadedFile } : Images.placeholder
                      : this.props.item.image != undefined ? this.props.item.image : Images.placeholder
                    : { uri: 'https://accelerateadmin.iphoneapps.co.in/uploads/' + this.props.item.courseDetail.uploadedFile.path }
                }
              />
              {/* this.props.isViewImage ? */}
                <Image
                  style={{ height: 15, width: 15, position: 'absolute' }}
                  source={this.props.dataIndex == this.props.index ? require('./Assets/pause.png') : require('./Assets/play.png')} /> 

              {this.props.isViewImage ? <Image
                style={style.tickImg}
                source={require('./Assets/tick.png')} /> : null}

            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={style.userVw} onPress={() =>
            this.props.playVideo({ data: this.props.item, index: this.props.index })}>
            <Text style={style.userTx} numberOfLines={1}>{this.props.item.courseDetail == undefined ? this.props.item.name != undefined ? this.props.item.name : Number(this.props.index) + 1 + ' ' + this.props.item.title != undefined ? this.props.item.title : this.props.item.instructionName : this.props.item.courseDetail.title}</Text>
            {this.props.item.courseDetail == undefined ? this.props.item.detials != undefined ? <Text style={style.userTx1} numberOfLines={2}>{this.props.item.detials}</Text> : <Text numberOfLines={2} style={style.userTx1} >{text}</Text> : <HtmlText numberOfLines={2} style={style.userTx1} html={this.props.item.courseDetail.description}></HtmlText>}
            {!this.props.istime ? this.props.item.courseDetail == undefined ? <Text style={style.userTx1}>{convertMinutesToHourMinute(this.props.item.duration) == '1min' ? this.props.item.duration : convertMinutesToHourMinute(this.props.item.duration)}</Text> : null : null}

          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={this.props.isImage ? style.arrowBtn : style.bookmarkBtn}
              onPress={() => this.props.selectbookmark({
                id: this.props.item.id != undefined ?
                  this.props.item.id :
                  this.props.item._id,
                bookmark:
                  this.props.item.userLessons != undefined ?
                    this.props.item.userLessons.bookmarked ?
                      false :
                      true :
                    this.props.item.favourite != undefined &&
                      this.props.item.favourite[0] != undefined ?
                      this.props.item.favourite[0].favourite ?
                        false :
                        true :
                      true
              })}
            >
              <Image
                style={style.saveBtnImg}
                source={this.props.item.userLessons != undefined ?
                  this.props.item.userLessons.bookmarked ?
                    require('./Assets/rem.png') :
                    require('./Assets/unRem.png') :
                  this.props.item.favourite != undefined &&
                    this.props.item.favourite[0] != undefined ?
                    this.props.item.favourite[0].favourite ?
                      require('./Assets/rem.png') :
                      require('./Assets/unRem.png') :
                    require('./Assets/unRem.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          this.props.index==(this.props.totalLength)?
          <View style={[style.emptyVw1]} />:<View style={[style.emptyVw, { opacity: 0.2 }]} />
        }
        
      </View>
    );
  }
}

export default CustomCourseView;
