import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Platform } from 'react-native';

class LocalNotificationService {
    configure = (onOpenNotification:any) =>{
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token:any) {
      console.log("[LocalNotificationService] onRegister TOKEN:", token);
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification:any) {
      console.log(" [LocalNotificationService] NOTIFICATION:", notification);
  
      // process the notification
  if(!notification?.data){  
      return
  }

  notification.userInteraction = true;
  notification.foreground = true;
  onOpenNotification( Platform.OS == 'ios' ? notification.data.item : notification.data ) ;
      // (required) Called when a remote is received or opened, or local notification is opened
      if( Platform.OS == 'ios' ){
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
},
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification:any) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,

    
  });
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id:any, title:any, message:any, data = {}, options = {}) =>{
        PushNotification.localNotification({
            /**** Android Only Properties **** */
            ...this.buildAndroidNotifcation(id, title, message, data, options),

            /**** IOS Only Properties **** */

            ...this.buildIOSNotifcation(id, title, message, data, options),

            /* iOS and Android properties */
            foreground: true,
            title: title, // (optional)
            message: message, // (required)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }

    buildAndroidNotifcation = (id:any, title:any, message:any, data = {}, options = {}) => {
        return{
              /* Android Only Properties */
              id:id,
  autoCancel: true, // (optional) default: true
  largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
  smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
  bigText: message, // (optional) default: "message" prop
  subText: title, // (optional) default: none
  priority: "high", // (optional) set notification priority, default: high
//   visibility: "private", // (optional) set notification visibility, default: private
  importance: "high", // (optional) set notification importance, default: high
  vibrate: options.vibrate || true,
  vibration: options.vibaration || 300,
  alertAction: 'view',
  foreground: true
        }
    }

    buildIOSNotifcation = (id:any, title:any, message:any, data = {}, options = {}) => {
        return{
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllNotification = () => {
        if( Platform.OS == "ios" ){
            PushNotificationIOS.removeAllDeliveredNotifications();
        }else{
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotificationByID = (notificationID:any) => {
        console.log(" [LocalNotificationService] removeAllDeliveredNotifications:");

        PushNotification.cancelLocalNotifications({ id: `${notificationID}` })
    }
}

export const localNotificationservice = new LocalNotificationService();


// https://www.youtube.com/watch?v=dyAwv9HLS60