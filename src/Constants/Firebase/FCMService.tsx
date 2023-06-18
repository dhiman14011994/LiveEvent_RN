import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';


class FCMService {
    messageListener: any;

    register = (onRegister: CallableFunction, onNotification: CallableFunction, onOpenNotification: CallableFunction) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true);
    }

    checkPermission = (onRegister: CallableFunction) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister)
                } else {
                    this.requestPermission(onRegister)
                }
            })
            .catch(error => {
                console.log("[FCM Serivices] Permission rejected", error)
            })
    }

    getToken = (onRegister: CallableFunction) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.log("[FCM Serivices] User doesn't have device token")
                }
            })
            .catch(error => {
                console.log("[FCM Serivices] getToken rejected", error)
            })
    }

    requestPermission = (onRegister: CallableFunction) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            })
            .catch(error => {
                console.log("[FCM Serivices] Request Permission rejected", error)
            })
    }

    deleteToken = () => {
        console.log("[FCM Serivices] Delete Token")
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCM Serivices] Delete Token Error", error)
            })
    }

    createNotificationListeners = (onRegister: CallableFunction, onNotification: CallableFunction, onOpenNotification: CallableFunction) => {
        // When the application is running , but in background

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCM Serivices] onNotificationOpenedApp Notification caused app to open")
            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }

        })

        // When the application is opened from quit state

        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCM Serivices] getInitialNotification Notification caused app to open")
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                }
            })

        //Foreground state message
        this.messageListener = messaging().onMessage((remoteMessage: any) => {
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS == 'ios') {
                    notification = remoteMessage.data.notification;
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(remoteMessage)
            }
        })

        //Trigger When you have new Token

        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCM Serivices] New token refresh:")
            onRegister(fcmToken)
        })
    }

    unRegister = () => {
        this.messageListener()
    }
}

export const fcmService = new FCMService()