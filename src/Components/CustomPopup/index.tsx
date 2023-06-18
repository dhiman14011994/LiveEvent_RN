import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { styles } from './styles';
import Share from 'react-native-share';
import { AirbnbRating } from 'react-native-ratings';


const referalCode = 'Mp7890';
const shareWithSocialMedia = (data: any) => {
  let chooseOptiondata = {
  };

  switch (data.id) {
    case 1:
      chooseOptiondata = {
        social: Share.Social.TWITTER,
        whatsAppNumber: '+919464681000',
      };
      break;
    case 2:
      chooseOptiondata = { social: Share.Social.INSTAGRAM };
      break;
    case 3:
      chooseOptiondata = { social: Share.Social.FACEBOOK };
      break;
    case 4:
      chooseOptiondata = { social: Share.Social.LINKEDIN };
      break;
    default:
  }
  const options = Platform.select({
    ios: {
      ...chooseOptiondata,
      activityItemSources: [
        {
          // For sharing text.

          placeholderItem: { type: 'text', content: data.data.title },
          item: {
            default: { type: 'text', content: data.data.title },
            message: data.data.title, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: data.data.title,
          },
        },
      ],
    },
    default: {
      message:data.data.title,
      
      ...chooseOptiondata,
    },
  });
  // const shareOptions = {
  //   title: data.data.title,
  //   startdate: data.data.startDate,
  // };


  Share.shareSingle(options).catch((err) => {
    console.log('error', err);
  });
};

const copyLink = () => {
  Clipboard.setString(referalCode);
};

export const SharePopup = ({shareData, hideSharePopup, hideNotifyPopup }: any) => {
  const socialList = [
    { id: 1, img: require('./assets/twitter.png'), name: 'Twitter',data:shareData },
    { id: 2, img: require('./assets/insta.png'), name: 'Instagram',data:shareData },
    { id: 3, img: require('./assets/fb.png'), name: 'Facebook' ,data:shareData},
    { id: 4, img: require('./assets/link.png'), name: 'LinkedIn',data:shareData },
  ];
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => hideSharePopup()}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.detailVw, { position: 'absolute' }]}>
          <Text style={styles.titleText}>{'Share via'}</Text>
          <View style={styles.socialIconView}>
            {socialList.map((data) => {
              return (
                <TouchableOpacity
                  onPress={() => shareWithSocialMedia(data)}
                  style={
                    data.id == 1
                      ? styles.socialbtnTwitter
                      : data.id == 5
                        ? styles.copySocialbtns
                        : styles.socialbtns
                  }>
                  <Image
                    source={data.img}
                    style={
                      data.id == 1
                        ? styles.twitterImg
                        : data.id == 5
                          ? styles.copyImg
                          : styles.Img
                    }
                  />
                  <Text style={styles.btnTxt}>{data.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.socialIconView}>
            <TouchableOpacity
              onPress={() => copyLink()}
              style={styles.copySocialbtns}>
              <Image
                source={require('./assets/copy.png')}
                style={styles.copyImg}
              />
              <Text style={styles.btnTxt}>Copy Link</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableHighlight>
    </View>
  );
};

export const NotifyPopup = ({ notifyData,hideSharePopup, hideNotifyPopup,sendNotifyPopup }: any) => {
  const [duration, setDuration] = useState([
    { id: 1, isSelected: false, time: '5 minutes before' },
    { id: 2, isSelected: false, time: '15 minutes before' },
    { id: 3, isSelected: false, time: '30 minutes before' },
    { id: 4, isSelected: false, time: '1 hour before' },
    { id: 5, isSelected: false, time: '4 hours before' },
    { id: 6, isSelected: false, time: '1 day before' },
    { id: 7, isSelected: false, time: '2 days before' },
    { id: 8, isSelected: false, time: '1 week before' },
  ]);
  const [selectData,setSelectData]=useState([])

  const selectDuration = (data: any) => {
    const newArr = duration.map((el) => {
      return {
        id: el.id,
        isSelected: el.id == data.id ? true : false,
        time: el.time,
      };
    });
    setDuration(newArr);
    setSelectData(data)
    // Alert.alert(JSON.stringify(data))
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <TouchableHighlight
        underlayColor="transparent"
         onPress={() => hideNotifyPopup()}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.detailVw, { position: 'absolute' }]}>
          <Text style={styles.titleText}>{'Notify'}</Text>
          <View style={styles.socialIconView}>
            {duration.map((data) => {
              return (
                <TouchableOpacity
                  onPress={() => selectDuration(data)}
                  key={data.id}
                  style={[styles.RadioBtnView]}>
                  <Text style={styles.btnTxt}>{data.time}</Text>

                  <View
                    style={[
                      styles.doneRadioBtn,
                      {
                        backgroundColor: data.isSelected
                          ? 'white'
                          : 'transparent',
                        borderWidth: data.isSelected ? 0 : 1,
                        borderColor: 'white',
                      },
                    ]}>
                    {data.isSelected ? (
                      <Image
                        source={require('./assets/done.png')}
                        style={styles.tickImg}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => sendNotifyPopup(selectData)} style={styles.saveBtn}>
            <Text style={styles.saveBtnTxt}>SAVE</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableHighlight>
    </View>
  );
};


export const RatingPopup = ({ hideRatingPopup,defaultRating,sendRating }: any) => {
  const [duration, setDuration] = useState([
    { id: 1, isSelected: false, time: '5 minutes before' },
  ]);

  const selectDuration = (data: any) => {
    const newArr = duration.map((el) => {
      return {
        id: el.id,
        isSelected: el.id == data.id ? true : false,
        time: el.time,
      };
    });
    setDuration(newArr);
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => hideRatingPopup()}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.detailVw, { position: 'absolute' }]}>
          <Text style={styles.titleText}>{'Give Star Rating'}</Text>
          <View style={[styles.socialIconView, { justifyContent: "center", }]}>
            <AirbnbRating
              count={5}
              defaultRating={defaultRating}
              starStyle={{}}
              size={styles.rateSize}
              showRating={false}
              onFinishRating={(data:any)=>sendRating(data)}
            />
          </View>
          <TouchableOpacity onPress={() => hideRatingPopup()} style={styles.SubmitBtn}>
            <Text style={styles.SubmitBtnTxt}>SUBMIT</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableHighlight>
    </View>
  );
};