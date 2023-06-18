import messaging from '@react-native-firebase/messaging';
import { fcmService } from '../Firebase/FCMService';
import { localNotificationservice } from '../Firebase/LocalNotificationService';

export const getFirebaseToken = async () => {
    return await new Promise(async (resolve, reject) => {
        try{
            const tokenPush = await messaging().getToken();
            resolve(tokenPush)
            console.log('tokenPush',tokenPush)
        }
        catch(error){
            reject(error)
        }
        
    
    });
}

export const registerHandler =async ()=>{
    return await new Promise(async (resolve, reject) => {
        fcmService.registerAppWithFCM();
    fcmService.register(
      onRegister,
      onNotification,
      onOpenNotification,
    );

    localNotificationservice.temp();
    localNotificationservice.configure(onOpenNotification);
    })

}


const onRegister = async ()=>{
    return await new Promise(async (resolve, reject) => {});
}
const onNotification = async (notify: any)=>{
    return await new Promise(async (resolve, reject) => {
        console.log('[App] On Notifications: ', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };
    // this.manageRedirection();
    // RNNotificationBanner.Show({ title: "Message", subTitle: "Message", withIcon: true, icon: null, tintColor: color.APP_PINK_COLOR})
    localNotificationservice.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    );
    });
}
const onOpenNotification = async (notificationOpen:any)=>{
    return await new Promise(async (resolve, reject) => {
        console.log('[App] On Open Notifications: ', notificationOpen);
        console.log(
          'message Listener called notificationOpen >>>>>>>',
          notificationOpen,
        );
    });
}