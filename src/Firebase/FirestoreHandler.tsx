import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import moment from 'moment';


export const sendMessage = (data: any) => {
    var formattedNow = moment().format("DD MMM, hh:mm:ss A");
    var timeStamp = Date.now();
    // console.log('sed messages >>>>>>', data) 
    firestore().collection('messages').doc(data.chatId.toString()).collection('messages').add({
        message: data.message,
        date: formattedNow,
        image: data.image,
        sentDate: new Date(),
        senderId: data.senderId,
        receiverId: data.receiverId,
        status: '0',
        timeStamp:timeStamp,
    });

}

/**
 * 
 * @param data Here status represent read/unread status 0-> unread , 1-> read
 */
export const updateLastMessage = (data: any) => {
    var formattedNow = moment().format("DD MMM, hh:mm:ss A");
    var timeStamp = Date.now();

    firestore().collection('messages').doc(data.chatId.toString()).collection('lastMsg').doc('lastMsg').set({
        message: data.message,
        image: data.image,
        sentDate: formattedNow,
        senderID: data.senderId,
        status : '0',
        timeStamp:timeStamp,
        chatID : data.chatId
    });
}

/**
 * 
 * @param data Update User token on firebase
 */
export const updateUserToken = (data: any) => {
    var formattedNow = moment().format("DD MMM, hh:mm A");

    firestore().collection('messages').doc(data.chatId).collection('lastMsg').doc('lastMsg').set({
        message: data.message,
        image: data.image,
        sentDate: formattedNow,
        senderID: data.senderId,
        status : '0'
    });
}

/**
 * 
 * @param data update read/unread status by receiver
 */
export const updateReadUnreadStatus = (chatID: any) => {
    firestore().collection('messages').doc(chatID.toString()).collection('lastMsg').doc('lastMsg').update({
        status : '1'
    });
}

export const checkAndAddUser = (userId1: string, userId2: string, userDict: any) => {
    console.log("user id 1::::: >> ",userId1)
    console.log("user id 2::::: >> ",userId2)
    console.log("userDict::::: >> ",userDict)
    
    return new Promise((resolve, reject) => {
        let ref = firestore().collection('userss').doc(userId1.toString()).collection('chats').doc(userId2.toString())
        ref.get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    
                    // User alredy Exists
                    let chatId = snapshot.get('chatId')
                    resolve({exists: true, chatId: chatId})
                }
                else {
                    // If not exists add
                    ref.set(userDict)
                    resolve({exists: false, chatId: userDict.chatId})
                }
            })
            .catch(error => {
                Alert.alert(error);
            });
    })
}
