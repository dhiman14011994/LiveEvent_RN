/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import color from '../../Resources/Colors';
import Images from '../../Resources/Images';
import { style } from './style';
import moment from 'moment'
import { userFollow } from '../../Redux/ReduxAPIHandler/UserAPis';


interface Props {
  item: any;
  isImage: any;
  onchangeText: any;
  value: any;
  reply: any;
  OnOpenReplySection: any;
  isReplySectionOpen: Boolean;
  questionBookmark: any;
  sendMessage?:any
}

class CommentView extends Component<Props> {
  state = {
    isReply: false,
    isAnswerView: false,
  }

  componentDidMount() {
    this.customFormatDate("")
  }

  customFormatDate = (item: any) => {
    var end = moment(new Date())
    var duration = moment(end).diff(moment(item))

    var hours = moment.duration(duration);
    console.log("hours calculated >> ", hours.asDays())

    var val = hours.days() < 1 ?
      (hours.asHours() < 1 ?
        (
          hours.asMinutes() < 1 ?

            (
              hours.asSeconds() < 1 ? "0 secs ago" : (hours.asSeconds()).toString() + " secs ago"
            )
            : (hours.asMinutes()).toFixed(2).toString() + " mins ago"
        )
        : (hours.asHours().toFixed(0)).toString() + " hours ago"
      )
      : ((hours.asDays()).toFixed(0)).toString() + " days ago"

    console.log(val)
    return val
  }

 

  render() {
    const { item } = this.props

    console.log('question Data' ,item)

    return (
      <View style={{ marginBottom: style.marginBottom }}>
        <View style={style.mainVw}>
          <TouchableOpacity onPress={()=>this.props.sendMessage(item)}
          >
          <Image
            style={[
              style.userImg,
              {
                borderRadius: this.props.isImage ? null : 35,
              },
            ]}
            source={item.user!= undefined && item.user.image != undefined && item.user.image != '' ? { uri: item.user.image } : Images.placeholder_circle }
          />
          </TouchableOpacity>
          <View style={[style.userVw, {}]}>
            <Text style={style.userTx}>{item.user!= undefined &&item.user.name != undefined && item.user.name != '' ? item.user.name : 'User name' }</Text>
            <Text style={style.userTx1} numberOfLines={3}>{item.question}</Text>
            <Text style={[style.textTx, { marginTop: 5 }]}>{this.customFormatDate(item.createdDate)}</Text>
            <View style={{ flexDirection: 'row', height: 30, width: '100%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', width: 40,  marginRight: 20 }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>this.props.questionBookmark({type:1,id:item._id,upvoted:item.action!=undefined?item.action.upvoted!=undefined?!item.action.upvoted:true:true,flagged:item.action!=undefined?item.action.flagged!=undefined?item.action.flagged:true:true,bookmarked:item.action!=undefined?item.action.bookmarked?true:false:true})}>
                  <Image style={style.thumbImg} source={Images.like} />

                </TouchableOpacity>
                <Text style={[style.textTx]}>{item.questionActions[0]!=undefined?item.questionActions[0].upvotes:''}</Text>
              </View>
              <View style={{ flexDirection: 'row', width: 30, height: 20, marginRight: 20 }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>this.props.questionBookmark({type:2,id:item._id,upvoted:item.action!=undefined?item.action.upvoted!=undefined?item.action.upvoted:true:true,flagged:item.action!=undefined?item.action.flagged!=undefined?!item.action.flagged:true:true,bookmarked:item.action!=undefined?item.action.bookmarked?true:false:true})}>
                  <Image style={style.thumbImg} source={Images.unlike} />

                </TouchableOpacity>
                <Text style={[style.textTx]}>{item.flagCount[0]!=undefined?item.flagCount[0].flags:''}</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.OnOpenReplySection(item)}>
                <Text style={[style.textTx]}>{'Reply'}</Text>

              </TouchableOpacity>
            </View>

            {this.state.isAnswerView ? <FlatList
              data={item.answers}
              renderItem={(item) => <View style={{ width: '100%', borderColor: color.APP_WHITE, borderRadius: 30, justifyContent: 'center', marginTop: 5, padding: 5 }}>
                <Text style={{ marginLeft: '10%', color: color.APP_BODY_BLUE }}>{'User name'}</Text>
                <Text style={{ color: color.APP_WHITE, fontSize: 12, marginLeft: '10%', marginBottom: 5 }}>
                  {item.item.answer}
                </Text>
                <View style={{ flexDirection: 'row', height: 20, width: '90%', marginLeft: '10%', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', width: 40, height: 20, marginRight: 20 }}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>this.props.questionBookmark({type:1,id:item.item._id,upvoted:item.item.action!=undefined?item.item.action.upvoted!=undefined?!item.item.action.upvoted:true:true,flagged:item.item.action!=undefined?item.item.action.flagged!=undefined?item.item.action.flagged:true:true,bookmarked:item.item.action!=undefined?item.item.action.bookmarked?true:false:true})}>
                      <Image style={{ width: 20, height: 20 }} source={Images.like} />

                    </TouchableOpacity>
                    <Text style={[style.textTx, { fontSize: 11 }]}>{item.item.questionActions!=undefined&&item.item.questionActions[0]!=undefined?item.item.questionActions[0].upvotes:''}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: 30, height: 20, marginRight: 20 }}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>this.props.questionBookmark({type:1,id:item.item._id,upvoted:item.item.action!=undefined?item.item.action.upvoted!=undefined?item.item.action.upvoted:true:true,flagged:item.item.action!=undefined?item.item.action.flagged!=undefined?!item.item.action.flagged:true:true,bookmarked:item.item.action!=undefined?item.item.action.bookmarked?true:false:true})}>
                      <Image style={{ width: 20, height: 20 }} source={Images.unlike} />

                    </TouchableOpacity>
                    <Text style={[style.textTx, { fontSize: 11 }]}>{item.item.flagCount!=undefined && item.item.flagCount[0]!=undefined?item.item.flagCount[0].flags:''}</Text>
                  </View>
                  <TouchableOpacity >
                    <Text style={[style.textTx, { fontSize: 11 }]}>{'Reply'}</Text>

                  </TouchableOpacity>
                </View>
              </View>} /> : item.answers.length != undefined ? item.answers.length != 0 ? <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.setState({ isAnswerView: true })}>
                <Text style={[style.textTx, { fontSize: 10 }]}>{'View ' + item.answers.length + ' previous replies'}</Text>
              </TouchableOpacity> : null : null}


          </View>
          <TouchableOpacity
            style={this.props.isImage ? style.arrowBtn : style.bookmarkBtn} onPress={()=>this.props.questionBookmark({type:3,id:item._id,upvoted:item.action!=undefined?item.action.upvoted!=undefined?item.action.upvoted:true:true,flagged:item.action!=undefined?item.action.flagged!=undefined?item.action.flagged:true:true,bookmarked:item.action!=undefined?!item.action.bookmarked?true:false:true})}>
            <Image
              style={style.bookmarkImg}
              source={item.action!=undefined?item.action.bookmarked?require('../CustomCourseView/Assets/rem.png'):require('../CustomCourseView/Assets/unRem.png'): require('../CustomCourseView/Assets/unRem.png')}
            />
          </TouchableOpacity>
        </View>
        {this.props.isReplySectionOpen ?
          <View style={[style.rpVw, { borderWidth: 1, width: '80%', alignSelf: 'flex-end' }]}>
            <TextInput
              placeholder={`Write to ${item.user.name != undefined ? item.user.name != '' ? item.user.name : 'User' : 'User'}`}
              value={this.props.value}
              onChangeText={(text) => this.props.onchangeText(text)}
              style={style.textINP}
              placeholderTextColor={color.APP_WHITE}
            />
            <TouchableOpacity style={style.rpBtn} onPress={() => this.props.reply(item._id)}>
              <Text style={[style.replyTxt, { borderLeftWidth: 1, borderColor: 'white' }]}>POST</Text>
            </TouchableOpacity>
          </View>
          : null}


      </View>
    );
  }
}

export default CommentView;
