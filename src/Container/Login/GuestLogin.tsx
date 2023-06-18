
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Modal, ActivityIndicator, ToastAndroid } from 'react-native';
import validator from 'validator';
import { style } from './style';
import Images from '../../Resources/Images';
import CustomTextInputView from '../../Components/CustomTextInputView';
import { guestLogin } from '../../Redux/ReduxAPIHandler/LoginApis';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { GuestData } from '../../Modals/LoginModl';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation';
import { navigateToTabScreen, navigationRef, reset, resetBeforeHome, resetBeforeHomeWithIndex } from '../../Navigation/NavigatorService';
import CustomSubsciptionView from '../../Components/CustomSubscriptionview';
import * as navigation from '../../Navigation/NavigatorService';
import { } from '@react-navigation/native';
import base64 from 'react-native-base64'
import SimpleToast from 'react-native-simple-toast';
interface Props {
    navigation: NavigationScreenProp<any, any>;
    this: any;
}

export default class GuestLogin extends Component<Props> {

    state = {
        name: '',
        email: '',
        code: '',
        inviteName: '',
        EventName: '',
        isLoading: false,
        code11: '',

    }

    private async login() {
        this.props.this.setState({ ...this.state, isLoading: true })
        try {
            if (this.state.name == '') {
                SimpleToast.show('please enter the name.')
                this.props.this.setState({ ...this.state, isLoading: false })
            }
            else if (this.state.email == '') {
                SimpleToast.show('please enter the email.')
                this.props.this.setState({ ...this.state, isLoading: false })
            }
            else if (!validator.isEmail(this.state.email)) {
                SimpleToast.show('Please enter valid email.');
                this.props.this.setState({ ...this.state, isLoading: false })
            }
            else if (this.state.code == '') {
                SimpleToast.show('please enter the invite code.')
                this.props.this.setState({ ...this.state, isLoading: false })
            }
            else {


                let meetingCode = base64.decode(this.state.code)
                let codnewStr = meetingCode.split('/');
                let code = codnewStr[0];
                let name = codnewStr[1];
                this.setState({ ...this.state, inviteName: name, code11: code })
                console.log('meetingCode', code)
                console.log('codnewStr', name)
                firestore().collection('liveTalks').doc(code).get().then(async documentSnapshot => {
                    if (documentSnapshot.exists) {
                        var date = new Date();
                        var startDate = new Date(documentSnapshot.data()?.startDateTime._seconds * 1000)
                        var endDate = new Date(documentSnapshot.data()?.endDateTime._seconds * 1000)
                        if (date.getTime() < startDate.getTime()) {
                            this.props.this.setState({ isLoading: false })
                            Alert.alert('', `Too early to join the meeting. Your call will be starting on ${moment(startDate).format("DD MMM YYYY hh:mm a")}.`)
                        }
                        else if (date.getTime() > endDate.getTime()) {
                            this.props.this.setState({ isLoading: false })
                            Alert.alert('', `The meeting you are trying to join was ended on ${moment(endDate).format("DD MMM YYYY hh:mm a")}.`)
                        }
                        else {
                            const params = {
                                name: this.state.name,
                                email: this.state.email,
                                role: 'guest',
                            }
                            const result = await guestLogin(params);
                            this.handleLoginData(result)
                            console.log('RESULTS>>>>>>>', result)
                        }
                    } else {
                        this.props.this.setState({ ...this.state, isLoading: false })
                        Alert.alert('Invalid meeting code.')

                    }
                });

            }

        }
        catch (error) {
            this.props.this.setState({ ...this.state, isLoading: false })
        }


    }

    private async handleLoginData(data: any) {
        firestore().collection('liveTalks').doc(this.state.code11).get().then((event_documentSnapshot: any) => {
            console.log('event_documentSnapshot.data().title', event_documentSnapshot.data())
            console.log('event_documentSnapshot.data().title', event_documentSnapshot.data().title != undefined ? event_documentSnapshot.data().title : '')
            this.setState({ ...this.state, EventName: event_documentSnapshot.data().title != undefined ? event_documentSnapshot.data().title : '' })
            const userData = event_documentSnapshot.data().participants
            if (!userData.find((value: string) => value === data.id)) {
                userData.push(data.id)
            }
            firestore()
                .collection('liveTalks')
                .doc(this.state.code11)
                .update({
                    participants: userData
                }).then(async res => {
                    firestore().collection('eventUser').doc(this.state.code11).get().then(async documentSnapshot => {
                        if (!documentSnapshot.exists) {
                            firestore().collection('eventUser').doc(data.id).set({
                                id: data.id,
                                name: this.state.name,
                                email: this.state.email,
                                image: '',
                                handRaise: false,
                                speak: false,
                                isPermission: false,
                                status: 'online',
                                joinId:'',
                                eventId:this.state.code11

                            }).then(async res => {
                                this.navigateToCall(data)
                            })
                                .catch(error => {
                                    Alert.alert('Something went wrong! Please try again later.')
                                    console.log('Eoorr>>>', error)
                                    this.props.this.setState({ ...this.state, isLoading: false })
                                })
                        }
                        else {
                            this.navigateToCall(data)
                        }
                    })
                })
                .catch(error => {
                    this.props.this.setState({ ...this.state, isLoading: false })
                    Alert.alert('Something went wrong! Please try again later.')
                })
        })
    }

    async navigateToCall(data: any) {
        let guestData: GuestData = {
            createdDate: data.createdDate,
            email: data.email,
            id: data.id,
            name: data.name,
            private: data.private,
            role: data.role,
            meetingId: this.state.code11,
            eventTitle: this.state.EventName,
            inviteName: this.state.inviteName,
        }

        await AsyncStorage.setItem('loginData', JSON.stringify(guestData));
        await AsyncStorage.setItem('guestData', JSON.stringify(guestData));
        await AsyncStorage.setItem('loginId', data.id)
        this.props.this.props.saveLoginData(guestData);
        this.props.this.setState({ ...this.state, isLoading: false })
        navigation.reset('GuestStack', { id: data.id, user: 'jane', role: 'guest', eventId: this.state.code11, eventTitle: this.state.EventName, inviteName: this.state.inviteName,hostId:'111' })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                        <View style={style.inputVw}>
                            <CustomTextInputView
                                height={48}
                                image={Images.email}
                                value={this.state.name}
                                onchangeText={(text: any) => this.setState({ name: text })}
                                placeholder={'Name'}
                                isCvv={false}
                                onEndEditing={() => { }}
                                onKeyPress={() => {
                                }}
                                autoCapitalize={'words'}
                                maxLength={50}
                            />
                            <CustomTextInputView
                                height={48}
                                image={Images.lock}
                                value={this.state.email}
                                onchangeText={(text: any) => this.setState({ email: text })}
                                placeholder={'Email'}
                                keyboardType={'email-address'}
                                secureTextEntry={true}
                                isCvv={false}
                                onKeyPress={(text: any) => {

                                }}
                                onEndEditing={() => { }}
                                autoCapitalize={'none'}
                                maxLength={50}
                            />
                            <CustomTextInputView
                                height={48}
                                image={Images.lock}
                                value={this.state.code}
                                onchangeText={(text: any) => this.setState({ code: text })}
                                placeholder={'Meeting Code'}
                                isCvv={false}
                                autoCapitalize={'words'}
                                onKeyPress={() => {
                                }}
                                onEndEditing={() => { }}
                                maxLength={50}
                            />
                        </View>
                        <View style={{ height: '43%', width: '100%', alignItems: 'center' }} />
                        <TouchableOpacity style={style.saveBt} onPress={() => this.login()}>
                            <Text style={style.saveTx}>{'LOGIN AS GUEST'}</Text>
                        </TouchableOpacity>
                        <View style={style.blankVw} />
                    </View >
                </KeyboardAvoidingView>
                <Modal
                    animated={true}
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.isLoading}>
                    <View style={style.popupView}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                </Modal>
            </View>
        )
    }
}
