import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import moment from 'moment';
import CustomImageLoder from '../../utils/customImageLoader';
import font from '../../Resources/Fonts';

interface Props {
    onClickEvent: any,
    item: any,
    index: any,
    myId?: number
}

class ChatCell extends Component<Props> {

    capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        // console.log('Image url in Chat Cell>>', this.props.item.image == '')

        let msgDateTime = this.props.item.sentDate
        let dateMoment = moment(msgDateTime, "DD MMM, hh:mm A")
        if (moment(dateMoment).isSame(moment(), 'day')) {
            msgDateTime = dateMoment.format(' hh:mm A')
        }

        let url = this.props.item.image
        console.log('start >> last msg >>', this.props.item.firstName, ">>>>> ", url)
        var status = (this.props.myId != this.props.item.senderID && this.props.item.status == 0 ? 0 : 1)

        let firstName = this.props.item.firstName ? this.capitalize(this.props.item.firstName) : 'AcceleratedX'
        let lastName = this.props.item.lastName ? this.capitalize(this.props.item.lastName) : ''

        console.log("chat user image >>>>> ", this.props.item.image)

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.itemView}
                    onPress={() => this.props.onClickEvent(this.props.index)}>
                    {/* {this.props.item.image == '' ?
                        <Image
                            tintColor={"white"}
                            source={require('../../Resources/Assets/avatar.png')}
                            style={styles.profileImg}
                            resizeMode='contain'
                        /> : */}
                        <CustomImageLoder
                        tintColor = {"#d1d1d1"}
                            style={styles.profileImg}
                            tempImg={require('../../Resources/Assets/avatar.png')}
                            src={url} />
                        {/* //<CachedImage style={styles.profileImg}  source={{ uri: this.props.item.image }}/>
                    } */}
                    <View style={styles.nameLastMsgVw}>
                        <Text style={styles.nameTxt}>{firstName + ' ' + lastName}</Text>
                        {this.props.item.lastMsg != '' ?
                            <Text numberOfLines={2} style={[styles.lastmsgTxt, { color: 'rgba(255, 255, 255, 1)', fontFamily: status == 1 ? font.SEGOE_UI : font.SEGOE_UI_BOLD }]} >
                                {this.props.item.lastMsg}
                            </Text> :
                            <View style={styles.lastImageCntnr}>
                                {/* <Image
                                    source={require('../../Resources/Assets/camera-grey.png')}
                                    style={styles.cameraImg}
                                    resizeMode='contain'
                                    tintColor={"white"}
                                /> */}
                                <Text numberOfLines={2} style={[styles.lastmsgTxt, { color: 'rgba(255, 255, 255, 1)' }]} >
                                    sent a file.
                            </Text>
                            </View>}
                    </View>
                    {/* <Text numberOfLines={2} style={[styles.lastmsgTxt,{color : status == 1 ?'rgba(78, 78, 80, 0.60)' : 'black' }]} >
                                {msgDateTime}
                            </Text> */}

                </TouchableOpacity>
            </View>
        )
    }
}

export default ChatCell
