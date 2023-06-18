import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image'
import moment from 'moment';


interface Props {
    item: any,
    index: any,
    senderId: any,
    senderImage: any,
    receiverImage: any,
    imageClickEvent: any,
    startDownload: any,
    progressPercentage: any
}

class MessagaCell extends Component<Props> {

    render() {
        console.log('Entention check >>', this.props.item)

        let isSender = this.props.senderId == this.props.item.senderId
        let msgDateTime = this.props.item.date
        let dateMoment = moment(msgDateTime, "DD MMM, hh:mm A")

        if (moment(dateMoment).isSame(moment(), 'day')) {
            msgDateTime = dateMoment.format(' hh:mm A')
        }

        const { startDownload, progressPercentage } = this.props

        return (
            isSender ?
                <View style={[styles.item, styles.itemOut]}>
                    <View style={styles.msgBallonTimeVwRight}>
                        {this.props.item.message != '' ?
                            <View style={[styles.balloonRight]}>
                                <Text style={[styles.message]} >
                                    {this.props.item.message}
                                </Text>
                            </View> :
                            <TouchableOpacity onPress={() => startDownload()} style={[styles.balloonRight, styles.downloadBtnView, { backgroundColor: "#2f333d", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20, justifyContent: 'space-between' }]}>
                                <View style={styles.extentionView}>
                                    <Text style={styles.ententionTxt}>{"AI"}</Text>
                                </View>
                                <Text style={styles.downloadTxt}>Download</Text>
                                <Image source={require('../../Resources/Assets/download.png')} style={styles.downloadIcon} />
                            </TouchableOpacity>
                        }
                        <Text style={[styles.messagedateTime]} >
                            {msgDateTime}
                        </Text>
                    </View>
                </View> :
                <View style={[styles.item, styles.itemIn]}>
                    {
                        this.props.receiverImage == '' || this.props.receiverImage == undefined ?
                            <Image
                                source={require('../../Resources/Assets/avatar.png')}
                                style={styles.profileImg}
                                resizeMode='contain'
                            />
                            : <Image style={styles.profileImg} source={{ uri: this.props.receiverImage }} />
                    }
                    <View style={styles.msgBallonTimeVwLeft}>
                        {this.props.item.message != '' ? <View style={[styles.commonShadowStyle, styles.balloonLeft]}>
                            <Text style={[styles.message]} >
                                {this.props.item.message}
                            </Text>
                        </View> :
                            <TouchableOpacity onPress={() => startDownload()} style={[styles.balloonLeft, styles.downloadBtnView, { backgroundColor: "#2f333d", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20, justifyContent: 'space-between' }]}>
                                <View style={styles.extentionView}>
                                    <Text style={styles.ententionTxt}>AI</Text>
                                </View>
                                <Text style={styles.downloadTxt}>Download</Text>
                                <Image source={require('../../Resources/Assets/download.png')} tintColor={"white"} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        }
                        <Text style={[styles.messagedateTime]} >
                            {msgDateTime}
                        </Text>

                    </View>
                </View>
        )
    }
}

export default MessagaCell
