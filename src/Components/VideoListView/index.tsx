/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import { style } from './style';
//@ts-ignore
import HtmlText from 'react-native-html-to-text';
import VideoPlayer from 'react-native-video-player';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  item: any;
  text: any;
  isView: any;
  isNew: any;
  tempImg: any;
  isseek: any;
  onPress?: any;
}

class VideoListView extends Component<Props> {
  render() {

    return (
      <View>
        {this.props.text ? (
          <View style={style.text}>
            <Text style={{ color: color.APP_WHITE }}>{this.props.item.text}</Text>
          </View>
        ) : this.props.isView ? (
          <View style={style.mainView}>
            <Image style={style.image} source={this.props.item.image} />
          </View>
        ) : (
              <TouchableOpacity onPress={() => this.props.onPress(this.props.item._id)} style={style.mainView}>
                <View
                  style={{
                    width: '100%',
                    height: '60%',
                    alignItems: 'center',
                  }}>
                  <VideoPlayer
                    video={{ uri: this.props.item.videoUrl }}
                    videoWidth={170}
                    videoHeight={100}
                    style={style.backImg}
                  />

                  <Image style={style.playImg} source={Images.playImg} />
                  <View style={style.timeVw}>
                    <Text style={style.timeTx}>{this.props.item.createdDate}</Text>
                  </View>
                  {this.props.isNew ? (
                    <View style={style.newVW}>
                      <Text style={style.newTX}>NEW </Text>
                    </View>
                  ) : null}
                </View>
                {this.props.isseek ? <Image style={style.SeekImg} source={Images.seekImg} /> : null}

                <View style={style.titleVw}>
                  <Text style={style.titleTx} numberOfLines={1}>{this.props.item.title}</Text>
                  <Image style={style.likeImg} source={this.props.item.featured ? Images.likeImg : Images.unlikeImg} />
                </View>

                <HtmlText style={style.detailsVw} html={this.props.item.description}></HtmlText>
              </TouchableOpacity>
            )}
      </View>
    );
  }
}

export default VideoListView;
