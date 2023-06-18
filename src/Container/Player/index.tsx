import React from 'react';
import {
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    View,
    Dimensions,
    FlatList,
    TextInput,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
    Animated,
    LogBox,
    TouchableWithoutFeedback
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import { style } from './style';
import { connect } from 'react-redux';
import Images from '../../Resources/Images';

import CustomCourseView from '../../Components/CustomCourseView';
import FlatListView from '../../Components/FlatListView';

import { CourseModl } from '../../Modals/CourseModl'
import { getCourseDetialsList, setBookmark, getRating } from '../../Redux/ReduxAPIHandler/CourseApis';
//@ts-ignore
import HtmlText from 'react-native-html-to-text';
import { TrendingModl } from '../../Modals/CategoryModl';
import { getCourseTrendingList } from '../../Redux/ReduxAPIHandler/CategoryAPis';
import color from '../../Resources/Colors';
import CommentView from '../../Components/CommentView';
import { getQuestionDetialsList, getQuestion, getAnswer, questionSave, saveEndVideo } from '../../Redux/ReduxAPIHandler/QuestionApis';
import { QuestionModl } from '../../Modals/QuestionModl';
import { AirbnbRating } from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import VideoPlayer from 'react-native-video-player';
//@ts-ignore
// import Video from 'react-native-af-video-player'
import { RatingPopup } from '../../Components/CustomPopup';
import { internetcheck } from '../../Constants/InternetCkeck';
import AsyncStorage from '@react-native-community/async-storage';
import { userFollow } from '../../Redux/ReduxAPIHandler/UserAPis';
import * as navigation from '../../Navigation/NavigatorService';





// const VIMEO_ID = '476053569';
const regex = /(<([^>]+)>)/ig;
export interface Props {
    navigation: any;
    loginResponse: any;
    route: any;
    fullscreen: boolean;
    play: boolean;
    currentTime: number;
    duration: number;
    showControls: boolean;
}
let currentTime = 0;


class Player extends React.Component<Props> {
    static navigationOptions = () => {
        return {
            headerShown: false,
        };
    };

    state = {
        isselect: '1',
        courseData: {},
        allcourseData: {},
        des: '',
        trendingData: '',
        question: '',
        questionData: '',
        isLoading: false,
        answerData: '',
        answer: '',
        isRatingPopupVisible: false,
        video: { width: undefined, height: undefined, duration: undefined },
        thumbnailUrl: undefined,
        videoUrl: undefined,
        lessonData: {},
        index: 1,
        lessonId: '',
        lesson: [],
        isLessonView: false,
        questionArr: [],
        isQuestionView: false,
        isCurrent: false,
        commentSelctedId: "",
        isInternet: true,
        isErrorData: false,
        isErrorTr: false,
        dataIndex: 0,
        courseId: '',
        currentTime: 0,
        playableDuration: 0,
        seekableDuration: 0,
        rating: 0,
        isEnabled: false,
        isViewUser: false,
        fname: '',
        lname: '',
        userImage: '',
        userId: '',
        imageuser: '',
        fullscreen: false,
        play: false,
        duration: 0,
        showControls: true,
        autoPlay: false
    }
    animatedValue = new Animated.Value(0);
    player: any = React.createRef()

    componentWillUnmount = () => {
        this.endVideo()
    }
    componentDidMount = () => {
        //    this.video.toSeek(30)
        this.props.navigation.addListener('blur', (event: any) => {
            if (this.player != undefined) {
                if(this.player.pause!=undefined){
                    this.player.pause(true)
                }
                
            }
            internetcheck().then((res) => {
                console.log('internet check', res)
                this.setState({ isInternet: res })
            }).catch((error) => {
                this.setState({ isInternet: error })
                Toast.show('Internet not Working');
            })
        });
        this.props.navigation.addListener('focus', (event: any) => {
            internetcheck().then((res) => {
                console.log('internet check', res)
                this.setState({ isInternet: res })
            }).catch((error) => {
                this.setState({ isInternet: error })
                Toast.show('Internet not Working');
            })
            this.setState({ isLoading: false, });

        });

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        this.setState({ courseId: this.props.route.params.id }, () => {
            this.courseDetials()
            this.trendingDetials();
            this.getQuestionView();


        })

        Animated.timing(this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();

    }

    // get Course Data with id

    courseDetials = async (): Promise<void> => {
        try {
            if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
                let data: CourseModl = await getCourseDetialsList({ id: this.state.courseId, token: this.props.loginResponse.token }) as CourseModl;
                console.log('Course Data123456789456123455', data.lessons);
                // console.log('Course Data123456789456123455', data);
                if (data.lessons.length > 3) {
                    let lesson = [];
                    for (let i = 0; i < 3; i++) {

                        lesson.push(data.lessons[i])
                    }
                    console.log('lesson11', lesson)
                    this.setState({ ...this.state, courseData: data, rating: data.avgRating, des: data.description, lessonId: data.lessons[0] != undefined ? data.lessons[0].id : '', lesson: [...lesson], isLoading: false })
                    this.getVideoUrl(this.state.courseData.lessons[0] != undefined ? this.state.courseData.lessons[0].videoUrl : '')
                    // this.endVideo()
                }
                else {
                    this.setState({ ...this.state, courseData: data, allcourseData: data, rating: data.avgRating, des: data.description, lessonId: data.lessons[0] != undefined ? data.lessons[0].id : '', isLoading: false })
                    this.getVideoUrl(this.state.courseData.lessons[0] != undefined ? this.state.courseData.lessons[0].videoUrl : '')
                    // this.endVideo()
                }
                // this.player.setState({ ...this.player.state, progress: data.lessons[this.state.dataIndex].userLessons.watchedTime });
            }
        }
        catch (error: any) {
            console.log('Course Data123456789456123455', error);
            // Toast.show('here'+error.TypeError,Toast.SHORT)
            this.setState({ isErrorData: true })
        }
    }

    viewCourseDetials = async (id: any) => {
        if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
            this.setState({ ...this.state, courseId: id })
            let data: CourseModl = await getCourseDetialsList({ id: id, token: this.props.loginResponse.token }) as CourseModl;
            // console.log('Course Data123456789456123455', data.lessons.length);
            if (data.lessons.length > 3) {
                let lesson = [];
                for (let i = 0; i < 3; i++) {

                    lesson.push(data.lessons[i])
                }
                console.log('lesson11', lesson)
                this.setState({ ...this.state, courseData: data, rating: data.avgRating, des: data.description, lessonId: data.lessons[0] != undefined ? data.lessons[0].id : '', lesson: [...lesson], isLoading: false })
                this.getVideoUrl(this.state.courseData.lessons[0] != undefined ? this.state.courseData.lessons[0].videoUrl : '')
            }
            else {
                this.setState({ ...this.state, courseData: data,allcourseData: data, rating: data.avgRating, des: data.description, lessonId: data.lessons[0] != undefined ? data.lessons[0].id : '', isLoading: false })
                this.getVideoUrl(this.state.courseData.lessons[0] != undefined ? this.state.courseData.lessons[0].videoUrl : '')
            }
        }
    }

    // get trending detials with api
    trendingDetials = async () => {
        try {
            if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {

                let data: TrendingModl[] = await getCourseTrendingList({ token: this.props.loginResponse.token, type: 2 }) as TrendingModl[];
                this.setState({ trendingData: data })
            }
        }
        catch (error) {
            if (error != undefined && error != '' && error != null) {
                // Toast.show('No data found ')
                this.setState({ isErrorTr: true })
            }
            else {

                this.setState({ isErrorTr: true })
            }


        }

    }


    // get question data with api


    getQuestionView = async () => {
        try {

            if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
                let data: QuestionModl[] = await getQuestionDetialsList({ token: this.props.loginResponse.token, id: this.state.courseId, type: 1 }) as QuestionModl[];
                console.log('Question Data', data);
                let question = [];
                if (data.data != undefined) {
                    if (data.data.length > 4) {

                        for (let i = 0; i < 4; i++) {

                            question.push(data.data[i])
                        }
                        console.log('question11', data)
                        this.setState({ ...this.state, questionData: data.data, questionArr: question })
                    }
                    else {
                        this.setState({ ...this.state, questionData: data.data })
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }

    }


    viewQuestionView = async (id: any) => {
        try {

            if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
                let data: QuestionModl[] = await getQuestionDetialsList({ token: this.props.loginResponse.token, id: id, type: 1 }) as QuestionModl[];
                console.log('Question Data', data);
                let question = [];
                if (data.data != undefined) {
                    if (data.data.length > 4) {

                        for (let i = 0; i < 4; i++) {

                            question.push(data.data[i])
                        }
                        console.log('question11', data)
                        this.setState({ ...this.state, questionData: data.data, questionArr: question })
                    }
                    else {
                        this.setState({ ...this.state, questionData: data.data })
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }

    }



    // ask question api

    askQuestion = async () => {
        if (this.state.isInternet) {
            if (this.state.question != '') {

                if (this.props.loginResponse != undefined && this.props.loginResponse.token != undefined) {
                    let data: QuestionModl[] = await getQuestion({ token: this.props.loginResponse.token, courseId: this.state.courseId, question: this.state.question }) as QuestionModl[];
                    console.log('Question Data', data);
                    this.setState({ ...this.state, question: '', isLoading: false }, () => this.getQuestionView());
                }
                else {
                    this.setState({ ...this.state, question: '', isLoading: false });
                }
            }
            else {
                Toast.show('Enter the question', Toast.SHORT)
                this.setState({ ...this.state, question: '', isLoading: false });
            }
        }
        else {
            Toast.show('Internet not Working');
        }
    }


    // question answer api
    OnOpenReplySection = (item: any) => {

        if (this.state.commentSelctedId != item._id) {
            this.setState({ ...this.state, commentSelctedId: item._id, answer: '' })
        } else {
            this.setState({ ...this.state, commentSelctedId: "", answer: '' })
        }
    }

    getReply = async (id: any) => {

        if (this.state.isInternet) {
            if (this.state.answer != '') {
                console.log("Comment Selected Id >>> ", id)
                let data = await getAnswer({ token: this.props.loginResponse.token, questionId: id, answer: this.state.answer });
                console.log('Answer Data', data);
                this.setState({ ...this.state, answer: '', isLoading: false });
                this.getQuestionView();
            }
            else {
                Toast.show('Enter the reply', Toast.SHORT)
                this.setState({ ...this.state, question: '', isLoading: false });
            }
        }
        else {
            Toast.show('Internet not Working');
        }

    }

    // get video url and thumbnail url with id

    getVideoUrl = (data: any) => {
        const VIMEO_ID = data.split('https://vimeo.com/');
        global.fetch(`https://player.vimeo.com/video/${Number(VIMEO_ID[1])}/config`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    thumbnailUrl: res.video.thumbs['640'],
                    videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
                    video: res.video,
                })
                console.log('video data>>>', res.request.files.hls.cdns[res.request.files.hls.default_cdn].url, '   ', res.video, '   ', res.video.thumbs['640'])
                console.log('video data>>>', res.request.files.hls.cdns[res.request.files.hls.default_cdn].url, '   ', res.video, '   ', res.video.thumbs['640'])
            });
    }

    //set bookmark api 

    setbookmark = async (item: any) => {
        if (this.state.isInternet) {
            let data = await setBookmark({ token: this.props.loginResponse.token, data: { courseId: this.state.courseId, bookmarked: item.bookmark, lessonId: item.id } });
            console.log('CourseFeature Data', data);
            console.log('CourseFeature item', item);
            this.courseDetials()
        }
        else {
            Toast.show('Internet not Working');
        }
    }

    // player: any;


    //set Rating lesson video api

    setRating = async (rating: any): Promise<void> => {

        try {

            let data = await getRating({ token: this.props.loginResponse.token, data: { courseId: this.state.courseId, rating: Number(rating), userId: this.props.loginResponse.id } }).then((res) => {
                this.setState({ ...this.state, rating: res.data[0].avgRating })
                console.log('CourseFeature Data', res.data[0].avgRating);

                // this.courseDetials()

            })
        }
        catch (err: any) {
            console.log('CourseFeature Data', err);
        }

    }


    questionBookmark = async (item: any) => {
        let data = await questionSave({ token: this.props.loginResponse.token, data: item });
        console.log('saveQuestion Data', data);
        console.log('saveQuestion item', item);
        this.getQuestionView()
    }
    scroll: any;

    endVideo = async () => {
        let seconds = currentTime
        if (seconds && seconds > 0) {
            let param = {
                courseId: this.state.courseId,
                lessonId: this.state.lessonId,
                watchedTime: seconds / 60,
            }
            if (param.courseId != undefined && param.lessonId != undefined && param.watchedTime != undefined) {

                let data = await saveEndVideo({ token: this.props.loginResponse.token, data: param });

                currentTime = 0
            }

        }

    }
    async followUser() {
        let data: any = await userFollow({
            token: this.props.loginResponse.token, data: {
                followId: this.state.userId,
                followed: true

            }
        });
        this.setState({ isViewUser: false })

    }

    messageActionForUpcoming = (userId: any) => {
        // console.log(index)
        AsyncStorage.getItem("loginData").then((res: any) => JSON.parse(res)).then((el) => {
            const { fname, lname, imageuser } = this.state
            var data = el.data
            console.log('el??????', el)
            let chat_id = data.id < userId ? data.id + "" + userId : userId + "" + data.id
            console.log('data.id<userId', data.id < userId, '    ', data.id + "" + userId, 'userId')
            let senderDict = {
                firstName: fname,
                lastName: lname,
                image: imageuser,
                // email: this.props.loginInfo.email,
                createdOn: Date.now(),
                id: userId,
                chatId: chat_id
            }
            this.props.navigation.navigate('Messages', { chatData: senderDict })
        })

    }


    render(): JSX.Element {
        const width = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        var course = this.state.courseData.lessons != undefined ? this.state.courseData.lessons.length > 4 ? this.state.isLessonView ? this.state.courseData.lessons : this.state.lesson : this.state.courseData.lessons : []
        //var allcourse = this.state.allcourseData.lessons != undefined ? this.state.allcourseData.lessons.length > 4 ? this.state.isLessonView ? this.state.allcourseData.lessons : this.state.lesson : this.state.allcourseData.lessons : []
        return (
            <SafeAreaView style={style.container}>


                {/* header View */}
                <View style={style.headerVw}>

                    <NavigationHeader
                        isMultiple={false}
                        leftBtnActn={() => this.props.navigation.goBack()}
                        btnImage={Images.backArrow}
                        // rightImage={Images.user_icon}
                        // right2Image={Images.bell_icon}
                        // rightBtnActn={() => this.props.navigation.navigate('Profile')}
                        title={''}
                        isRightBtn={false}
                        // right2BtnActn={() => this.props.navigation.navigate('Notification')}
                        backgroundColor={null}
                        background={null}
                        changeText={null}
                        value={null}
                        isSearch={false}
                        placeholder={null}
                    />
                </View>

                {
                    this.state.isInternet != true ?
                        <View style={style.noDataVw}>
                            <Text style={style.noDataTx} >{'Internet not Woking'}</Text>
                        </View> :
                        this.state.isErrorData ?
                            <View style={style.noDataVw}>
                                <Text style={style.noDataTx} >{'No data Found'}</Text>
                            </View> :

                            <ScrollView style={style.scrollVw} showsVerticalScrollIndicator={false} ref={(c) => { this.scroll = c }}>
                                <View style={{ width: width }}>

                                    <Text
                                        style={style.titleTx}
                                        numberOfLines={1}>
                                        {this.state.courseData.title}
                                    </Text>

                                    {console.log('this.state.videoUrl', this.state.videoUrl)}
                                    {this.state.videoUrl != undefined && this.state.videoUrl != '' ?
                                        <Animated.View style={style.imgVw}>
                                            {/* <Video source={{uri:this.state.videoUrl}}
                                        ref={(ref:any)=>this.video = ref}
                                        style={{ height: '100%', width: '100%' }}
                                        controls={true}
                                        resizeMode={'cover'}
                                        seek={20}
                                        onLoad={(adc)=>{
                                             setTimeout(() => {
                                                
                                                }, 20);
                                            console.log('here paused',adc)}}
                                        onProgress={(data:any) => {
                                            currentTime = data.currentTime
                                        }}
                                        onLoadStart={(play:any)=>{}}
                                        onPlaybackRateChange={()=>this.video.current.seek(15)}
                                        onEnd={()=>this.onEnd()}
                                        //  paused={(play1:any)=>console.log('here paused',play1)}
                                        play={(play)=>console.log('here paused',play)}
                                        onSeek={()=>this.video.current.seek(15)}
                                        /> */}

                                            {/* <Video
                                            ref={(ref) => { this.video = ref }}
                                            url={this.state.videoUrl}
                                            style={{ height: '100%', width: '100%' }}
                                            resizeMode={'cover'}
                                            onPlay={(data: any) => {
                                                console.log('data>>>>>>', data)
                                                // setTimeout(() => {
                                                //     this.video.seekTo((course[this.state.dataIndex].userLessons.watchedTime) * 60)
                                                // }, 20);
                                                if (!data) {
                                                    this.endVideo()
                                                }

                                            }}
                                            // loop={true}
                                            placeholder={this.state.thumbnailUrl}
                                            onEnd={() => this.endVideo()}
                                            autoPlay={true}
                                            onProgress={(data: any) => {
                                                currentTime = data.currentTime
                                            }

                                            }
                                            useNativeDriver
                                            onError={(error:any)=>{
                                                console.log('error>>>>>>', error)
                                            }}
                                            error={true}
                                        /> */}

                                            <VideoPlayer
                                                ref={(ref) => {
                                                    this.player = ref
                                                }}
                                                endWithThumbnail
                                                thumbnail={{ uri: this.state.thumbnailUrl }}
                                                video={{ uri: this.state.videoUrl }}
                                                resizeMode={'cover'}
                                                // disableFullscreen={true}
                                                // fullScreenOnLongPress={true}
                                                // autoplay={this.state.autoPlay}
                                                // style={{
                                                //     borderRadius: 20,
                                                //     overflow: 'hidden',
                                                //     height:220
                                                // }}

                                                onEnd={() => this.endVideo()}
                                                onProgress={(data) => {
                                                    currentTime = data.currentTime
                                                }}

                                                onStart={() => {
                                                    setTimeout(() => {
                                                        //console.log('SEEK TIME>>>>>', course[this.state.dataIndex].userLessons.watchedTime, '   this.props.route.params.continueWatching  ', this.props.route.params.continueWatching)
                                                        const time = (course[this.state.dataIndex].userLessons != undefined ? course[this.state.dataIndex].userLessons.watchedTime : 0.1) * 60
                                                        //console.log('SEEK TIME>>>>>', (course[this.state.dataIndex].userLessons.watchedTime) * 60)
                                                        if (this.props.route.params.continueWatching == '1') {
                                                            this.player.seek((course[this.state.dataIndex].userLessons != undefined ? course[this.state.dataIndex].userLessons.watchedTime : 0.1) * 60);
                                                        }


                                                    }, 5);
                                                }}
                                                customStyles={{

                                                    thumbnail: {
                                                        borderRadius: 30,
                                                        width: width * .9,
                                                        height: 230,
                                                        resizeMode: 'contain',
                                                        overflow: 'hidden'

                                                    },
                                                    wrapper: {
                                                        borderRadius: 30,
                                                    },
                                                    videoWrapper: {
                                                        borderRadius: 30,
                                                    },
                                                    video: {
                                                        // borderRadius: 50,
                                                    }
                                                }}
                                                disableFullscreen={false}
                                                onPlayPress={() => this.endVideo()}
                                            />
                                        </Animated.View>

                                        : <View style={style.imgVw} />}
                                    <View style={[style.ratingVw,]}>
                                        <Text style={style.intTx}>{
                                            this.state.lessonData.title != undefined ?
                                                this.state.lessonData.title :
                                                this.state.courseData.lessons != undefined ?
                                                    this.state.courseData.lessons[0] != undefined ?
                                                        this.state.courseData.lessons[0].title :
                                                        '' : ''}</Text>
                                        <TouchableOpacity style={style.ratingsVw} onPress={() => this.setState({ ...this.state, isRatingPopupVisible: true })}>
                                            {/* {Alert.alert(JSON.stringify(this.state.rating))} */}
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={Number(this.state.rating)}
                                                starStyle={{ marginLeft: 3 }}
                                                size={style.rateSize}
                                                showRating={false}
                                                isDisabled={true}
                                                // onFinishRating={(data: any) => this.setState({ ...this.state, rating: this.state.rating,isRatingPopupVisible:true }, () => this.setRating(data))}
                                                onFinishRating={(data: any) => this.setState({ ...this.state, isRatingPopupVisible: true })}

                                            />
                                        </TouchableOpacity>

                                    </View>


                                    <Text style={style.desTx} >
                                        {
                                            this.state.lessonData.description != undefined ?
                                                this.state.lessonData.description.replace(regex, '') :
                                                this.state.courseData.lessons != undefined ?
                                                    this.state.courseData.lessons[0] != undefined ?
                                                        this.state.courseData.lessons[0].description.replace(regex, '') : '' : ''}

                                    </Text>
                                    <Modal
                                        animated={true}
                                        animationType={'fade'}
                                        transparent={true}
                                        visible={this.state.isRatingPopupVisible}>
                                        <RatingPopup defaultRating={0} sendRating={(data: any) => this.setRating(data)} hideRatingPopup={() => this.setState({ ...this.state, isRatingPopupVisible: false })} />
                                    </Modal>


                                    <View style={style.planVw}>
                                        <View style={style.courseVw}>
                                            <Text
                                                style={style.conTx}
                                                onPress={() => this.setState({ ...this.state, isselect: '1' })}>
                                                {'COURSE PLAN'}
                                            </Text>
                                            <View
                                                style={this.state.isselect == '1' ? style.courseEmptyVw : null} />
                                        </View >
                                        <View style={style.courseVw}>
                                            <Text
                                                onPress={() => this.setState({ ...this.state, isselect: '2' })}
                                                style={style.conTx}>
                                                {'CONVERSATIONS'}
                                            </Text>
                                            <View
                                                style={this.state.isselect == '2' ? style.emptyVw : null} />
                                        </View >
                                        <View style={style.courseVw}>
                                            <Text
                                                onPress={() => this.setState({ ...this.state, isselect: '3' })}
                                                style={style.conTx}>
                                                {'RESOURCES'}
                                            </Text>
                                            <View style={this.state.isselect == '3' ? style.resEmptyVw : null} />
                                        </View >
                                    </View>




                                    {/* Lessons Data  View */}
                                    {this.state.isselect === '1' ?
                                        <View style={style.dtlVw}>
                                            <Text style={style.dtlTitleTx}>
                                                {'LESSONS'}
                                            </Text>
                                            <Text style={style.dtlTx}>
                                                {'Calyann takes you behind the scenes to teach you how she built her creative career in styling from the ground up and the entry points to becoming a stylist for personal clients and beyond. In her first-ever online course.'}
                                            </Text>
                                            <View style={[[style.flatVw]]}>
                                                {
                                                   this.state.isLessonView? course.map((item: any, index: any) => {
                                                    
                                                       return <CustomCourseView
                                                       item={item}
                                                       key={index}
                                                       index={index}
                                                       totalLength={course.length-1}
                                                       playVideo={(data: any) => {
                                                           this.setState({ ...this.state, lessonData: data.data, lessonId: data.data.id, dataIndex: data.index }, () => this.getVideoUrl(this.state.lessonData.videoUrl))
                                                           currentTime = 0
                                                           setTimeout(() => {
                                                               if(currentTime>0){
                                                                   this.player.stop()
                                                               }
                                                               else{
                                                                   
                                                               }
                                                               
                                                               this.scroll.scrollTo({ x: 0, y: 0, animated: true })
                                                           }, 10);
                                                       }}
                                                       isImage={null}
                                                       dataIndex={this.state.dataIndex}
                                                       isLesson={true}
                                                       selectbookmark={(data: any) => this.setbookmark(data)}
                                                       isViewImage={true} />
                                                   
                                                   

                                               }):course.map((item: any, index: any) => {
                                                         if(index<4){
                                                            return <CustomCourseView
                                                            item={item}
                                                            key={index}
                                                            index={index}
                                                            totalLength={course.length<5?course.length-1:4-1}
                                                            playVideo={(data: any) => {
                                                                this.setState({ ...this.state, lessonData: data.data, lessonId: data.data.id, dataIndex: data.index }, () => this.getVideoUrl(this.state.lessonData.videoUrl))
                                                                currentTime = 0
                                                                setTimeout(() => {
                                                                    if(currentTime>0){
                                                                        this.player.stop()
                                                                    }
                                                                    else{
                                                                        
                                                                    }
                                                                    
                                                                    this.scroll.scrollTo({ x: 0, y: 0, animated: true })
                                                                }, 10);
                                                            }}
                                                            isImage={null}
                                                            dataIndex={this.state.dataIndex}
                                                            isLesson={true}
                                                            selectbookmark={(data: any) => this.setbookmark(data)}
                                                            isViewImage={item.userLessons && item.userLessons.watchedTime >= item.duration} />                                                        }
                                                        

                                                    })
                                                }
                                            </View>


                                            {this.state.courseData.lessons != undefined ?
                                                this.state.courseData.lessons.length < 4 ?
                                                    this.state.isLessonView ? <View style={style.seeVw}>
                                                    <Text
                                                        onPress={() => this.setState({ ...this.state, isLessonView: !this.state.isLessonView })}
                                                        style={style.seeText}>
                                                        {'SEE LESS'}
                                                    </Text>
                                                </View> :
                                                        <View style={style.seeVw}>
                                                            <Text
                                                                onPress={() => this.setState({ ...this.state, isLessonView: !this.state.isLessonView })}
                                                                style={style.seeText}>
                                                                {'SEE ALL'}
                                                            </Text>
                                                        </View>
                                                    : <View style={style.seeVw}/>
                                                : null}

                                        </View>



                                        // Question data view


                                        : this.state.isselect === '2' ?
                                            <View style={style.dtlVw}>
                                                <Text style={style.resTx}>{'Ask a question to start a discussion. connect with our instructors and members who contribute unique insights and quality answers.'}</Text>
                                                <View style={style.inputVw}>
                                                    <View style={{ width: '15%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                                        <Image style={style.searchImg} source={Images.search_icon} />
                                                    </View>
                                                    <TextInput
                                                        placeholder={"What's your question?"}
                                                        value={this.state.question}
                                                        onChangeText={(text) => this.setState({ ...this.state, question: text })}
                                                        style={style.textINP}
                                                        placeholderTextColor={color.APP_WHITE}
                                                    />
                                                    <TouchableOpacity style={style.postBtn} onPress={() => this.setState({ ...this.state, isLoading: true }, () => this.askQuestion())}>
                                                        <Text style={style.postTx}>
                                                            {'POST'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <FlatList
                                                    style={[style.flatVw, {}]}
                                                    data={this.state.questionArr}
                                                    renderItem={({ item, index }: any) => {

                                                        return <CommentView
                                                            item={item}
                                                            key={index}
                                                            isImage={null}
                                                            reply={(id: any) => this.getReply(id)}
                                                            value={this.state.answer}
                                                            onchangeText={(text: any) => this.setState({ ...this.state, answer: text })}
                                                            OnOpenReplySection={(item: any) => this.OnOpenReplySection(item)}
                                                            isReplySectionOpen={this.state.commentSelctedId == item._id ? true : false}
                                                            questionBookmark={(data: any) => this.questionBookmark(data)}
                                                            sendMessage={(data: any) => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    fname: data.user.name,
                                                                    lname: data.user.lastName,
                                                                    userImage: data.user.image,
                                                                    userId: data.user._id,
                                                                    imageuser: data.user.name,
                                                                    isViewUser: this.props.loginResponse.id != data.user._id ? true : false,
                                                                    isEnabled: data.user.private
                                                                })
                                                                console.log(data)
                                                            }}
                                                        />
                                                    }}
                                                />


                                                {this.state.questionData != undefined ? this.state.questionData.length > 4 ? this.state.isQuestionView ? null :
                                                    <View style={style.seeVw}>
                                                        <Text
                                                            onPress={() => this.setState({ ...this.state, isQuestionView: true })}
                                                            style={style.seeText}>
                                                            {'See All'}
                                                        </Text>
                                                    </View>
                                                    : null : null}
                                            </View>
                                            :
                                            // resources data view


                                            <View style={style.resVw}>
                                                <Text style={style.resTx}>
                                                    {'These are some useful resources which will help you to learn course easily.'}
                                                </Text>
                                                <View style={style.resImgVw}>
                                                    <View style={style.customImgVw}>
                                                        <Image source={Images.image} style={{ width: 25, height: 23 }} />
                                                        <Text style={style.imgTx}>
                                                            {'Useful Images'}
                                                        </Text>
                                                    </View>
                                                    <View style={style.customImgVw}>
                                                        <Image source={Images.video} style={{ width: 25, height: 23 }} />
                                                        <Text style={style.imgTx}>
                                                            {'Useful Videos'}
                                                        </Text>
                                                    </View>
                                                    <View style={style.customImgVw}>
                                                        <Image source={Images.text} style={{ width: 25, height: 23 }} />
                                                        <Text style={style.imgTx}>
                                                            {'Word file'}
                                                        </Text>
                                                    </View>

                                                </View>
                                            </View>}

                                    <View style={style.commonVw}>
                                        <Text style={style.txtcommon}>
                                            {'EXPLORE OTHER COURSES'}
                                        </Text>
                                    </View>
                                    {this.state.isErrorTr ?
                                        <View style={style.noDataVw}>
                                            <Text style={style.noDataTx} >{'No data Found'}</Text>
                                        </View> :
                                        <FlatList
                                            style={{ marginTop: 20, marginLeft: '5%' }}
                                            data={this.state.trendingData}
                                            renderItem={({ item }: any) =>
                                                <FlatListView
                                                    item={item}
                                                    onPress={(id: any) => {
                                                        this.viewCourseDetials(id)
                                                        setTimeout(() => {
                                                            this.scroll.scrollTo({ x: 0, y: 0, animated: true })
                                                        }, 10);
                                                        this.setState({ ...this.state, autoPlay: true, isLoading: true, courseId: id, videoUrl: '', thumbnailUrl: '', })
                                                        this.viewQuestionView(id)
                                                    }}
                                                    courseId={this.state.courseId}
                                                    isseek={true}
                                                    text={false}
                                                    isView={false}
                                                    tempImg={Images.dummy}
                                                    isNew={false}

                                                />
                                            }
                                            horizontal={true}
                                        />
                                    }
                                </View>
                                <Modal
                                    animated={true}
                                    animationType={'fade'}
                                    transparent={true}
                                    visible={this.state.isLoading}>
                                    <View style={style.popupView}>
                                        {this.state.isLoading ?
                                            <ActivityIndicator size="large" color="#ffffff" />
                                            : null}
                                    </View>
                                </Modal>
                                <Modal
                                    animated={true}
                                    animationType={'fade'}
                                    transparent={true}
                                    visible={this.state.isViewUser}>
                                    <View style={style.permissionMainVw}>

                                        <View style={[style.userMsgVw,]}>
                                            <TouchableOpacity style={style.crossIcon} onPress={() => this.setState({ ...this.state, isViewUser: false })}>
                                                <Image style={style.crossIconImg} source={require('../LiveTalks/Assets/close.png')} />
                                            </TouchableOpacity>
                                            <Text style={style.InvTx}>{this.state.fname == '' ? 'username' : this.state.fname + ' ' + this.state.lname}</Text>
                                            <Text style={style.userdesTx} numberOfLines={2}>{'Interested in software design & in some musical instruments '}</Text>

                                            <View style={style.usersImgVw}>
                                                <Image style={style.profileImg} source={this.state.userImage != '' ? { uri: this.state.userImage } : Images.placeholder_circle} />
                                            </View>
                                            {console.log('this.state.isEnabled>>>>>>>>>', this.state.isEnabled)}
                                            {this.state.isEnabled ?
                                                <View style={style.followBtnVw}>
                                                    <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15 }]} onPress={() => this.followUser()}>
                                                        <Text style={style.btnTx}>{'FOLLOW'}</Text>
                                                    </TouchableOpacity>

                                                </View>
                                                :
                                                <View style={style.permissionBtnVw}>
                                                    <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15, }]} onPress={() => this.followUser()}>
                                                        <Text style={style.btnTx}>{'FOLLOW'}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[style.permissionBtn, { borderRadius: 15, }]} onPress={() => this.setState({ ...this.state, isViewUser: false }, () => this.messageActionForUpcoming(this.state.userId))}>
                                                        <Text style={style.btnTx}>{'MESSAGE'}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            <Text style={style.recentTxt}>{'RECENT POSTS'}</Text>
                                            <Text style={style.recTxt}>{'Lorem Ipsum ed ut perspiciatis unde omnis iste natus'}</Text>
                                            <Text style={style.dateTxt}>{'15, July 2020'}</Text>
                                            <Text style={style.recTxt}>{'Lorem Ipsum ed ut perspiciatis unde omnis iste natus'}</Text>
                                            <Text style={style.dateTxt}>{'15, July 2020'}</Text>
                                        </View>
                                    </View>
                                </Modal>
                            </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        loginResponse: state.LoginReducer.loginInfo.login.data,
        signupResponse: state.LoginReducer.loginInfo.socialLogin,
    };
}
function mapDispatchToProps(dispatch: any) {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);

