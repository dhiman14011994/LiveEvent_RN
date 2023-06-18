/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {style} from './style';
//@ts-ignore
import HtmlText from 'react-native-html-to-text';
import Images from '../../Resources/Images';
import { convertMinutesToHourMinute } from '../../utils/HelperFunctions';

interface Props {
  item: any;
  isImage: any;
  isLesson: any
  playVideo: any
  index:any;
  selectbookmark:any,
  isViewImage: any,
  getPlayerData?:any,
  category?:boolean,
}

class CustomAllUserData extends Component<Props> {
  state={
    index:0,
    isbookmark:true,
  }
  render() {
    const regex = /(<([^>]+)>)/ig;
    const text=this.props.item.description!=undefined? this.props.item.description.replace(regex, ''):this.props.item.courses[0].description!=undefined?this.props.item.courses[0].description.replace(regex, ''):null

    return (
      <View style={style.container}>
        <TouchableOpacity style={[style.mainVw,{}]} onPress={()=>this.props.getPlayerData(this.props.item)} >
          <TouchableOpacity  style={style.lessImgVw} onPress={()=>this.setState({index:this.props.index},()=>this.props.playVideo({data:this.props.item,index:this.props.index}))}>

          <Image
            style={[
              style.userImg,
              {
                borderRadius:  12,
                position:'absolute',
                
              },
            ]}
            source={
              this.props.item.uploadedFile!=undefined?this.props.category?{uri:'https://accelerateadmin.iphoneapps.co.in/uploads/'+this.props.item.uploadedFile.path}:
              {uri:'https://accelerateadmin.iphoneapps.co.in/uploads/moderator/'+this.props.item.uploadedFile.path}
              :Images.placeholder
              
            }
          />
          
          </TouchableOpacity>
          <View style={style.userVw}>
            <Text style={style.userTx} numberOfLines={1}>{this.props.item.courseDetail==undefined?this.props.item.name!=undefined?this.props.item.name:Number(this.props.index)+1+' '+this.props.item.title!=undefined?this.props.item.title:this.props.item.instructionName:this.props.item.courseDetail.title}</Text>
            <Text  numberOfLines={2} style={style.userTx1} >{text}</Text>
            
            
          </View>
          <TouchableOpacity
            style={[style.arrowBtn,{borderRadius:25}]}
            onPress={()=>this.props.getPlayerData(this.props.item)}
            
            >
            <Image
              style={style.saveBtnImg}
              source={Images.rightArrow}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[style.arrowBtn,{borderRadius:25}]}
            onPress={()=>this.props.selectbookmark(this.props.item.id)}
            >
            <Image
              style={style.saveBtnImg}
              source={Images.rightArrow}
            />
          </TouchableOpacity> */}
        </TouchableOpacity>
        <View style={[style.emptyVw,{opacity:0.2}]}/>
        </View>
    );
  }
}

export default CustomAllUserData;
