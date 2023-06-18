import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

function sendMessage(data: any)
{
  var dateFormat = require('dateformat');
  var now = new Date();
  now = dateFormat(now, "h:MM TT");
  
  firestore().collection('Participant').doc(data.id).collection('messages').add({
    message: data.message,
    date: now,
    image: data.image,
    video: data.video,
    audio: data.audio,
    sent_date: new Date(),
    sender_id: data.senderId,
    receiver_id: data.receiverId,
    status: '0',
  });
}

// function getMessages(chatId: string)
// {
//   console.log('Chat Id', chatId);
//   firestore().collection('messages').doc(chatId).collection('messages').onSnapshot((response) => {
//     const listData: any[] = [];
//     response.docs.forEach((doc: any) => {
//       listData.push(doc.data());
//     });
//     console.log('Chat Id12', listData);
//     return listData;
//   },(error) => {
//     Alert.alert(error.message);
//   });
// }

function allUsersList() {
  return new Promise((resolve,reject) => {
    return firestore().collection('Participant').get()
    .then((response) => {
      const listData: any[] = [];
      response.docs.forEach((doc: any) => {
        listData.push(doc.data());
      });
      resolve(listData)
    },(error) => {
      reject(error)
    });
  })
}

export { sendMessage, allUsersList }