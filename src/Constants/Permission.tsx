import {PermissionsAndroid,Platform} from 'react-native';
import { checkMultiple, PERMISSIONS, request, requestMultiple } from 'react-native-permissions';
/**
 * @name requestCameraAndAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export default async function requestCameraAndAudioPermission() {
  try {
    if(Platform.OS!='ios'){

    
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  }
  else{
    checkMultiple([PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.MICROPHONE]).then((statuses) => {
      console.log('Camera', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      if (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] == "denied") {
          requestMultiple([PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.MICROPHONE]).then(() => {
              
          })
      }
      else if (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] === "granted") {
          // this.selectImg()
      } else {
      }
  });
 
  }
  } catch (err) {
    console.warn(err);
  }
}
