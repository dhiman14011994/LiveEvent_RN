/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import color from '../../Resources/Colors';
import {style} from './style';

interface Props {
  item: any;
  getData?:any;
}

class ViewFlatList extends Component<Props> {
  render() {
    return (
          <TouchableOpacity style={style.text} onPress={()=>this.props.getData(this.props.item)}>
            <Text style={{color: color.APP_WHITE,fontSize:13}}>{this.props.item.category}</Text>
          </TouchableOpacity>
    );
  }
}

export default ViewFlatList;
