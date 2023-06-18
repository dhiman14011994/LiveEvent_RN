import React, {Component} from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import Images from '../../Resources/Images';
import {styles} from './styles';
//@ts-ignore
import HtmlText from 'react-native-html-to-text';

interface Props {
  item: any;
  onPress: any;
}

class Videoview extends Component<Props> {
  render() {
     console.log('Notifications props123452456 >>>', this.props.item);
   
    const regex = /(<([^>]+)>)/ig;
    const text=this.props.item.description.replace(regex, '')

    return (
      <TouchableOpacity style={styles.mainView}
      onPress={()=>this.props.onPress(this.props.item._id)}
       >
        <Image style={styles.image} source={{uri:'https://accelerateadmin.iphoneapps.co.in/uploads/'+this.props.item.uploadedFile}} />
        <TouchableOpacity style={styles.btn} >
          <Image source={Images.circle_play} />
        </TouchableOpacity>
        <View style={[styles.bottomView,{opacity:0.2,}]}/>
        <Text numberOfLines={1} style={styles.titleTxt}>{this.props.item.title}</Text>
        <Text style={styles.desTxt} numberOfLines={2}>
          {text}
        </Text>
        <View style={styles.featVw}>
          <Text style={styles.feattxt}>Featured</Text>
        </View>
      </TouchableOpacity >
    );
  }
}

export default Videoview;
