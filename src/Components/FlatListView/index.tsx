/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image,Dimensions} from 'react-native';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';
 

//@ts-ignore
// import HtmlText from 'react-native-html-to-text';
import HTML from "react-native-render-html";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  item: any;
  text?: any;
  isView?: any;
  isNew?: any;
  tempImg?: any;
  isseek?: any;
  onPress?: any;
  onHitLike?:any;
  courseId?:any;
}

class FlatListView extends Component<Props> {
  render() {
     
    const { item, onHitLike } = this.props
    const regex = /(<([^>]+)>)/ig;
    const text=item.description!=undefined? item.description.replace(regex, ''):null
   
    // console.log('https://accelerateadmin.iphoneapps.co.in/uploads/'+item.uploadedFile)
    var duration= item.duration1!=undefined?item.duration1:0
  const inProgressData=parseInt((Number(item.totalWatched)  / Number(duration)* 100).toFixed(2))>100?100:parseInt((Number(item.totalWatched)  / Number(duration)* 100).toFixed(2))
  // console.log('item.favourite',item.courseDetail)
  // console.log('inProgressData12345',inProgressData)

    
    
    
    return (
      <View>
        {this.props.text ? (
          <View style={style.text}>
            <Text style={{color: color.APP_WHITE}}>{item.text!= undefined? item.text:''}</Text>
          </View>
        ) : this.props.isView ? (
          <View style={style.mainView}>
            <Image style={style.image} source={item.image!= undefined? item.image:null} />
          </View>
        ) : 
          this.props.courseId != item._id?
          <View style={[style.mainView,{marginLeft: 10,}]}>
            <TouchableOpacity onPress={()=>this.props.onPress(item._id)}
              style={style.videoBtn}>
              <Image style={style.backImg} source={item.uploadedFile==undefined?Images.placeholder:item.uploadedFile==''?this.props.tempImg:{uri:'https://accelerateadmin.iphoneapps.co.in/uploads/'+item.uploadedFile}} />
              {/* <Image style={style.backImg} source={{uri:'https://accelerateadmin.iphoneapps.co.in/uploads/5fa2a68decccf90e809d3b81/dapper-dan-nov-2017-billboard-1548-768x433.jpg'}} /> */}
              <Image style={style.playImg} source={Images.playImg} />
              <View style={[style.timeVw,{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }]}>
                <Text style={[style.timeTx,{}]}>{item.duration}</Text>
              </View>
              {this.props.isNew ? (
                <View style={style.newVW}>
                  <Text style={style.newTX}>NEW </Text>
                </View>
              ) : null}
            </TouchableOpacity>
                {this.props.isseek?
                // <Image style={style.SeekImg} source={Images.seekImg} />
                <View style={[style.progressVw,{marginLeft:'2%'}]}>
                  <View style={[style.subprogressVw,{width:inProgressData+'%'}]}/>
                </View>
                
                :null}
            
            <View style={style.titleVw}>
              <Text style={style.titleTx} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity onPress={onHitLike} style={{ width:'100%',height:'100%', alignItems:'center' }}>
              <Image style={style.likeImg} source={item.favourite!=undefined&&
                                                    item.favourite!=[]?
                                                    item.favourite[0]!=undefined?
                                                    item.favourite[0].favourite!=undefined? 
                                                    item.favourite[0].favourite?
                                                    Images.likeImg:
                                                    Images.unlikeImg:
                                                    Images.unlikeImg:
                                                    item.favourite.favourite!=undefined?
                                                    item.favourite.favourite?
                                                    Images.likeImg:
                                                    Images.unlikeImg:
                                                    Images.unlikeImg:
                                                    Images.unlikeImg
                                                    
                                                    } />
              
              </TouchableOpacity>
              
            </View>
            <Text style={style.detailsVw} numberOfLines={2}>{text}</Text>
          </View>
          :null
        }
      </View>
    );
  }
}

export default FlatListView;
