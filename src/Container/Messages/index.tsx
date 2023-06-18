import React, { Component } from 'react';
import { View, Text, SafeAreaView, Alert, Modal, FlatList, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, StatusBar, NativeModules, StatusBarIOS, Keyboard, Animated, PermissionsAndroid, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
// import { BackHeaderBtn, NoDataFoundView } from '../../Custom/CustomComponents';
// import { Loader } from '../../Utils/Loader';
//import RequestManager from '../../Utils/RequestManager';
// import General from '../../Utils/General';
import MessagaCell from '../../Components/MessagaCell';
// import CustomImagePicker from '../../Utils/CustomImagePicker';
import ImageResizer from 'react-native-image-resizer';
import { sendMessage, updateLastMessage } from '../../Firebase/FirestoreHandler';
//@ts-ignore
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AutoId } from '../../Firebase/AutoId';
import FastImage from 'react-native-fast-image';
//import { AVATAR_URL } from '../../constants/api_constants';
// import { API_DOCTOR_PROFILE } from '../../Utils/APIs'
import { checkAndAddUser } from '../../Firebase/FirestoreHandler';
// import LocalDataManager from '../../Utils/LocalDataManager'
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import { NoDataFoundView } from '../../Components/CustomComponent';
import { userGetData } from '../../Redux/ReduxAPIHandler/UserAPis';
import NavigationHeader from '../../Components/Header';
import Images from '../../Resources/Images';
import DocumentPicker from 'react-native-document-picker';
import { DownloadDirectoryPath } from 'react-native-fs'
import FileViewer from 'react-native-file-viewer';
import { checkMultiple, PERMISSIONS, request, requestMultiple } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import * as navigation from '../../Navigation/NavigatorService';
import { style } from '../Splash/style';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

const { StatusBarManager } = NativeModules;
let loginData: any;

export interface props {
    navigation: any;
    userResponse: any;
    loginResponse: any
    // loginInfo: any
};

class Messages extends Component<props, object> {

    flatList: any;
    keyboardWillShowSub: any;
    keyboardWillHideSub: any;

    state = {
        messages: [] as any[],
        showLoader: false,
        isInternetError: false,
        isDataNotFoundError: false,
        message: '',
        statusBarHeight: 0,
        isCalled: false,
        showFullImage: false,
        selectedImage: "",
        receiverInfo: {} as any,
        downloadLoader: false,
        // imagesdownloadedCount: 0
        progressPercentage: 50
    }

    senderId = ''
    receiverId = ''
    chatId = ''
    chatData = {} as any

    async requestStoragePermission() {
        if (Platform.OS === 'android') {
            // checkMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then((statuses) => {
            //     console.log('Camera', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
            //     console.log('FaceID', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
            //     if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted" && statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted") {
            this.selectImg()
            // } else {
            //     // 
            // }

            // });
            try {
                // const granted = await PermissionsAndroid.request(
                //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,

                //   {
                //     title: 'AcceleratedX',
                //     message:
                //       'App needs access to your storage.',
                //     buttonNeutral: 'Ask Me Later',
                //     buttonNegative: 'Cancel',
                //     buttonPositive: 'OK',
                //   },
                // );
                // if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                // } else {
                // }
            } catch (err) {
            }
        } else {
            checkMultiple([PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.CAMERA]).then((statuses) => {
                console.log('Camera', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
                if (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] == "denied") {
                    requestMultiple([PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.CAMERA]).then(() => {
                        this.selectImg()
                    })
                }
                else if (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] === "granted") {
                    // this.selectImg()
                } else {
                }
            });
            this.selectImg()
        }
    }

    /********************************************************************************************************************************************************************** */

    //Function to download the files for noth iOS/Android
    //Will Check for android permission here, in case if not granted.
    //In iPhone files will will be save under FIles app and in Android it'll under download folder.
    async downloadFile(dirs: any, url: any) {
        Toast.show('Downloading is in progress.');
        // this.setState({ showLoader: true })
        let options = {
            fileCache: true,
            appendExt: 'jpeg',
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: true,
                path: dirs, // this is the path where your downloaded file will live in
                description: url
            }
        }
        try {
            console.log("check url before start download >> ", url)
            RNFetchBlob.config(options)
                .fetch('GET', url)
                .then((res: any) => {
                    console.log('RESSS', res)
                    let status = res.info().status;
                    console.log("check res Info >>  ", res.info())
                    this.setState({ ...this.state, progressPercentage: 100 })
                    if (status == 200) {
                        setTimeout(() => {
                            console.log("check res pathh >>  ", res.path())
                            //   this.openFolder(dirs)
                        }, 50);
                    } else {
                        setTimeout(() => {
                            //   Alert.alert('Failed to downloaded the file.')
                        }, 20)
                    }
                    //   this.setState({ showLoader: false })
                })
                .catch((errorMessage: any) => {
                    console.log('EOORR: ', errorMessage)
                    setTimeout(() => {
                        Alert.alert('Failed to downloaded the file: ')
                    }, 20)
                    //   this.setState({ showLoader: false })
                })
        } catch (error) {
            Alert.alert('Failed to downloaded the filesss.')
        }
    }

    openFolder(path: any) {
        console.log(path)
        setTimeout(() => {
            try {
                FileViewer.open(path, { showAppsSuggestions: false })
                    .then((res: any) => {
                        console.log('res: ', res)
                    })
                    .catch(error => {
                        console.log('error: ', error)
                    });
            } catch (error) {
                Alert.alert('Failed to downloaded the file: ')
            }
        }, 200);
    }

    async checkForDownload(item: any) {
        this.setState({ ...this.state, progressPercentage: 50 })
        console.log("check item >>>", item)
        // let arr: any[] = this.props.dtls.pdf.split('/');
        let data = item
        let url = item.image;
        let dirs: any = RNFetchBlob.fs.dirs
        if (Platform.OS === 'ios') {
            dirs = DownloadDirectoryPath + '/' + item.id
        }
        else {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted) {
            }
            else {
                this.requestStoragePermission()
                return
            }

            //?al

            let name = url.split('?al')[0]
            name = name.split('.')

            //   console.log('NAME>>>>>>>>>', item.sentDate.nanoseconds.toString())
            //   console.log('NAME>>>>>>>>>', name[(name.length)-1])


            dirs = dirs.DownloadDir + '/' + item.sentDate.nanoseconds.toString() + '.' + name[(name.length) - 1];
            console.log("check directory path >> ", dirs)
        }

        RNFetchBlob.fs.exists(dirs)
            .then((exist) => {
                if (exist) {
                    this.openFolder(dirs)
                    this.setState({ ...this.state, progressPercentage: 100 })
                }
                else {
                    console.log("cehck url >> ", url)
                    this.downloadFile(dirs, url)
                }
            }).catch((err) => {
                console.log('Eooe: ', err)
                // this.downloadFile(dirs, url)
            })
    }


    /*********************************************************************************************************************************************************************** */

    async componentDidMount() {
        console.log('this.props.param', this.props.route.params)
        // StatusBar.setHidden(true);
        await AsyncStorage.getItem('loginData').then((data: any) => {
            console.log("Current User Details message>>> ", data)
            return JSON.parse(data)
        }).then(data => {
            console.log("Current User Details message>>> ", data.data)
            loginData = data.data
            console.log("Current User Details message>>> ", data.data)
        })


        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight((statusBarFrameData: any) => {
                this.setState({ statusBarHeight: statusBarFrameData.height });
            });
            StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData) => {
                this.setState({ statusBarHeight: statusBarData.frame.height });
            });
        }

        this.props.navigation.setParams({ 'backBtnHandler': () => this.backBtnHandler(), 'name': this.props.route.params.chatData.firstName + ' ' + this.props.route.params.chatData.lastName });
        console.log("Check sender ID >>> ", loginData)
        this.senderId = loginData.id
        this.receiverId = this.props.route.params.chatData.id
        this.chatId = this.props.route.params.chatData.chatId
        this.chatData = this.props.route.params.chatData

        //Update receiver id when got control by notification
        if (this.props.route.params.isFromNotification == true) {
            this.receiverId = this.props.route.params.chatData.senderID
        }

        console.log("Chat Data in Messages >>>> ", this.props.route.params.chatData);


        // this.apiGetUserDetailsById()
        // console.log('chat id >>>>', this.chatId)


        this.getMessages(this.chatId)

        // this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        // this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    requestAudioRecordPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "App Record Write",
                    message:
                        "App needs access to your External Storage ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
                this.selectImg()
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    componentWillUnmount() {
        // this.keyboardWillShowSub.remove();
        // this.keyboardWillHideSub.remove();
    }

    //   keyboardWillShow = (event: any) => {

    //     let contentHeight = this.flatList.contentHeight

    //     Animated.timing(this.imageHeight, {
    //       duration: event.duration,
    //       toValue: IMAGE_HEIGHT_SMALL,
    //     }).start();
    //   };

    //   keyboardWillHide = (event: any) => {
    //     Animated.timing(this.imageHeight, {
    //       duration: event.duration,
    //       toValue: IMAGE_HEIGHT,
    //     }).start();
    //   };

    backBtnHandler() {
        this.props.navigation.goBack()
    }

    getMessages(chatId: string) {
        console.log('messages chatId123>>>>>', chatId)

        firestore().collection('messages').doc(chatId).collection('messages').orderBy('sentDate').onSnapshot((response) => {
            console.log('Response getMessages>>>>>', response.docs)

            const listData: any[] = [];
            var chatData: any = {};

            response.docs.forEach((doc: any) => {
                chatData = doc.data();
                chatData.message_id = doc.id;
                listData.push(chatData);
            });

            // console.log('Messages >>>>>', listData)
            this.setState({ isCalled: true, messages: listData })

            this.updateMessagesStatus(chatId);
        }, (error) => {
            console.log('Error getMessages>>>>>', error)
            Alert.alert(error.message);
        });
    }

    updateMessagesStatus(chatId: string) {
        var localList: any = [];
        this.state.messages.forEach((msg: any, index: any) => {
            if (msg.status == 2) {
                return;
            }
            else if (msg.status == 0 || msg.status == 1) {
                localList.push(msg);
            }
        });

        //  console.log('After updatingstatus Mesages >>>>>', this.state.messages)
        this.updateFirestore(localList, chatId);
    }

    updateFirestore(mesagesArr: any[], chatId: string) {

        let db = firestore();
        let batch = db.batch();

        let ref = db.collection('messages').doc(chatId.toString()).collection('messages')

        mesagesArr.forEach((msg: any, index: any) => {
            if (msg.status == 2 && msg.sender_id != this.senderId) {
                return;
            }
            else if ((msg.status == 0 || msg.status == 1) && msg.sender_id != this.senderId) {
                let sfRef = ref.doc(msg.message_id);
                batch.update(sfRef, { status: '2' });
            }
        });

        return batch.commit().then(function () {

        });
    }

    private async selectImg() {
        Keyboard.dismiss()
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            this.sendFile(res)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                console.log(err)
                throw err;
            }
        }
    }

    getPathForFirebaseStorage = async (uri: any) => {
        if (Platform.OS === 'ios') {
            return uri
        }
        const stat = await RNFetchBlob.fs.stat(uri)
        return stat.path
    }

    sendFile = async (res: any) => {
        // console.log("check resource data >>> ", res)
        let localData = { chatId: this.chatId, senderId: this.senderId, receiverId: this.receiverId, message: '', image: res.uri };
        let messagesArr = this.state.messages
        messagesArr.push(localData)
        this.setState({ message: '', messages: messagesArr });

        var firebaseStorageRef = storage().ref('chat/images')

        // //         console.log("Imageeeeeee", ">> 1111", firebaseStorageRef);
        const imageRef = firebaseStorageRef.child(res.name);

        let weakSelf = this
        // console.log("check res data for type verify >>> ",res, " >>>>> " ,imageRef)
        const documentUri = await this.getPathForFirebaseStorage(res.uri)

        try {
            imageRef.putFile(documentUri, { contentType: res.type }).then(() => {
                return imageRef.getDownloadURL();
            }).then(function (url) {
                console.log("Image url", { url: url });

                let data = { chatId: weakSelf.chatId, senderId: weakSelf.senderId, receiverId: weakSelf.receiverId, message: '', image: url };
                sendMessage(data);
                updateLastMessage(data);
                weakSelf.setState({ message: '' });
            }).catch(function (error) {
                console.log("Error while saving the image.. ", error);
            });
        } catch (error) {
            console.log(error)
        }

    }

    async sendMessage() {
        if (this.state.message.trim().length <= 0) {
            Alert.alert('Please type a message to send.');
            return;
        }

        checkAndAddUser(loginData.id, this.receiverId, this.props.route.params.chatData).then((data_: any) => {
            var receiverDict = this.props.route.params.chatData
            console.log("check reciver daat >> for add user >>", receiverDict)
            if (data_.exists) {
                receiverDict["chatId"] = data_.chatId

                let data = { chatId: data_.chatId, senderId: loginData.id, receiverId: this.receiverId, message: this.state.message.trim(), image: '' };
                //let data = { chatId: this.chatId, senderId: this.senderId, receiverId: this.receiverId, message: this.state.message.trim(), image: '' };
                let messagesArr = this.state.messages
                messagesArr.push(data)
                this.setState({ message: '', messages: messagesArr });
                sendMessage(data);
                updateLastMessage(data);

            } else {
                // Now AddChat for Receiver means Driver

                let senderDict = {
                    firstName: loginData.firstname,
                    lastName: "",
                    // lastName: loginData.firstname,
                    image: loginData.image,
                    // email: this.props.loginInfo.email,
                    createdOn: Date.now(),
                    id: loginData.id,
                    chatId: this.chatId
                }

                console.log('senderDict Sent >>>>>>', senderDict)

                checkAndAddUser(this.receiverId, loginData.id, senderDict)

                let data = { chatId: data_.chatId, senderId: loginData.id, receiverId: this.receiverId, message: this.state.message.trim(), image: '' };
                //let data = { chatId: this.chatId, senderId: this.senderId, receiverId: this.receiverId, message: this.state.message.trim(), image: '' };
                let messagesArr = this.state.messages
                messagesArr.push(data)
                this.setState({ message: '', messages: messagesArr });
                sendMessage(data);
                updateLastMessage(data);
            }
        })

        // let data = { chatId: this.chatId, senderId: this.senderId, receiverId: this.receiverId, message: this.state.message.trim(), image: '' };
        // let messagesArr = this.state.messages
        // messagesArr.push(data)
        // this.setState({ message: '', messages: messagesArr });
        // sendMessage(data);
        // updateLastMessage(data);
        //  this.sendNotification(data);
    }

    getPushParams(data: any) {
        console.log("chat Data >>", this.chatData);
        console.log("simple Data >>", data);
        var new_data = this.chatData
        new_data.senderID = data.senderId
        new_data.id = data.receiverId
        return {
            title: "You got a Message",
            recieverID: data.receiverId,
            message: data.message,
            data: new_data
        }
    }

    // sendNotification(data: any) {
    //     console.log('send notification params >>>>', this.getPushParams(data));
    //     RequestManager.postRequestWithHeaders(API_SEND_MESSAGE_NOTIFICATION, this.getPushParams(data)).then((response: any) => {
    //         //console.log('REsponse of Send Notification API >>>>', response);
    //     }).catch((error) => {
    //         // console.log('Error of Send Notification API >>>>', error);
    //         // General.showErroMsg(this, error)
    //     })
    // }

    check = () => {
        try {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                .then(result => {
                    console.log(result)
                }).catch(error => {
                    console.log(error)
                })
            // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //     console.log("You can use the camera");
            //     this.handleDownload()
            // } else {
            //     console.log("Camera permission denied");
            // }
        } catch (err) {
            console.warn(err);
        }
    }

    showFullImage(image: any) {

        // this.handleDownload(image)
        this.setState({ selectedImage: image, showFullImage: true })
    }

    removeImage() {
        this.setState({ selectedImage: "", showFullImage: false })
    }

    // Get paarmeters for Login API
    private getParams() {
        return {
            id: this.receiverId
        }
    }

    async apiGetUserDetailsById() {
        if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
            userGetData({ token: this.props.loginResponse.token, id: this.receiverId })
                .then((data: any) => {
                    if (data != undefined && data != null) {
                        console.log('user get data', data)
                        return ({
                            fname: data.data.name,
                            lname: data.data.lastName,
                            titleUser: data.data.profileTagLine,
                            city: data.data.city,
                            industry: data.data.industry,
                            isEnabled: data.data.private,
                            imageuser: data.data.image,
                            isViewUser: true,
                        })
                    }
                }).then(data => {
                    this.setState({ receiverInfo: data })
                }).catch(err => console.log(err))
        }
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    openMenu = () => {
        this.props.navigation.openDrawer();
    };

    render() {
        // console.log("Render Login Data Check >> ", this.props.route.params.chatData)
        let receiverImageUrl = this.chatData.image
        let title = `${this.props.route.params.chatData.firstName !== undefined && this.props.route.params.chatData.firstName !== null ? this.props.route.params.chatData.firstName : "chat"} ${this.props.route.params.chatData.lastName !== undefined && this.props.route.params.chatData.lastName !== null ? this.props.route.params.chatData.lastName : ""}`

        return (
            <SafeAreaView style={styles.blueContainer}>
                <View style={styles.headerVw}>
                    <NavigationHeader
                        isMultiple={true}
                        title={title}
                        right2BtnActn={() => this.props.navigation.navigate('Notification')}
                        leftBtnActn={() => this.props.navigation.goBack()}
                        btnImage={Images.backArrow}
                        rightImage={Images.user_icon}
                        right2Image={Images.bell_icon}
                        rightBtnActn={() => this.props.navigation.navigate('Profile')}
                    />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    // keyboardVerticalOffset={(Platform.OS === 'android') ? this.state.statusBarHeight + 60 : this.state.statusBarHeight + 44}
                    keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0}
                    style={{ flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'flex-start', }}
                    enabled
                >
                {/* <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0}
                    style={{
                        flex: 1
                    }}
                > */}
                    {/* <ScrollView style={{flex: 1}}> */}
                        <Modal
                            animated={true}
                            //transparent={true}
                            visible={this.state.showFullImage}>
                            <View style={styles.fullImageContainer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <TouchableOpacity onPress={() => this.removeImage()} style={[styles.crossBtn, { alignSelf: 'flex-end' }]}>
                                        <Image style={styles.sendImg} source={require('../../Resources/Assets/back-arrow.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.requestStoragePermission()} style={styles.crossBtn}>
                                        <Image style={styles.sendImg} source={require('../../Resources/Assets/save.png')} />
                                    </TouchableOpacity>
                                </View>

                                <FastImage
                                    style={styles.fullImage}
                                    source={this.state.selectedImage != undefined ? { uri: this.state.selectedImage } : Images.placeholder}
                                />

                            </View>
                        </Modal>

                        <View style={styles.container}>
                            {
                                this.state.messages.length > 0 ?
                                    <FlatList
                                        ref={ref => this.flatList = ref}
                                        style={styles.flatListStyle}
                                        // contentContainerStyle={{
                                        //     flexGrow: 1,
                                        //     justifyContent: 'flex-start'
                                        // }}
                                        automaticallyAdjustContentInsets={false}
                                        data={this.state.messages}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }: any) =>
                                            <MessagaCell item={item} index={index}
                                                progressPercentage={this.state.progressPercentage}
                                                startDownload={() => this.checkForDownload(item)}
                                                senderId={this.senderId} senderImage={loginData.image != undefined ? loginData.image : ""}
                                                receiverImage={receiverImageUrl}
                                                imageClickEvent={(image: any) => this.checkForDownload(item)} />}
                                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: false })}
                                        onLayout={() => this.flatList.scrollToEnd({ animated: false })}
                                    /> : (this.state.isCalled ? <View style={styles.noMsg}><NoDataFoundView warning_message='NO MESSAGES YET !' message='' img={require('../../Resources/Assets/noMessages.png')} marginTop={80}  /></View>
                                        : null)
                            }
                            <View style={[styles.textVwCntnr, { border: 1 }]}>
                                <TextInput multiline={true} style={styles.msgTxtInpt} value={this.state.message} onChangeText={(text) => this.setState({ message: text })} placeholder={'Enter your message'} placeholderTextColor={"white"} returnKeyType="done" blurOnSubmit={true} underlineColorAndroid="transparent" />
                                <TouchableOpacity onPress={() => this.requestStoragePermission()} style={styles.sendBtn}>
                                    <Image style={styles.sendImg} source={require('./Assets/paperclip.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.sendMessage()} style={styles.sendBtn}>
                                    <Image style={styles.sendImg} source={require('./Assets/send.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    {/* </ScrollView> */}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => ({
    loginResponse: state.LoginReducer.loginInfo.login.data,
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
